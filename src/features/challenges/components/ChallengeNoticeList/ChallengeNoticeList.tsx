interface ChallengeNoticeListProps {
  notices: string[];
}

export default function ChallengeNoticeList({
  notices,
}: ChallengeNoticeListProps) {
  return (
    <div className="space-y-2">
      {notices.map(notice => (
        <div key={notice} className="flex items-start gap-2">
          <span className="text-main-500">✓</span>
          <p className="text-body2 text-gray-900">{notice}</p>
        </div>
      ))}
    </div>
  );
}
