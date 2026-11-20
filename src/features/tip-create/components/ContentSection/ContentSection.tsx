'use client';

import { useTipWriteStore } from '../../stores/tipWriteStore';

export default function ContentSection() {
  const { content, setContent } = useTipWriteStore();

  return (
    <textarea
      aria-label="내용"
      value={content}
      onChange={e => setContent(e.target.value.slice(0, 500))}
      placeholder="내용을 입력해 주세요. (최대 500자)"
      className="h-[414px] w-full resize-none rounded-lg border-[0.4px] border-gray-500 bg-gray-100 p-3 text-body1 text-gray-900 outline-none placeholder:text-gray-800 focus:border-main-500"
    />
  );
}
