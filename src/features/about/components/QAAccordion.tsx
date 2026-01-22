'use client';

import { useState } from 'react';
import ArrowBackIcon from '@/assets/svgs/arrow_backward.svg';

export interface QAItem {
  question: string;
  answer: string;
}

export interface QAAccordionProps {
  items: QAItem[];
}

export default function QAAccordion({ items }: QAAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-3">
          {/* Question */}
          <button
            onClick={() => handleToggle(index)}
            className="flex items-center justify-between w-full px-4 py-3 bg-main-500 rounded-2xl shadow-[0_0_16px_0_#eaeaea]"
          >
            <span className="text-title4 text-gray-100">{item.question}</span>
            <ArrowBackIcon
              className={`text-gray-100 transition-transform ${
                openIndex === index ? 'rotate-90' : '-rotate-90'
              }`}
            />
          </button>

          {/* Answer */}
          {openIndex === index && item.answer && (
            <div className="px-4 py-3 bg-gray-100 rounded-2xl shadow-[0_0_16px_0_#eaeaea]">
              <p className="text-body2 text-gray-1000 whitespace-pre-line">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
