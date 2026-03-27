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
      {/* Profile Image */}
      <div className="w-full h-full rounded-full overflow-hidden bg-gray-300">
        {imageUrl ? (
          <Image src={imageUrl} alt="프로필 사진" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>

      {/* Camera Icon Button */}
      <label
        htmlFor="profile-image-upload"
        className="absolute bottom-0 right-0 w-8 h-8 bg-gray-1000 rounded-full flex items-center justify-center cursor-pointer"
      >
        <Camera className="w-5 h-5 text-white" />
      </label>

      {/* Hidden File Input */}
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
