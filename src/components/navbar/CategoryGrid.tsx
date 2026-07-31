import type { CategoryGroup } from '../../data/categoryNavigation';
import CategoryCard from './CategoryCard';

type CategoryGridProps = {
  groups: CategoryGroup[];
};

export default function CategoryGrid({ groups }: CategoryGridProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.id}>
          <div className="mb-3">
            <h3 className="text-base font-semibold text-slate-900">{group.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{group.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <CategoryCard key={item.id} title={item.title} description={item.description} icon={item.icon} href={item.href} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
