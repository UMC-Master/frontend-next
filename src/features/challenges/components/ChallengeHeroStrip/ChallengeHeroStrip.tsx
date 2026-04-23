import Image from 'next/image';

interface ChallengeHeroStripProps {
  images: string[];
  title: string;
}

export default function ChallengeHeroStrip({
  images,
  title,
}: ChallengeHeroStripProps) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-[15px]">
      {images.slice(0, 2).map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="relative aspect-square overflow-hidden rounded-[10px] bg-gray-300"
        >
          <Image src={image} alt={title} fill className="object-cover" sizes="200px" />
        </div>
      ))}
    </div>
  );
}
