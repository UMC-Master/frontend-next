import clsx from 'clsx';
import type { ReactNode } from 'react';

interface ChallengeMetricChipProps {
  icon: ReactNode;
  value: string | number;
  accent?: 'red' | 'blue' | 'default';
}

export default function ChallengeMetricChip({
  icon,
  value,
  accent,
}: ChallengeMetricChipProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 shadow-[0_0_16px_0_rgba(234,234,234,1)]">
      {icon}
      <span
        className={clsx('text-body2', {
          'text-red': accent === 'red',
          'text-blue': accent === 'blue',
          'text-gray-900': !accent || accent === 'default',
        })}
      >
        {value}
      </span>
    </div>
  );
}
