'use client';

import { useState } from 'react';
import Image from 'next/image';
import Camera from '@/assets/svgs/Camera.svg';

export default function ProfileImageUpload() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-[108px] h-[108px]">
      <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-300">
        {imageUrl ? (
          <Image src={imageUrl} alt="프로필 사진" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>

      <label
        htmlFor="profile-image-upload"
        className="absolute bottom-0 right-0 flex size-9 cursor-pointer items-center justify-center rounded-full bg-gray-1000"
        aria-label="프로필 사진 변경"
      >
        <Camera className="w-5 h-5 text-white" />
      </label>

      <input
        id="profile-image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
