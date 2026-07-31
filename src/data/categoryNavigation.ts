import {
  BadgeCheck,
  Bike,
  Building2,
  CalendarDays,
  Camera,
  CarFront,
  ChefHat,
  Coffee,
  Compass,
  Home,
  Landmark,
  Map,
  Mountain,
  Music4,
  Palette,
  PartyPopper,
  Plane,
  Sparkles,
  TentTree,
  Trees,
  UtensilsCrossed,
  Users2,
  Waves,
  Baby,
  BriefcaseBusiness,
  ShipWheel,
  Video,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type TopCategoryKey = 'everything' | 'experiences' | 'events' | 'services';

export type CategoryCardItem = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export type CategoryGroup = {
  id: string;
  title: string;
  description: string;
  items: CategoryCardItem[];
};

export type TopCategory = {
  id: TopCategoryKey;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const topCategories: TopCategory[] = [
  {
    id: 'everything',
    label: 'Everything',
    description: 'All stays, experiences, events and services',
    icon: Compass,
  },
  {
    id: 'experiences',
    label: 'Experiences',
    description: 'Nature, culture, adventure and wellness',
    icon: Sparkles,
  },
  {
    id: 'events',
    label: 'Events',
    description: 'Festivals, concerts and gatherings',
    icon: CalendarDays,
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Transport, guides and lifestyle support',
    icon: Home,
  },
];

export const experiencesGroups: CategoryGroup[] = [
  {
    id: 'nature',
    title: 'Nature',
    description: 'Immersive outdoor escapes shaped by Rwanda’s landscapes.',
    items: [
      {
        id: 'gorilla-trekking',
        title: 'Gorilla Trekking',
        description: 'A once-in-a-lifetime encounter in Volcanoes National Park.',
        icon: BadgeCheck,
        href: '/experiences?type=gorilla-trekking',
      },
      {
        id: 'volcano-hiking',
        title: 'Volcano Hiking',
        description: 'Guided hikes through misty ridges and dramatic peaks.',
        icon: Mountain,
        href: '/experiences?type=volcano-hiking',
      },
      {
        id: 'akagera-safari',
        title: 'Akagera Safari',
        description: 'Game drives and wildlife discovery in the savanna.',
        icon: Trees,
        href: '/experiences?type=akagera-safari',
      },
      {
        id: 'nyungwe-canopy',
        title: 'Nyungwe Canopy Walk',
        description: 'A suspended path above rainforest canopies and birds.',
        icon: Map,
        href: '/experiences?type=nyungwe-canopy',
      },
    ],
  },
  {
    id: 'culture',
    title: 'Culture',
    description: 'Local traditions, heritage and authentic Rwanda stories.',
    items: [
      {
        id: 'cultural-villages',
        title: 'Cultural Villages',
        description: 'Visit living communities and local craftsmanship.',
        icon: Landmark,
        href: '/experiences?type=cultural-villages',
      },
      {
        id: 'traditional-dance',
        title: 'Traditional Dance',
        description: 'Evening performances with vibrant music and rhythm.',
        icon: Music4,
        href: '/experiences?type=traditional-dance',
      },
      {
        id: 'coffee-tours',
        title: 'Coffee Tours',
        description: 'Learn the journey from bean to cup with local farmers.',
        icon: Coffee,
        href: '/experiences?type=coffee-tours',
      },
      {
        id: 'local-brewing',
        title: 'Local Brewing Tours',
        description: 'Taste Rwanda’s heritage through brewing traditions.',
        icon: ShipWheel,
        href: '/experiences?type=local-brewing',
      },
    ],
  },
  {
    id: 'adventure',
    title: 'Adventure',
    description: 'High-energy activities for curious travelers.',
    items: [
      {
        id: 'mountain-biking',
        title: 'Mountain Biking',
        description: 'Ride scenic trails through hills and villages.',
        icon: Bike,
        href: '/experiences?type=mountain-biking',
      },
      {
        id: 'hiking',
        title: 'Hiking',
        description: 'Slow-paced treks through valleys and forest paths.',
        icon: Mountain,
        href: '/experiences?type=hiking',
      },
      {
        id: 'kayaking',
        title: 'Kayaking',
        description: 'Water adventures on Rwanda’s lakes and rivers.',
        icon: Waves,
        href: '/experiences?type=kayaking',
      },
      {
        id: 'zipline',
        title: 'Zipline',
        description: 'A thrilling aerial route over green landscapes.',
        icon: Sparkles,
        href: '/experiences?type=zipline',
      },
    ],
  },
  {
    id: 'relaxation',
    title: 'Relaxation',
    description: 'Moments that slow time and reconnect you with nature.',
    items: [
      {
        id: 'spa-retreats',
        title: 'Spa Retreats',
        description: 'Restore your energy in serene wellness spaces.',
        icon: Sparkles,
        href: '/experiences?type=spa-retreats',
      },
      {
        id: 'lake-cruises',
        title: 'Lake Kivu Cruises',
        description: 'Scenic lakeside journeys with calm views and sunset light.',
        icon: Waves,
        href: '/experiences?type=lake-cruises',
      },
      {
        id: 'camping',
        title: 'Camping',
        description: 'Quiet nights under stars with curated outdoor stays.',
        icon: TentTree,
        href: '/experiences?type=camping',
      },
    ],
  },
];

export const eventsGroups: CategoryGroup[] = [
  {
    id: 'events-main',
    title: 'Upcoming Highlights',
    description: 'Celebrate Rwanda through culture, music and seasonal energy.',
    items: [
      { id: 'concerts', title: 'Concerts', description: 'Live music evenings and intimate performances.', icon: Music4, href: '/events?type=concerts' },
      { id: 'festivals', title: 'Festivals', description: 'Community-led cultural celebrations year round.', icon: PartyPopper, href: '/events?type=festivals' },
      { id: 'sports-events', title: 'Sports Events', description: 'Races, marathons and active community shows.', icon: Bike, href: '/events?type=sports-events' },
      { id: 'theatre', title: 'Theatre', description: 'Performances that bring stories and heritage to life.', icon: Camera, href: '/events?type=theatre' },
      { id: 'art-exhibitions', title: 'Art Exhibitions', description: 'Curated shows featuring local artists and creators.', icon: Palette, href: '/events?type=art-exhibitions' },
      { id: 'food-festivals', title: 'Food Festivals', description: 'Outdoor tastings, markets and signature culinary events.', icon: UtensilsCrossed, href: '/events?type=food-festivals' },
      { id: 'conferences', title: 'Conferences', description: 'Thoughtful gatherings for business and tourism.', icon: Building2, href: '/events?type=conferences' },
      { id: 'community-events', title: 'Community Events', description: 'Neighbourhood experiences and local initiatives.', icon: Users2, href: '/events?type=community-events' },
    ],
  },
];

export const servicesGroups: CategoryGroup[] = [
  {
    id: 'transportation',
    title: 'Transportation',
    description: 'Reliable movement for arrivals, departures and local exploration.',
    items: [
      { id: 'car-rentals', title: 'Car Rentals', description: 'Flexible self-drive options for scenic routes.', icon: CarFront, href: '/services?type=car-rentals' },
      { id: 'airport-transfers', title: 'Airport Transfers', description: 'Comfortable arrivals and departures with local drivers.', icon: Plane, href: '/services?type=airport-transfers' },
      { id: 'motorcycle-rentals', title: 'Motorcycle Rentals', description: 'Agile transport for urban and countryside discoveries.', icon: Bike, href: '/services?type=motorcycle-rentals' },
    ],
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Specialists who help shape your stay and story.',
    items: [
      { id: 'tour-guides', title: 'Tour Guides', description: 'Local experts to guide you through Rwanda’s highlights.', icon: Compass, href: '/services?type=tour-guides' },
      { id: 'photographers', title: 'Photographers', description: 'Capture meaningful moments across landscapes and cityscapes.', icon: Camera, href: '/services?type=photographers' },
      { id: 'videographers', title: 'Videographers', description: 'Polished visual storytelling for your journey.', icon: Video, href: '/services?type=videographers' },
    ],
  },
  {
    id: 'accommodation',
    title: 'Accommodation',
    description: 'Support for hosts and properties that need care.',
    items: [
      { id: 'property-management', title: 'Property Management', description: 'Professional support for vacation homes and stays.', icon: Home, href: '/services?type=property-management' },
      { id: 'house-cleaning', title: 'House Cleaning', description: 'Trusted care for polished, guest-ready spaces.', icon: Sparkles, href: '/services?type=house-cleaning' },
    ],
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    description: 'Everyday comforts that elevate your experience.',
    items: [
      { id: 'private-chef', title: 'Private Chef', description: 'Personalised dining crafted for your stay.', icon: ChefHat, href: '/services?type=private-chef' },
      { id: 'babysitting', title: 'Babysitting', description: 'Reliable care for families travelling with children.', icon: Baby, href: '/services?type=babysitting' },
    ],
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Helpful services for work, hosting and elevated gatherings.',
    items: [
      { id: 'event-planning', title: 'Event Planning', description: 'Thoughtful coordination for memorable gatherings.', icon: CalendarDays, href: '/services?type=event-planning' },
      { id: 'catering', title: 'Catering', description: 'Fresh, local flavours for events and private occasions.', icon: UtensilsCrossed, href: '/services?type=catering' },
      { id: 'meeting-rooms', title: 'Meeting Rooms', description: 'Flexible spaces for work, workshops and retreats.', icon: BriefcaseBusiness, href: '/services?type=meeting-rooms' },
    ],
  },
];
