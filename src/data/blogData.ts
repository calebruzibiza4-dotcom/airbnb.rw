export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Culture' | 'Stay' | 'Experience' | 'Travel Guide' | 'Eco Tourism';
  readTime: string;
  date: string;
  image: string;
  author: string;
  featured?: boolean;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'top-5-emerging-art-spaces-kigali',
    title: 'Top 5 Emerging Art Spaces in Kigali',
    excerpt: 'From intimate galleries to community studios, Kigali is redefining the creative energy of East Africa.',
    category: 'Culture',
    readTime: '5 min read',
    date: 'April 12, 2026',
    author: 'Amina Niyonsenga',
    featured: true,
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Kigali has become a powerful home for contemporary African art, where murals, galleries, and community studios are shaping a new cultural narrative. The city’s creative scene feels young, experimental, and deeply rooted in local stories.',
      'What makes these spaces especially compelling is the way they invite both visitors and residents into the work itself. Instead of isolated exhibitions, many venues function as gathering spaces for dialogue, performances, and learning. That makes Kigali a destination not just for visual discovery, but for cultural immersion.',
      'Whether you are exploring the city for a weekend or settling in for a longer stay, these emerging art spaces offer a different kind of Rwanda experience: intimate, expressive, and grounded in the people shaping the next chapter of the country’s creative identity.',
    ],
  },
  {
    slug: 'future-of-eco-tourism-musanze',
    title: 'The Future of Eco-Tourism in Musanze',
    excerpt: 'In the heart of Rwanda’s volcanic north, conservation-first travel is becoming a blueprint for sustainable growth.',
    category: 'Eco Tourism',
    readTime: '6 min read',
    date: 'March 28, 2026',
    author: 'Jean-Pierre Habimana',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Musanze has long been known for its dramatic landscapes and access to Volcanoes National Park, but a more meaningful story is unfolding around it. Eco-tourism here is no longer a niche offering; it is becoming a core value of how the region grows.',
      'Small lodges, community-led conservation projects, and locally guided experiences are creating a tourism model that benefits both travelers and residents. Guests are not just passing through; they are participating in a more regenerative form of exploration that respects the environment and elevates local stewardship.',
      'That shift is essential for Rwanda. It allows natural beauty to remain a long-term asset rather than a short-term attraction, while helping travelers experience the country through a more conscious lens.',
    ],
  },
  {
    slug: 'hidden-gems-lake-kivu-weekend',
    title: 'Hidden Gems for a Lake Kivu Weekend Escape',
    excerpt: 'This gentle lakeside route combines quiet luxury, local food, and panoramic views for a restorative stay.',
    category: 'Stay',
    readTime: '4 min read',
    date: 'March 11, 2026',
    author: 'Elise Uwase',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    content: [
      'A Lake Kivu weekend is ideal for travelers who want space to breathe without leaving authentic Rwanda behind. The shoreline offers a completely different rhythm from Kigali, one that slows the pace and draws attention to texture, light, and conversation.',
      'The most memorable experiences here are often the simplest: waking up to the sunrise over the lake, tasting fresh fish prepared in a family-run lodge, or taking a short boat ride to a nearby village known for its local craft traditions.',
      'For those designing a slower itinerary, this part of Rwanda offers a rare balance between beauty, privacy, and connection to place.',
    ],
  },
  {
    slug: 'best-places-to-see-gorillas',
    title: 'The Best Ways to Experience Rwanda’s Gorillas',
    excerpt: 'From conservation-led treks to thoughtful aftercare, ethical encounters are shaping the future of wildlife tourism.',
    category: 'Experience',
    readTime: '7 min read',
    date: 'February 20, 2026',
    author: 'Samuel Mugisha',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Gorilla encounters in Rwanda are among the most profound experiences on the continent, but the best versions of those encounters are the ones shaped by respect and care. The experience is not just about being close to a species; it is about understanding the conditions that make such conservation possible.',
      'Well-guided treks have become more intentional, with education, conservation awareness, and community benefit woven into the visit. This creates a richer and more meaningful journey for travelers while giving local conservation work the support it needs.',
      'If you are planning a mountain trek, the real luxury is in the depth of the experience: time, context, and a deeper connection to the people and ecosystems working to preserve this extraordinary wildlife.',
    ],
  },
  {
    slug: 'how-to-plan-rwanda-itinerary',
    title: 'How to Build a Rwanda Itinerary That Feels Effortless',
    excerpt: 'A thoughtfully paced route can turn a country visit into a layered, memorable journey rather than a checklist.',
    category: 'Travel Guide',
    readTime: '8 min read',
    date: 'February 03, 2026',
    author: 'Claire Mukamanzi',
    image: 'https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1200&q=80',
    content: [
      'The secret to a memorable Rwanda itinerary is not packing in everything at once; it is building enough intentional space to actually notice where you are. A great trip here balances movement with stillness, highlight experiences with local rhythm.',
      'For first-time visitors, a blend of city energy, mountain landscapes, and lakeside recovery is often ideal. Kigali provides the cultural entry point, while a two-night stay in the north adds mountain or wildlife depth, and Lake Kivu offers a grounding final chapter.',
      'The best itineraries do not feel overprogrammed. They leave room for improvisation, long meals, conversations with hosts, and the kind of serendipity that makes a destination feel personal.',
    ],
  },
];

export const featuredBlog = blogPosts.find((post) => post.featured) ?? blogPosts[0];
