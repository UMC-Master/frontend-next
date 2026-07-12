import Link from 'next/link';
import clsx from 'clsx';

interface ChallengeStateModalProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function ChallengeStateModal({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: ChallengeStateModalProps) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 px-6">
      <div className="w-full max-w-[380px] rounded-3xl bg-white/95 p-6 backdrop-blur-[12px]">
        <div className="space-y-6 text-center">
          <div className="space-y-3">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gray-100 text-[56px] text-main-500">
              hm
            </div>
            <div className="text-title1 text-gray-900">{title}</div>
            {description ? <div className="text-body1 text-gray-900">{description}</div> : null}
          </div>
          <div
            className={clsx(
              'grid gap-4',
              secondaryLabel ? 'grid-cols-2' : 'grid-cols-1',
            )}
          >
            {secondaryLabel && secondaryHref ? (
              <Link
                href={secondaryHref}
                className="flex h-12 items-center justify-center rounded-lg bg-gray-600 text-title4 text-gray-200"
              >
                {secondaryLabel}
              </Link>
            ) : null}
            <Link
              href={primaryHref}
              className="flex h-12 items-center justify-center rounded-lg bg-main-500 text-title4 text-gray-200"
            >
              {primaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
