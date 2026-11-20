'use client';

import { CATEGORIES } from './CategorySection.constants';
import { useTipWriteStore } from '../../stores/tipWriteStore';

export default function CategorySection() {
  const { categories, toggleCategory } = useTipWriteStore();

  return (
    <section>
      <p className="mb-3 text-title3 text-gray-900 font-semibold">
        카테고리를 선택해 주세요. (최대 5개)
      </p>
      <div className="space-y-5">
        {CATEGORIES.map(group => (
          <div key={group.title}>
            <p className="mb-3 text-title3 text-gray-800 font-semibold">
              {group.title}
            </p>

            <div className="flex flex-wrap gap-3">
              {group.items.map(item => {
                const active = categories.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleCategory(item)}
                    className={`
                    rounded-lg px-3 py-1.5 text-body2
                    ${
                      active
                        ? 'bg-main-500 text-gray-100'
                        : 'bg-gray-200 text-gray-800'
                    }
                  `}
                  >
                    #{item}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
