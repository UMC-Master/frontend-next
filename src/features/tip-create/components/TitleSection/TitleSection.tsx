'use client';

import { useTipWriteStore } from '../../stores/tipWriteStore';

export default function TitleSection() {
  const { title, setTitle } = useTipWriteStore();

  return (
    <input
      aria-label="제목"
      value={title}
      onChange={e => setTitle(e.target.value.slice(0, 24))}
      placeholder="제목을 입력해 주세요. (최대 24자)"
      className="h-12 w-full rounded-lg border-[0.4px] border-gray-500 bg-gray-100 px-3 text-body1 text-gray-900 outline-none placeholder:text-gray-800 focus:border-main-500"
    />
  );
}
