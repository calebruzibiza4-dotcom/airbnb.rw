import crypto from 'node:crypto';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { getMongoDatabase } from '../../libs/mongodb';

export type BookingStatus = 'PENDING_PAYMENT' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'REFUNDED' | 'PAYMENT_FAILED' | 'EXPIRED';
export type BookingPaymentStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED' | 'REFUNDED';

const bookingInput = z.object({
  listingId: z.string().min(1),
  listingType: z.enum(['experience', 'event', 'service', 'stay']).optional(),
  selectedDate: z.string().optional(),
  selectedTime: z.string().optional(),
  guestCount: z.number().int().min(1).max(100).optional(),
  ticketType: z.string().trim().max(80).optional(),
  ticketQuantity: z.number().int().min(1).max(100).optional(),
  serviceLocation: z.string().trim().max(300).optional(),
  duration: z.number().int().min(1).max(1440).optional(),
  note: z.string().trim().max(1000).optional(),
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

function normalizeType(value: unknown) {
  const type = String(value || '').toLowerCase();
  return type === 'experiences' ? 'experience' : type === 'events' ? 'event' : type === 'services' ? 'service' : type;
}

function validDate(value?: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function bookingReference() {
  return `RWA-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

function getAvailabilityNumber(availability: any, key: string) {
  const value = availability && typeof availability === 'object' ? Number(availability[key]) : 0;
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function getQuantity(type: string, input: z.infer<typeof bookingInput>) {
  return type === 'event' ? input.ticketQuantity || 0 : input.guestCount || 0;
}

function dateWindow(date: Date) {
  const end = new Date(date);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start: date, end };
}

function serializeBooking(document: any) {
  return {
    id: document._id?.toString(),
    reference: document.reference,
    userId: document.userId?.toString?.() || document.userId,
    listingId: document.listingId?.toString?.() || document.listingId,
    listingTitle: document.listingTitle,
    listingType: document.listingType,
    listingImage: document.listingImage || null,
    location: document.location || null,
    status: document.status,
    paymentStatus: document.paymentStatus,
    selectedDate: document.selectedDate || null,
    selectedTime: document.selectedTime || null,
    guestCount: document.guestCount || null,
    ticketType: document.ticketType || null,
    ticketQuantity: document.ticketQuantity || null,
    serviceLocation: document.serviceLocation || null,
    note: document.note || null,
    subtotal: document.subtotal,
    serviceFee: document.serviceFee,
    total: document.total,
    currency: document.currency,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}

async function assertAvailability(db: any, listing: any, type: string, input: z.infer<typeof bookingInput>, userId: string) {
  const selectedDate = validDate(input.selectedDate);
  if (type !== 'event' && !selectedDate) throw new Error('Choose a valid booking date.');
  const quantity = getQuantity(type, input);
  if (!quantity) throw new Error(type === 'event' ? 'Choose at least one ticket.' : 'Choose at least one guest.');
  if (listing.maxGuests && quantity > listing.maxGuests) throw new Error(`This listing accepts a maximum of ${listing.maxGuests} guests.`);

  const availability = listing.availability || {};
  const configuredCapacity = getAvailabilityNumber(availability, 'capacity') || Number(listing.maxGuests) || 0;
  if (type === 'event' && availability.eventDate && input.selectedDate !== availability.eventDate) throw new Error('That event is only available on its published date.');

  const bookingQuery: Record<string, unknown> = {
    listingId: listing._id,
    status: { $in: ['PENDING_PAYMENT', 'CONFIRMED'] },
  };
  if (selectedDate) bookingQuery.selectedDate = input.selectedDate;
  const existingBookings = await db.collection('bookings').find(bookingQuery).toArray();
  const alreadyReserved = existingBookings.reduce((sum: number, booking: any) => sum + Number(booking.quantity || booking.guestCount || booking.ticketQuantity || 0), 0);
  if (configuredCapacity && alreadyReserved + quantity > configuredCapacity) throw new Error('That date no longer has enough capacity. Please choose another option.');

  if (type === 'service' && input.selectedDate && input.selectedTime) {
    const duplicate = existingBookings.some((booking: any) => booking.selectedTime === input.selectedTime && booking.userId?.toString?.() !== userId);
    if (duplicate) throw new Error('That service time is no longer available. Please choose another time.');
  }

  return { selectedDate, quantity, configuredCapacity };
}

export async function POST(request: Request, userId: string | null) {
  if (!userId || !ObjectId.isValid(userId)) return json({ error: { message: 'Sign in before booking.' } }, 401);
  try {
    const parsed = bookingInput.safeParse(await request.json());
    if (!parsed.success) return json({ error: { message: 'Review your booking details and try again.' } }, 400);
    const input = parsed.data;
    if (!ObjectId.isValid(input.listingId)) return json({ error: { message: 'Listing not found.' } }, 404);
    const db = await getMongoDatabase();
    const listing = await db.collection('listings').findOne({ _id: new ObjectId(input.listingId), status: 'published' });
    if (!listing) return json({ error: { message: 'This listing is no longer available.' } }, 404);
    const type = normalizeType(listing.listingType || input.listingType);
    if (!['experience', 'event', 'service', 'stay'].includes(type)) return json({ error: { message: 'This listing cannot be booked yet.' } }, 400);
    if (type === 'stay') return json({ error: { message: 'Stay booking is not enabled until stay availability is configured.' } }, 422);

    const capacityLockKey = input.selectedDate
      ? `${listing._id.toString()}:${input.selectedDate}:${input.selectedTime || 'all-day'}`
      : null;
    if (capacityLockKey) {
      await db.collection('booking_locks').createIndex({ key: 1 }, { unique: true });
      await db.collection('booking_locks').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
      try {
        await db.collection('booking_locks').insertOne({ key: capacityLockKey, listingId: listing._id, expiresAt: new Date(Date.now() + 60 * 1000) });
      } catch {
        throw new Error('That date or time was just booked by another guest. Please choose another option.');
      }
    }
    let selectedDate: Date | null;
    let quantity: number;
    let configuredCapacity: number;
    try {
      ({ selectedDate, quantity, configuredCapacity } = await assertAvailability(db, listing, type, input, userId));
    } catch (error) {
      if (capacityLockKey) await db.collection('booking_locks').deleteOne({ key: capacityLockKey });
      throw error;
    }
    const subtotal = Math.max(0, Math.floor(Number(listing.price) || 0)) * quantity;
    const feePercent = Math.max(0, Number(process.env.BOOKING_SERVICE_FEE_PERCENT || 5));
    const serviceFee = Math.floor((subtotal * feePercent) / 100);
    const total = subtotal + serviceFee;
    const now = new Date();
    const reference = bookingReference();
    const image = listing.coverImage?.url || listing.images?.find((item: any) => item?.isCover)?.url || listing.images?.[0]?.url || listing.imageSrc || null;
    const booking = {
      reference,
      userId: new ObjectId(userId),
      listingId: listing._id,
      hostId: listing.userId || listing.hostId || null,
      listingTitle: listing.title,
      listingType: type,
      listingImage: image,
      location: listing.location || listing.address || null,
      status: 'PENDING_PAYMENT' as BookingStatus,
      paymentStatus: 'PENDING' as BookingPaymentStatus,
      selectedDate: input.selectedDate || null,
      selectedTime: input.selectedTime || null,
      guestCount: type === 'event' ? null : quantity,
      ticketType: type === 'event' ? input.ticketType || 'Standard' : null,
      ticketQuantity: type === 'event' ? quantity : null,
      serviceLocation: type === 'service' ? input.serviceLocation || listing.location || null : null,
      note: input.note || null,
      quantity,
      subtotal,
      serviceFee,
      total,
      currency: listing.currency || 'RWF',
      createdAt: now,
      updatedAt: now,
    };
    const bookingResult = await db.collection('bookings').insertOne(booking);
    let paymentResult;
    try {
      paymentResult = await db.collection('payments').insertOne({
      bookingId: bookingResult.insertedId,
      userId: new ObjectId(userId),
      reference,
      amount: total,
      currency: booking.currency,
      method: null,
      status: 'PENDING' as BookingPaymentStatus,
      provider: 'unconfigured',
      providerReference: null,
      createdAt: now,
        updatedAt: now,
      });
    } catch (error) {
      await db.collection('bookings').deleteOne({ _id: bookingResult.insertedId, userId: new ObjectId(userId) });
      if (capacityLockKey) await db.collection('booking_locks').deleteOne({ key: capacityLockKey });
      throw error;
    }
    if (capacityLockKey) await db.collection('booking_locks').deleteOne({ key: capacityLockKey });
    return json({ booking: serializeBooking({ ...booking, _id: bookingResult.insertedId }), payment: { id: paymentResult.insertedId.toString(), status: 'PENDING', providerConfigured: false } }, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'We could not create this booking.';
    console.error('Booking creation failed:', error);
    return json({ error: { message } }, message.includes('capacity') || message.includes('available') ? 409 : 500);
  }
}

export async function GET(userId: string | null) {
  if (!userId || !ObjectId.isValid(userId)) return json({ error: { message: 'Sign in to view your bookings.' } }, 401);
  try {
    const db = await getMongoDatabase();
    const bookings = await db.collection('bookings').find({ userId: new ObjectId(userId) }).sort({ createdAt: -1 }).limit(100).toArray();
    return json({ bookings: bookings.map(serializeBooking) });
  } catch (error) {
    console.error('Booking query failed:', error);
    return json({ error: { message: 'Bookings are temporarily unavailable.' } }, 503);
  }
}

export async function GET_BY_ID(id: string, userId: string | null) {
  if (!userId || !ObjectId.isValid(userId) || !ObjectId.isValid(id)) return json({ error: { message: 'Booking not found.' } }, 404);
  try {
    const db = await getMongoDatabase();
    const booking = await db.collection('bookings').findOne({ _id: new ObjectId(id), userId: new ObjectId(userId) });
    return booking ? json({ booking: serializeBooking(booking) }) : json({ error: { message: 'Booking not found.' } }, 404);
  } catch (error) {
    console.error('Booking detail query failed:', error);
    return json({ error: { message: 'Booking details are temporarily unavailable.' } }, 503);
  }
}

export async function CANCEL(id: string, userId: string | null) {
  if (!userId || !ObjectId.isValid(userId) || !ObjectId.isValid(id)) return json({ error: { message: 'Booking not found.' } }, 404);
  try {
    const db = await getMongoDatabase();
    const booking = await db.collection('bookings').findOne({ _id: new ObjectId(id), userId: new ObjectId(userId) });
    if (!booking) return json({ error: { message: 'Booking not found.' } }, 404);
    if (!['PENDING_PAYMENT', 'CONFIRMED'].includes(booking.status)) return json({ error: { message: 'This booking can no longer be cancelled.' } }, 409);
    const now = new Date();
    await db.collection('bookings').updateOne({ _id: booking._id, userId: new ObjectId(userId) }, { $set: { status: 'CANCELLED', updatedAt: now } });
    return json({ status: 'CANCELLED', message: booking.paymentStatus === 'PAID' ? 'Cancellation requested. Refund processing will be handled by the payment provider.' : 'Booking cancelled before payment.' });
  } catch (error) {
    console.error('Booking cancellation failed:', error);
    return json({ error: { message: 'We could not cancel this booking.' } }, 500);
  }
}
