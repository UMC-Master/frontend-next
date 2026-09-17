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
    <div className="flex w-full min-w-0 flex-col gap-4">
      {items.map((item, index) => (
        <div key={index} className="flex w-full min-w-0 flex-col gap-3">
          <button
            type="button"
            onClick={() => handleToggle(index)}
            aria-expanded={openIndex === index}
            className="flex w-full min-w-0 max-w-full items-center justify-between rounded-2xl bg-main-500 px-4 py-3 shadow-[0_0_16px_0_#eaeaea]"
          >
            <span className="min-w-0 flex-1 break-keep text-left text-title4 text-gray-100">
              {item.question}
            </span>
            <span className="ml-3 flex size-7 shrink-0 items-center justify-center overflow-visible">
              <ArrowDownIcon
                className={`size-5 overflow-visible text-gray-100 transition-transform [&_path]:fill-current ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </span>
          </button>

          {openIndex === index && (
            <div className="w-full min-w-0 max-w-full rounded-2xl bg-gray-100 px-4 py-3 shadow-[0_0_16px_0_#eaeaea]">
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
