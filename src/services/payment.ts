import crypto from 'node:crypto';

export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED' | 'CANCELLED' | 'EXPIRED' | 'REFUNDED';
export type PaymentMethod = 'mobile_money' | 'card';

type PaymentInput = { paymentId: string; amount: number; currency: string; reference: string; method: PaymentMethod; phone?: string };
type PaymentResult = { status: PaymentStatus; providerReference?: string; transactionReference?: string; instructions?: string; redirectUrl?: string };

export type PaymentProvider = {
  name: string;
  method: PaymentMethod;
  createPayment: (input: PaymentInput) => Promise<PaymentResult>;
  checkPaymentStatus: (providerReference: string) => Promise<PaymentResult>;
  verifyPayment: (payload: unknown, signature: string | null) => Promise<{ providerReference: string; status: PaymentStatus; transactionReference?: string }>;
};

let accessToken: { value: string; expiresAt: number } | null = null;
const env = (name: string) => process.env[name]?.trim() || '';

function mtnConfig() {
  return { baseUrl: env('MTN_MOMO_BASE_URL') || 'https://sandbox.momodeveloper.mtn.com', subscriptionKey: env('MTN_MOMO_SUBSCRIPTION_KEY'), apiUser: env('MTN_MOMO_API_USER'), apiKey: env('MTN_MOMO_API_KEY'), targetEnvironment: env('MTN_MOMO_TARGET_ENVIRONMENT') || 'sandbox', callbackSecret: env('MTN_MOMO_CALLBACK_SECRET') };
}

export function isMtnConfigured() { const config = mtnConfig(); return Boolean(config.subscriptionKey && config.apiUser && config.apiKey); }
export function isCardConfigured() {
  // Keep cards hidden until a PCI-compliant hosted/tokenized adapter is implemented.
  return false;
}
export function availablePaymentMethods() { return { mobile_money: isMtnConfigured(), card: isCardConfigured() }; }

async function getMtnAccessToken() {
  if (!isMtnConfigured()) throw new Error('MTN Mobile Money is not configured.');
  if (accessToken && accessToken.expiresAt > Date.now() + 30_000) return accessToken.value;
  const config = mtnConfig();
  const response = await fetch(`${config.baseUrl}/collection/token`, { method: 'POST', headers: { Authorization: `Basic ${Buffer.from(`${config.apiUser}:${config.apiKey}`).toString('base64')}`, 'Ocp-Apim-Subscription-Key': config.subscriptionKey, 'Content-Type': 'application/x-www-form-urlencoded' }, body: '' });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || typeof payload.access_token !== 'string') throw new Error('MTN authentication failed.');
  accessToken = { value: payload.access_token, expiresAt: Date.now() + Number(payload.expires_in || 3600) * 1000 };
  return accessToken.value;
}

function normalizeRwandaPhone(phone: string) {
  const compact = phone.replace(/[\s()-]/g, '');
  if (/^07\d{8}$/.test(compact)) return `250${compact.slice(1)}`;
  if (/^2507\d{8}$/.test(compact)) return compact;
  throw new Error('Enter a valid Rwanda MTN phone number.');
}

function mtnHeaders(token: string) {
  const config = mtnConfig();
  return { Authorization: `Bearer ${token}`, 'Ocp-Apim-Subscription-Key': config.subscriptionKey, 'X-Target-Environment': config.targetEnvironment, 'Content-Type': 'application/json' };
}

const mtnProvider: PaymentProvider = {
  name: 'mtn-momo-rwanda',
  method: 'mobile_money',
  async createPayment(input) {
    if (!input.phone) throw new Error('Enter the MTN Mobile Money phone number.');
    if (input.currency !== 'RWF') throw new Error('MTN Mobile Money payments must be in RWF.');
    const config = mtnConfig();
    const token = await getMtnAccessToken();
    const providerReference = crypto.randomUUID();
    const response = await fetch(`${config.baseUrl}/collection/v1_0/requesttopay`, { method: 'POST', headers: { ...mtnHeaders(token), 'X-Reference-Id': providerReference }, body: JSON.stringify({ amount: String(input.amount), currency: input.currency, externalId: input.reference, payer: { partyIdType: 'MSISDN', partyId: normalizeRwandaPhone(input.phone) }, payerMessage: `Inzu Stay booking ${input.reference}`, payeeNote: 'Rwanda marketplace booking' }) });
    if (response.status !== 202) throw new Error('MTN could not start the payment request.');
    return { status: 'PROCESSING', providerReference, instructions: 'Check your phone and approve the MTN Mobile Money payment.' };
  },
  async checkPaymentStatus(providerReference) {
    const token = await getMtnAccessToken();
    const config = mtnConfig();
    const response = await fetch(`${config.baseUrl}/collection/v1_0/requesttopay/${encodeURIComponent(providerReference)}`, { headers: mtnHeaders(token) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error('MTN payment status could not be verified.');
    const status = String(payload.status || '').toUpperCase();
    const mapped: PaymentStatus = status === 'SUCCESSFUL' ? 'PAID' : status === 'FAILED' ? 'FAILED' : status === 'CANCELLED' ? 'CANCELLED' : 'PROCESSING';
    return { status: mapped, providerReference, transactionReference: payload.financialTransactionId };
  },
  async verifyPayment(payload, signature) {
    const config = mtnConfig();
    if (config.callbackSecret && signature !== config.callbackSecret) throw new Error('Invalid MTN callback signature.');
    const body = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
    const providerReference = String(body.referenceId || body.externalId || body.providerReference || '');
    if (!providerReference) throw new Error('MTN callback did not include a payment reference.');
    const result = await this.checkPaymentStatus(providerReference);
    return { providerReference, status: result.status, transactionReference: result.transactionReference };
  },
};

const unavailableCardProvider: PaymentProvider = { name: 'card-unconfigured', method: 'card', async createPayment() { throw new Error('Card payments are not configured. Add a PCI-compliant hosted checkout provider.'); }, async checkPaymentStatus() { throw new Error('Card payments are not configured.'); }, async verifyPayment() { throw new Error('Card payments are not configured.'); } };

export function getPaymentProvider(method: PaymentMethod): PaymentProvider {
  if (method === 'mobile_money') { if (!isMtnConfigured()) throw new Error('MTN Mobile Money is not configured.'); return mtnProvider; }
  if (!isCardConfigured()) throw new Error('Card payments are not configured. Add a PCI-compliant hosted checkout provider.');
  return unavailableCardProvider;
}

export function getProviderForName(name: string) { return name === mtnProvider.name ? mtnProvider : unavailableCardProvider; }
