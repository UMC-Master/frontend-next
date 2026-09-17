type AdminStatusBadgeProps = {
  children: React.ReactNode;
  tone?: 'primary' | 'muted' | 'outline';
};

export default function AdminStatusBadge({
  children,
  tone = 'muted',
}: AdminStatusBadgeProps) {
  const toneClass = {
    primary: 'bg-main-500 text-gray-100',
    muted: 'bg-gray-400 text-gray-100',
    outline: 'border border-main-500 bg-white text-main-500',
  }[tone];

  return (
    <span className={`inline-flex min-w-[74px] justify-center rounded-lg px-4 py-[5px] text-base ${toneClass}`}>
      {children}
    </span>
  );
}
