'use client';

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-[430px] bg-white">{children}</div>;
}
