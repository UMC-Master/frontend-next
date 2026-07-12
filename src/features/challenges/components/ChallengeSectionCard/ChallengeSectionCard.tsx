import type { ReactNode } from 'react';

interface ChallengeSectionCardProps {
  title: string;
  children: ReactNode;
}

export default function ChallengeSectionCard({
  title,
  children,
}: ChallengeSectionCardProps) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_0_16px_0_rgba(234,234,234,1)]">
      <h2 className="mb-2 text-title3 text-gray-1000">{title}</h2>
      {children}
    </section>
  );
}
