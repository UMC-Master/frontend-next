'use client';

import { useState } from 'react';
import ArrowBackIcon from '@/assets/svgs/arrow_backward.svg';

interface RankAccordionProps {
  title: string;
  description: string;
}

export default function RankAccordion({
  title,
  description,
}: RankAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 rounded-2xl px-4 py-3 shadow-[0px_0px_16px_0px_rgba(234,234,234,1)] flex items-center justify-between w-full"
      >
        <span className="text-title3 text-main-600">{title}</span>
        <div
          className={`flex items-center justify-center shrink-0 w-5 h-5 transition-transform ${
            isOpen ? 'rotate-90 scale-y-[-100%]' : 'rotate-[270deg] scale-y-[-100%]'
          }`}
        >
          <ArrowBackIcon className="w-5 h-5" />
        </div>
      </button>

      {/* Expandable Content */}
      {isOpen && (
        <div className="bg-gray-100 rounded-2xl px-4 py-3 shadow-[0px_0px_16px_0px_rgba(234,234,234,1)]">
          <p className="text-body1 text-gray-900">{description}</p>
        </div>
      )}
    </div>
  );
}
