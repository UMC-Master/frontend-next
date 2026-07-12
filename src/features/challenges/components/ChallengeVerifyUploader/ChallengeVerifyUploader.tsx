'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

interface ChallengeVerifyUploaderProps {
  initialPreviewUrl?: string | null;
}

export default function ChallengeVerifyUploader({
  initialPreviewUrl = null,
}: ChallengeVerifyUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreviewUrl);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const uploadCopy = useMemo(() => {
    if (previewUrl) {
      return '인증 사진이 준비되었습니다.';
    }

    return '인증할 사진을 찍어주세요.';
  }, [previewUrl]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <section>
      <h2 className="text-title1 text-main-500">인증하기</h2>
      <p className="mb-3 text-body1 text-gray-900">{uploadCopy}</p>
      <label className="flex h-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-300">
        {previewUrl ? (
          <div className="relative h-full w-full">
            <img
              src={previewUrl}
              alt="업로드한 인증 사진"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <span className="text-[40px] text-gray-100">+</span>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </label>
    </section>
  );
}
