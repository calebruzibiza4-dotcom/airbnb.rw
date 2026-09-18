export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type PaymentProvider = {
  name: string;
  createPayment: (input: { paymentId: string; amount: number; currency: string; reference: string; method: string }) => Promise<{ redirectUrl?: string; providerReference?: string }>;
  checkPaymentStatus: (providerReference: string) => Promise<PaymentStatus>;
  verifyPayment: (payload: unknown, signature: string | null) => Promise<{ paymentId: string; status: PaymentStatus; providerReference?: string }>;
};

const unavailableProvider: PaymentProvider = {
  name: 'unconfigured',
  async createPayment() {
    throw new Error('Payment provider is not configured. Add a provider before accepting payments.');
  },
  async checkPaymentStatus() {
    throw new Error('Payment provider is not configured.');
  },
  async verifyPayment() {
    throw new Error('Payment provider is not configured.');
  },
};

export function getPaymentProvider(): PaymentProvider {
  // A real provider can be registered here once its server-only credentials exist.
  return unavailableProvider;
}

export function isPaymentProviderConfigured() {
  return Boolean(process.env.PAYMENT_PROVIDER && process.env.PAYMENT_SECRET);
}
