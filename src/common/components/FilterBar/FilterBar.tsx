'use client';

import { useState } from 'react';

const filterOptions = [
  { label: '전체보기', value: 'all' },
  { label: '좋아요순', value: 'like' },
  { label: '저장많은순', value: 'save' },
  { label: '공유많은순', value: 'share' },
];

export interface FilterBarProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: Array<{ label: string; value: string }>;
}

export default function FilterBar({
  defaultValue = 'all',
  onChange,
  options = filterOptions,
}: FilterBarProps) {
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="inline-flex gap-[9px]">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={`px-3 py-1.5 rounded-lg text-body2 transition-colors
            ${
              selected === option.value
                ? 'bg-main-500 text-gray-100'
                : 'bg-gray-200 text-gray-800'
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
