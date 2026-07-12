import Image from 'next/image';

interface ChallengeHeroSingleProps {
  image: string;
  title: string;
}

export default function ChallengeHeroSingle({
  image,
  title,
}: ChallengeHeroSingleProps) {
  return (
    <div className="relative mb-4 h-[328px] overflow-hidden rounded-lg">
      <Image src={image} alt={title} fill className="object-cover" sizes="380px" />
    </div>
  );
}
