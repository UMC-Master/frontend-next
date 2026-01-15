export type NotificationCardProps = {
  message: string;
  timeLabel: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function NotificationCard({
  message,
  timeLabel,
  onClick,
  className = '',
  disabled = false,
}: NotificationCardProps) {
  const clickable = !!onClick && !disabled;

  return (
    <div
      role={clickable ? 'button' : undefined}
      onClick={clickable ? onClick : undefined}
      className={[
        'w-full rounded-2xl bg-gray-100 px-4.5 py-3',
        'shadow-[0_8px_24px_rgba(0,0,0,0.08)]',
        className,
      ].join(' ')}
    >
      <div className="flex flex-col items-start justify-between gap-2">
        <p className="text-title4 text-gray-900 break-words">{message}</p>

        <span className="text-caption1 text-gray-800 self-end">
          {timeLabel}
        </span>
      </div>
    </div>
  );
}
