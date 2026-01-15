'use client';

import { useTipWriteStore } from '../../stores/tipWriteStore';

export default function TitleSection() {
  const { title, setTitle } = useTipWriteStore();

  return (
    <section className="px-5 pt-4">
      <input
        value={title}
        onChange={e => setTitle(e.target.value.slice(0, 24))}
        placeholder="제목을 입력해 주세요. (최대 24자)"
        className="w-full rounded-lg border-[0.4px] border-gray-500 px-4 py-3 text-body1 text-gray-900 outline-none"
      />
    </section>
  );
}
