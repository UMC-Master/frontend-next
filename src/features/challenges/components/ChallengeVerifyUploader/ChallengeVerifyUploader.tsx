'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  initialPreviewUrl?: string | null;
  files?: File[];
  onChange?: (files: File[]) => void;
  disabled?: boolean;
}

export default function ChallengeVerifyUploader({
  initialPreviewUrl = null,
  files,
  onChange,
  disabled = false,
}: Props) {
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const selectedFiles = files ?? internalFiles;
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const urls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [selectedFiles]);
  const update = (next: File[]) => {
    setInternalFiles(next);
    onChange?.(next);
    setError('');
  };
  const shown = previews.length
    ? previews
    : initialPreviewUrl
      ? [initialPreviewUrl]
      : [];
  return (
    <section>
      <h2 className="text-title1 text-main-500">인증하기</h2>
      <p className="mb-3 text-body1">
        인증 사진을 첨부해 주세요. ({selectedFiles.length}/5)
      </p>
      <div className="grid grid-cols-2 gap-3">
        {shown.map((url, index) => (
          <div
            key={url}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={url}
              alt={`인증 사진 ${index + 1}`}
              fill
              unoptimized
              className="object-cover"
            />
            {!!selectedFiles.length && (
              <button
                type="button"
                aria-label={`인증 사진 ${index + 1} 삭제`}
                disabled={disabled}
                onClick={() =>
                  update(
                    selectedFiles.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
                className="absolute right-1 top-1 rounded-full bg-black/60 px-2 text-white"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {selectedFiles.length < 5 && (
          <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-gray-300 text-4xl">
            +
            <input
              type="file"
              multiple
              accept="image/*"
              aria-label="인증 이미지 첨부"
              className="sr-only"
              disabled={disabled}
              onChange={event => {
                const next = Array.from(event.target.files || []);
                event.target.value = '';
                if (selectedFiles.length + next.length > 5) {
                  setError('이미지는 최대 5장까지 첨부할 수 있습니다.');
                  return;
                }
                if (next.some(file => !file.type.startsWith('image/'))) {
                  setError('이미지 파일만 첨부할 수 있습니다.');
                  return;
                }
                update([...selectedFiles, ...next]);
              }}
            />
          </label>
        )}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-red">
          {error}
        </p>
      )}
    </section>
  );
}
