import { useMemo, useState } from 'react';
import { Compass } from 'lucide-react';
import { experiencesGroups, eventsGroups, servicesGroups, topCategories, type TopCategoryKey } from '../../data/categoryNavigation';
import CategoryButton from './CategoryButton';
import CategoryGrid from './CategoryGrid';
import CategoryModal from './CategoryModal';

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState<TopCategoryKey>('everything');
  const [modalOpen, setModalOpen] = useState(false);

  const activeContent = useMemo(() => {
    switch (activeCategory) {
      case 'experiences':
        return {
          title: 'Experiences',
          description: 'From gorilla trekking to lake cruises, discover the best Rwanda moments.',
          groups: experiencesGroups,
        };
      case 'events':
        return {
          title: 'Events',
          description: 'Find cultural celebrations, conferences and city highlights.',
          groups: eventsGroups,
        };
      case 'services':
        return {
          title: 'Services',
          description: 'Explore transport, guides, hospitality and lifestyle support.',
          groups: servicesGroups,
        };
      default:
        return null;
    }
  }, [activeCategory]);

  const handleSelect = (category: TopCategoryKey) => {
    if (category === 'everything') {
      setActiveCategory('everything');
      setModalOpen(false);
      return;
    }

    setActiveCategory(category);
    setModalOpen(true);
  };

  return (
    <section className="sticky top-[88px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {topCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <CategoryButton
                key={category.id}
                label={category.label}
                icon={Icon}
                active={isActive}
                onClick={() => handleSelect(category.id)}
              />
            );
          })}
        </div>

      </div>

      <CategoryModal
        open={modalOpen}
        title={activeContent?.title ?? 'Discover Rwanda'}
        description={activeContent?.description ?? 'Browse local experiences, events and services tailored to your journey.'}
        onClose={() => {
          setModalOpen(false);
          setActiveCategory('everything');
        }}
      >
        {activeContent ? <CategoryGrid groups={activeContent.groups} /> : null}
      </CategoryModal>
    </section>
  );
}
