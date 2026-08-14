export type ListingType = 'experiences' | 'events' | 'services';

export type ImageAsset = {
  id: string;
  publicId: string;
  secureUrl: string;
  path: string;
  filename: string;
  status: 'uploading' | 'uploaded' | 'failed';
  progress: number;
  error?: string;
  isCover: boolean;
  previewUrl?: string;
};

export type HostFormData = {
  listingType: ListingType | null;
  category: string;
  province: string;
  district: string;
  sector: string;
  address: string;
  landmark: string;
  latitude: number | null;
  longitude: number | null;
  title: string;
  summary: string;
  description: string;
  languages: string;
  maxGuests: string;
  duration: string;
  operatingDays: string;
  operatingHours: string;
  included: string;
  guestRequirements: string;
  accessibility: string;
  gallery: ImageAsset[];
  promoVideoUrl: string;
  availability: {
    startTime: string;
    endTime: string;
    eventDate: string;
    multiDay: boolean;
    capacity: string;
    weeklySchedule: string;
    appointmentDuration: string;
    closedDays: string;
    bookingCutoff: string;
  };
  pricing: {
    currency: string;
    pricePerGuest: string;
    groupDiscount: string;
    standardTicketPrice: string;
    vipTicketPrice: string;
    earlyBirdPrice: string;
    freeEvent: boolean;
    hourlyRate: string;
    dailyRate: string;
    fixedPackagePrice: string;
    negotiable: boolean;
    taxesIncluded: boolean;
    serviceFee: string;
  };
  draft: boolean;
};

export const defaultHostFormData: HostFormData = {
  listingType: null,
  category: '',
  province: '',
  district: '',
  sector: '',
  address: '',
  landmark: '',
  latitude: null,
  longitude: null,
  title: '',
  summary: '',
  description: '',
  languages: '',
  maxGuests: '',
  duration: '',
  operatingDays: '',
  operatingHours: '',
  included: '',
  guestRequirements: '',
  accessibility: '',
  gallery: [],
  promoVideoUrl: '',
  availability: {
    startTime: '',
    endTime: '',
    eventDate: '',
    multiDay: false,
    capacity: '',
    weeklySchedule: '',
    appointmentDuration: '',
    closedDays: '',
    bookingCutoff: '',
  },
  pricing: {
    currency: 'RWF',
    pricePerGuest: '',
    groupDiscount: '',
    standardTicketPrice: '',
    vipTicketPrice: '',
    earlyBirdPrice: '',
    freeEvent: false,
    hourlyRate: '',
    dailyRate: '',
    fixedPackagePrice: '',
    negotiable: false,
    taxesIncluded: false,
    serviceFee: '10',
  },
  draft: false,
};
