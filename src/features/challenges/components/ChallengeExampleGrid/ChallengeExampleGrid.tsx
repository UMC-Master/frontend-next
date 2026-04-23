import Image from 'next/image';
import clsx from 'clsx';
import type { ChallengeExample } from '../../data/mockChallenges';

interface ChallengeExampleGridProps {
  examples: ChallengeExample[];
}

export default function ChallengeExampleGrid({
  examples,
}: ChallengeExampleGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {examples.map(example => (
        <article key={example.id} className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-t-[10px]">
            <div className="relative h-[124px]">
              <Image
                src={example.imageSrc}
                alt={example.title}
                fill
                className="object-cover"
                sizes="166px"
              />
            </div>
            <div
              className={clsx(
                'flex h-8 items-center justify-center text-title2 text-gray-100',
                example.label === 'O' ? 'bg-blue' : 'bg-red',
              )}
            >
              {example.label}
            </div>
          </div>
          <div>
            <p className="text-title3 text-gray-900">{example.title}</p>
            <p className="text-body2 text-gray-900">{example.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
