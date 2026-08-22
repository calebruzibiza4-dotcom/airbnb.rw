import { ObjectId } from 'mongodb';
import { getMongoDatabase } from '../../libs/mongodb';

type ListingImage = { url: string; path: string; isCover: boolean };

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

function normalizeType(value: unknown) {
  const type = String(value || '').toLowerCase();
  return type === 'experiences' ? 'experience' : type === 'events' ? 'event' : type === 'services' ? 'service' : type;
}

function parseImages(value: unknown): ListingImage[] {
  if (!Array.isArray(value)) return [];
  return value.filter((image): image is ListingImage => !!image && typeof image === 'object' && typeof image.url === 'string' && typeof image.path === 'string').map((image) => ({ url: image.url, path: image.path, isCover: image.isCover === true }));
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const page = Math.max(1, Number(url.searchParams.get('page') || 1));
    const limit = Math.min(20, Math.max(1, Number(url.searchParams.get('limit') || 20)));
    const query: Record<string, unknown> = { status: 'published' };
    if (type && type !== 'everything') query.listingType = normalizeType(type);
    const db = await getMongoDatabase();
    const documents = await db.collection('listings').find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).toArray();
    return json({ listings: documents.map(publicListing), page, limit });
  } catch (error) {
    console.error('Public listing query failed:', error);
    return json({ error: { message: 'Listings are temporarily unavailable.' } }, 503);
  }
}

export async function POST(request: Request, userId: string | null) {
  if (!userId || !ObjectId.isValid(userId)) return json({ error: { message: 'You must be signed in to publish a listing.' } }, 401);
  try {
    const body = await request.json();
    const listingType = normalizeType(body?.listingType);
    const images = parseImages(body?.images);
    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const description = typeof body?.description === 'string' ? body.description.trim() : '';
    const category = typeof body?.category === 'string' ? body.category.trim() : '';
    const province = typeof body?.province === 'string' ? body.province.trim() : '';
    const district = typeof body?.district === 'string' ? body.district.trim() : '';
    const sector = typeof body?.sector === 'string' ? body.sector.trim() : '';
    const address = typeof body?.address === 'string' ? body.address.trim() : '';
    if (!['stay', 'experience', 'event', 'service'].includes(listingType) || !title || !description || !category || !province || !district || !sector || !address || images.length < 5 || !images.some((image) => image.isCover)) {
      return json({ error: { message: 'Complete the listing type, category, title, description, location, five images, and cover image before publishing.' } }, 400);
    }
    const now = new Date();
    const listing = { title, description, summary: typeof body.summary === 'string' ? body.summary.trim() : '', listingType, category, location: `${district}, ${province}`, address, province, district, sector, latitude: typeof body.latitude === 'number' ? body.latitude : null, longitude: typeof body.longitude === 'number' ? body.longitude : null, images, coverImage: images.find((image) => image.isCover) || images[0], price: Number(body?.price) || 0, currency: typeof body?.currency === 'string' ? body.currency : 'RWF', availability: body?.availability || {}, maxGuests: Number(body?.maxGuests) || 0, userId, hostId: userId, status: 'published', createdAt: now, updatedAt: now };
    const db = await getMongoDatabase();
    const result = await db.collection('listings').insertOne(listing);
    return json({ listing: publicListing({ ...listing, _id: result.insertedId }) }, 201);
  } catch (error) {
    console.error('Listing publish failed:', error);
    return json({ error: { message: 'We could not publish your listing. Please try again.' } }, 500);
  }
}

export async function POST_DRAFT(request: Request, userId: string | null) {
  if (!userId || !ObjectId.isValid(userId)) return json({ error: { message: 'You must be signed in to save a draft.' } }, 401);
  try {
    const body = await request.json();
    const now = new Date();
    const draft = {
      title: typeof body?.title === 'string' ? body.title.trim() : '',
      description: typeof body?.description === 'string' ? body.description.trim() : '',
      listingType: normalizeType(body?.listingType),
      category: typeof body?.category === 'string' ? body.category.trim() : '',
      location: `${body?.district || ''}, ${body?.province || ''}`.replace(/^, |, $/g, ''),
      address: typeof body?.address === 'string' ? body.address.trim() : '',
      province: body?.province || '', district: body?.district || '', sector: body?.sector || '',
      latitude: typeof body?.latitude === 'number' ? body.latitude : null, longitude: typeof body?.longitude === 'number' ? body.longitude : null,
      images: parseImages(body?.images), coverImage: parseImages(body?.images).find((image) => image.isCover),
      price: Number(body?.price) || 0, currency: typeof body?.currency === 'string' ? body.currency : 'RWF', availability: body?.availability || {}, maxGuests: Number(body?.maxGuests) || 0,
      userId, hostId: userId, status: 'draft', createdAt: now, updatedAt: now,
    };
    const db = await getMongoDatabase();
    const result = await db.collection('listings').insertOne(draft);
    return json({ listing: { id: result.insertedId.toString(), status: 'draft' } }, 201);
  } catch (error) {
    console.error('Draft save failed:', error);
    return json({ error: { message: 'We could not save your draft.' } }, 500);
  }
}

export function publicListing(document: any) {
  return { id: document._id?.toString(), title: document.title, description: document.description, listingType: document.listingType, category: document.category, location: document.location, address: document.address, province: document.province, district: document.district, sector: document.sector, latitude: document.latitude, longitude: document.longitude, images: parseImages(document.images), coverImage: document.coverImage, price: document.price, currency: document.currency, availability: document.availability, maxGuests: document.maxGuests, host: document.hostName ? { name: document.hostName, image: document.hostImage || null } : null, createdAt: document.createdAt, updatedAt: document.updatedAt };
}

export async function GET_BY_ID(id: string) {
  if (!ObjectId.isValid(id)) return json({ error: { message: 'Listing not found.' } }, 404);
  try { const db = await getMongoDatabase(); const listing = await db.collection('listings').findOne({ _id: new ObjectId(id), status: 'published' }); return listing ? json({ listing: publicListing(listing) }) : json({ error: { message: 'Listing not found.' } }, 404); } catch (error) { console.error('Listing detail query failed:', error); return json({ error: { message: 'Listing is temporarily unavailable.' } }, 503); }
}

export async function PATCH_BY_ID(id: string, request: Request, userId: string | null) {
  if (!userId || !ObjectId.isValid(userId) || !ObjectId.isValid(id)) return json({ error: { message: 'Listing not found.' } }, 404);
  try {
    const body = await request.json();
    const allowedUpdates: Record<string, unknown> = {};
    for (const field of ['title', 'description', 'category', 'address', 'province', 'district', 'sector', 'location', 'images', 'coverImage', 'availability', 'currency', 'maxGuests', 'price']) {
      if (body?.[field] !== undefined) allowedUpdates[field] = field === 'images' ? parseImages(body[field]) : body[field];
    }
    if (body?.status === 'archived') allowedUpdates.status = 'archived';
    allowedUpdates.updatedAt = new Date();
    const db = await getMongoDatabase();
    const result = await db.collection('listings').findOneAndUpdate({ _id: new ObjectId(id), userId }, { $set: allowedUpdates }, { returnDocument: 'after' });
    return result ? json({ listing: publicListing(result) }) : json({ error: { message: 'Listing not found.' } }, 404);
  } catch (error) {
    console.error('Listing update failed:', error);
    return json({ error: { message: 'We could not update this listing.' } }, 500);
  }
}

export async function DELETE_BY_ID(id: string, userId: string | null) {
  if (!userId || !ObjectId.isValid(userId) || !ObjectId.isValid(id)) return json({ error: { message: 'Listing not found.' } }, 404);
  try {
    const db = await getMongoDatabase();
    const result = await db.collection('listings').updateOne({ _id: new ObjectId(id), userId }, { $set: { status: 'archived', updatedAt: new Date() } });
    return result.matchedCount ? json({ success: true }) : json({ error: { message: 'Listing not found.' } }, 404);
  } catch (error) {
    console.error('Listing archive failed:', error);
    return json({ error: { message: 'We could not archive this listing.' } }, 500);
  }
}
