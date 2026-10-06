'use client';

import Image from 'next/image';
import { useTipWriteStore } from '../../stores/tipWriteStore';
import AddCircle from '@/assets/svgs/add_circle.svg';
import { useEffect, useState } from 'react';

function ImagePreview({ file }: { file: File }) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    const preview = URL.createObjectURL(file);
    setUrl(preview);
    return () => URL.revokeObjectURL(preview);
  }, [file]);
  return url ? (
    <Image
      src={url}
      alt="첨부 이미지"
      fill
      unoptimized
      className="object-cover"
    />
  ) : null;
}

export default function ImageSection() {
  const { images, addImage, removeImage } = useTipWriteStore();

  return (
    <section className="px-5 pt-6">
      <p className="mb-3 text-title3 text-gray-900 font-semibold">
        사진을 첨부해 주세요. (최대 5장)
      </p>

      <div className="flex gap-3">
        {images.map((file, idx) => (
          <div
            key={idx}
            className="relative h-[9.75rem] w-[9.75rem] overflow-hidden rounded-lg"
          >
            <ImagePreview file={file} />
            <button
              onClick={() => removeImage(idx)}
              type="button"
              aria-label={`첨부 이미지 ${idx + 1} 삭제`}
              className="absolute right-1 top-1 rounded-full bg-black/50 px-1 text-white"
            >
              ×
            </button>
          </div>
        ))}

        {images.length < 5 && (
          <label className="flex h-[9.75rem] w-[9.75rem] cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-2xl">
            <AddCircle />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={e => {
                const file = e.target.files?.[0];
                if (file && file.type.startsWith('image/')) addImage(file);
                else if (file) alert('이미지 파일만 첨부할 수 있습니다.');
                e.target.value = '';
              }}
            />
          </label>
        )}
      </div>
    </section>
  );
}
