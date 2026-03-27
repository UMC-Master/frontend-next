import Image from 'next/image';

interface Props {
  title: string;
  author: {
    name: string;
    level: string;
    avatarUrl: string;
  };
  createdAt: string;
}

export default function TipHeader({ title, author, createdAt }: Props) {
  return (
    <section className="px-5 pt-4">
      <h1 className="text-title2 font-semibold leading-snug text-gray-1000">
        {title}
      </h1>

      <div className="mt-3 flex items-end gap-2 text-caption1">
        <Image
          src={author.avatarUrl}
          alt={`${author.name} 프로필 이미지`}
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex flex-col items-start gap-1">
          <span className="text-title4 font-medium text-gray-900">
            {author.name}
          </span>
          <div className="flex items-start gap-1">
            <span className="text-gray-800">등급</span>
            <span className="text-gray-700">{author.level}</span>
          </div>
        </div>

        <span className="ml-auto text-gray-900">{createdAt}</span>
      </div>
    </section>
  );
}
