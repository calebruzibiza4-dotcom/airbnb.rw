import { ObjectId } from 'mongodb';
import { getMongoDatabase } from '../../libs/mongodb';
import { availablePaymentMethods, getPaymentProvider, getProviderForName, type PaymentMethod } from '../../services/payment';

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

export function METHODS() {
  return json({ methods: availablePaymentMethods() });
}

export async function STATUS(paymentId: string, userId: string | null) {
  if (!userId || !ObjectId.isValid(userId) || !ObjectId.isValid(paymentId)) return json({ error: { message: 'Payment not found.' } }, 404);
  try {
    const db = await getMongoDatabase();
    const payment = await db.collection('payments').findOne({ _id: new ObjectId(paymentId), userId: new ObjectId(userId) });
    if (!payment) return json({ error: { message: 'Payment not found.' } }, 404);
    if (!payment.providerReference || ['PAID', 'FAILED', 'CANCELLED', 'EXPIRED', 'REFUNDED'].includes(payment.status)) return json({ status: payment.status, transactionReference: payment.providerTransactionId || null });
    const result = await getProviderForName(payment.provider).checkPaymentStatus(payment.providerReference);
    const now = new Date();
    if (result.status !== payment.status) {
      await db.collection('payments').updateOne({ _id: payment._id }, { $set: { status: result.status, providerTransactionId: result.transactionReference || null, paidAt: result.status === 'PAID' ? now : null, updatedAt: now } });
      const bookingStatus = result.status === 'PAID' ? 'CONFIRMED' : ['FAILED', 'CANCELLED', 'EXPIRED'].includes(result.status) ? 'PAYMENT_FAILED' : undefined;
      if (bookingStatus) await db.collection('bookings').updateOne({ _id: payment.bookingId, status: { $nin: ['CONFIRMED', 'COMPLETED', 'CANCELLED', 'REFUNDED'] } }, { $set: { paymentStatus: result.status, status: bookingStatus, updatedAt: now } });
    }
    return json({ status: result.status, transactionReference: result.transactionReference || null });
  } catch (error) {
    console.error('Payment status verification failed:', error);
    return json({ error: { message: 'Payment verification is temporarily unavailable.' } }, 502);
  }
}

export async function INITIALIZE(paymentId: string, request: Request, userId: string | null) {
  if (!userId || !ObjectId.isValid(userId) || !ObjectId.isValid(paymentId)) return json({ error: { message: 'Payment not found.' } }, 404);
  try {
    const body = await request.json().catch(() => ({}));
    const rawMethod = typeof body?.method === 'string' ? body.method : '';
    if (rawMethod !== 'mobile_money' && rawMethod !== 'card') return json({ error: { message: 'Choose a supported payment method.' } }, 400);
    const method: PaymentMethod = rawMethod;
    const methods = availablePaymentMethods();
    if (!methods[method]) return json({ error: { message: method === 'mobile_money' ? 'MTN Mobile Money is not configured yet.' : 'Card checkout is not configured yet.' }, code: 'PAYMENT_METHOD_NOT_CONFIGURED' }, 503);
    const db = await getMongoDatabase();
    const payment = await db.collection('payments').findOne({ _id: new ObjectId(paymentId), userId: new ObjectId(userId), status: 'PENDING' });
    if (!payment) return json({ error: { message: 'This payment is no longer available.' } }, 409);
    const provider = getPaymentProvider(method);
    const result = await provider.createPayment({ paymentId, amount: payment.amount, currency: payment.currency, reference: payment.reference, method, phone: typeof body?.phone === 'string' ? body.phone : undefined });
    await db.collection('payments').updateOne({ _id: payment._id, status: 'PENDING' }, { $set: { method, status: result.status, provider: provider.name, providerReference: result.providerReference || null, providerTransactionId: result.transactionReference || null, instructions: result.instructions || null, updatedAt: new Date() } });
    return json({ paymentId, status: result.status, instructions: result.instructions || null, redirectUrl: result.redirectUrl || null });
  } catch (error) {
    console.error('Payment initialization failed:', error);
    return json({ error: { message: 'We could not start payment. Please try again.' } }, 502);
  }
}

export async function WEBHOOK(request: Request) {
  try {
    const signature = request.headers.get('x-payment-signature');
    const payload = await request.json();
    const db = await getMongoDatabase();
    const result = await getProviderForName(String(payload?.provider || 'mtn-momo-rwanda')).verifyPayment(payload, signature);
    const payment = await db.collection('payments').findOne({ providerReference: result.providerReference });
    if (!payment) return json({ error: { message: 'Payment reference not found.' } }, 404);
    const now = new Date();
    if (result.status !== payment.status) await db.collection('payments').updateOne({ _id: payment._id }, { $set: { status: result.status, providerTransactionId: result.transactionReference || null, paidAt: result.status === 'PAID' ? now : null, updatedAt: now } });
    const bookingStatus = result.status === 'PAID' ? 'CONFIRMED' : ['FAILED', 'CANCELLED', 'EXPIRED'].includes(result.status) ? 'PAYMENT_FAILED' : undefined;
    if (bookingStatus) await db.collection('bookings').updateOne({ _id: payment.bookingId, status: { $nin: ['CONFIRMED', 'COMPLETED', 'CANCELLED', 'REFUNDED'] } }, { $set: { paymentStatus: result.status, status: bookingStatus, updatedAt: now } });
    return json({ received: true });
  } catch (error) {
    console.error('Payment webhook failed:', error);
    return json({ error: { message: 'Webhook verification failed.' } }, 400);
  }
}
