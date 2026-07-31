import {
  BadgeCheck,
  Bike,
  BookOpen,
  Building2,
  Coffee,
  Compass,
  Gem,
  Home,
  Hotel,
  Landmark,
  Mountain,
  Palette,
  PartyPopper,
  Sparkles,
  TentTree,
  Trees,
  Users,
  UtensilsCrossed,
  Waves,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Category = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  slug: string;
};

export const categories: Category[] = [
  {
    id: 'apartments',
    label: 'Apartments',
    description: 'Modern apartments and serviced stays',
    icon: Home,
    slug: 'apartments',
  },
  {
    id: 'hotels',
    label: 'Hotels',
    description: 'Resorts, lodges and boutique hotels',
    icon: Hotel,
    slug: 'hotels',
  },
  {
    id: 'gorilla-trekking',
    label: 'Gorilla Trekking',
    description: 'Volcanoes National Park experiences',
    icon: BadgeCheck,
    slug: 'gorilla-trekking',
  },
  {
    id: 'wildlife-safari',
    label: 'Wildlife Safari',
    description: 'Akagera and big-game adventures',
    icon: Trees,
    slug: 'wildlife-safari',
  },
  {
    id: 'volcano-adventures',
    label: 'Volcano Adventures',
    description: 'Hiking and mountain journeys',
    icon: Mountain,
    slug: 'volcano-adventures',
  },
  {
    id: 'national-parks',
    label: 'National Parks',
    description: 'Protected landscapes and nature escapes',
    icon: Compass,
    slug: 'national-parks',
  },
  {
    id: 'guided-tours',
    label: 'Guided Tours',
    description: 'Professional local tours and excursions',
    icon: Building2,
    slug: 'guided-tours',
  },
  {
    id: 'culture-heritage',
    label: 'Culture & Heritage',
    description: 'Museums, villages and traditions',
    icon: Landmark,
    slug: 'culture-heritage',
  },
  {
    id: 'coffee-experiences',
    label: 'Coffee Experiences',
    description: 'Farm tours and tasting journeys',
    icon: Coffee,
    slug: 'coffee-experiences',
  },
  {
    id: 'food-dining',
    label: 'Food & Dining',
    description: 'Restaurants and authentic cuisine',
    icon: UtensilsCrossed,
    slug: 'food-dining',
  },
  {
    id: 'camping',
    label: 'Camping',
    description: 'Outdoor stays and nature retreats',
    icon: TentTree,
    slug: 'camping',
  },
  {
    id: 'lake-escapes',
    label: 'Lake Escapes',
    description: 'Lake Kivu and lakeside stays',
    icon: Waves,
    slug: 'lake-escapes',
  },
  {
    id: 'kigali-city',
    label: 'Kigali City',
    description: 'Urban stays and city experiences',
    icon: Building2,
    slug: 'kigali-city',
  },
  {
    id: 'adventure-sports',
    label: 'Adventure Sports',
    description: 'Cycling, kayaking and outdoor sports',
    icon: Bike,
    slug: 'adventure-sports',
  },
  {
    id: 'art-creativity',
    label: 'Art & Creativity',
    description: 'Crafts, workshops and creative spaces',
    icon: Palette,
    slug: 'art-creativity',
  },
  {
    id: 'wellness-spa',
    label: 'Wellness & Spa',
    description: 'Relaxation and restorative retreats',
    icon: Sparkles,
    slug: 'wellness-spa',
  },
  {
    id: 'events',
    label: 'Events',
    description: 'Festivals, concerts and seasonal happenings',
    icon: PartyPopper,
    slug: 'events',
  },
  {
    id: 'family-friendly',
    label: 'Family Friendly',
    description: 'Activities suitable for all ages',
    icon: Users,
    slug: 'family-friendly',
  },
  {
    id: 'hidden-gems',
    label: 'Hidden Gems',
    description: 'Local favourites and off-the-beaten-path',
    icon: Gem,
    slug: 'hidden-gems',
  },
];
