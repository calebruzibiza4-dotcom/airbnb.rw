import { ObjectId } from 'mongodb';
import { getMongoDatabase } from '../../libs/mongodb';
import { getPaymentProvider, isPaymentProviderConfigured } from '../../services/payment';

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

export async function INITIALIZE(paymentId: string, request: Request, userId: string | null) {
  if (!userId || !ObjectId.isValid(userId) || !ObjectId.isValid(paymentId)) return json({ error: { message: 'Payment not found.' } }, 404);
  try {
    const body = await request.json().catch(() => ({}));
    const method = typeof body?.method === 'string' ? body.method : '';
    if (!['mobile_money', 'card'].includes(method)) return json({ error: { message: 'Choose a supported payment method.' } }, 400);
    const db = await getMongoDatabase();
    const payment = await db.collection('payments').findOne({ _id: new ObjectId(paymentId), userId: new ObjectId(userId), status: 'PENDING' });
    if (!payment) return json({ error: { message: 'This payment is no longer available.' } }, 409);
    if (!isPaymentProviderConfigured()) return json({ error: { message: 'Online payment is not configured yet. Add payment provider credentials before accepting live payments.' }, code: 'PAYMENT_PROVIDER_NOT_CONFIGURED' }, 503);
    const provider = getPaymentProvider();
    const result = await provider.createPayment({ paymentId, amount: payment.amount, currency: payment.currency, reference: payment.reference, method });
    await db.collection('payments').updateOne({ _id: payment._id }, { $set: { method, status: 'PROCESSING', provider: provider.name, providerReference: result.providerReference || null, updatedAt: new Date() } });
    return json({ paymentId, status: 'PROCESSING', redirectUrl: result.redirectUrl || null });
  } catch (error) {
    console.error('Payment initialization failed:', error);
    return json({ error: { message: 'We could not start payment. Please try again.' } }, 502);
  }
}

export async function WEBHOOK(request: Request) {
  if (!isPaymentProviderConfigured()) return json({ error: { message: 'Payment provider is not configured.' } }, 503);
  try {
    const signature = request.headers.get('x-payment-signature');
    const payload = await request.json();
    const result = await getPaymentProvider().verifyPayment(payload, signature);
    if (!ObjectId.isValid(result.paymentId)) return json({ error: { message: 'Invalid payment reference.' } }, 400);
    const db = await getMongoDatabase();
    const now = new Date();
    await db.collection('payments').updateOne({ _id: new ObjectId(result.paymentId) }, { $set: { status: result.status, providerReference: result.providerReference || null, updatedAt: now } });
    const bookingStatus = result.status === 'PAID' ? 'CONFIRMED' : result.status === 'FAILED' ? 'PAYMENT_FAILED' : undefined;
    if (bookingStatus) await db.collection('bookings').updateOne({ _id: (await db.collection('payments').findOne({ _id: new ObjectId(result.paymentId) }))?.bookingId }, { $set: { paymentStatus: result.status, status: bookingStatus, updatedAt: now } });
    return json({ received: true });
  } catch (error) {
    console.error('Payment webhook failed:', error);
    return json({ error: { message: 'Webhook verification failed.' } }, 400);
  }
}
