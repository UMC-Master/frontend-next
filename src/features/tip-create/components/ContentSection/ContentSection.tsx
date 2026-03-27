'use client';

import { useTipWriteStore } from '../../stores/tipWriteStore';

export default function ContentSection() {
  const { content, setContent } = useTipWriteStore();

  return (
    <section className="px-5 pt-4">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value.slice(0, 500))}
        placeholder="내용을 입력해 주세요. (최대 500자)"
        className="h-[220px] w-full resize-none rounded-lg border-[0.4px] border-gray-500 px-4 py-3 text-body1 text-gray-900 outline-none"
      />
    </section>
  );
}
