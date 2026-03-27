import Image from 'next/image';

interface Props {
  images: string[];
}

export default function ImageGrid({ images }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 pt-3">
      {images.slice(0, 4).map((src, idx) => (
        <div
          key={idx}
          className="relative aspect-square w-full overflow-hidden rounded-[0.625rem]"
        >
          <Image
            src={src}
            alt="꿀팁 이미지"
            fill
            className="object-cover"
            sizes="(max-width: 430px) 50vw, 215px"
            priority={idx === 0}
          />
        </div>
      ))}
    </div>
  );
}
