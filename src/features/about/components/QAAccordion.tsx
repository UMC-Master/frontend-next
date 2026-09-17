'use client';

import { useState } from 'react';
import ArrowDownIcon from '@/assets/svgs/arrow_downward.svg';

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
          <button
            type="button"
            onClick={() => handleToggle(index)}
            aria-expanded={openIndex === index}
            className="flex items-center justify-between w-full px-4 py-3 bg-main-500 rounded-2xl shadow-[0_0_16px_0_#eaeaea]"
          >
            <span className="text-title4 text-gray-100">{item.question}</span>
            <span className="ml-3 flex size-6 shrink-0 items-center justify-center overflow-visible">
              <ArrowDownIcon
                className={`size-5 text-gray-100 transition-transform [&_path]:fill-current ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </span>
          </button>

          {openIndex === index && (
            <div className="px-4 py-3 bg-gray-100 rounded-2xl shadow-[0_0_16px_0_#eaeaea]">
              <p className="text-body2 text-gray-1000 whitespace-pre-line">
                {item.answer || '답변 준비 중입니다.'}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
