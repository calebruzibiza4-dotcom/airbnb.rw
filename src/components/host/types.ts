export type ListingType = 'experiences' | 'events' | 'services';

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
};
