import NotificationCard from '@/features/notifications/components/NotificationCard';

export default function NotificationsPage() {
  return (
    <div className="flex flex-col bg-white gap-4 mt-4">
      <NotificationCard
        message="애니님이 올린 게시물이 이 달의 꿀팁 TOP 100에 선정되었어요!"
        timeLabel="1시간 전"
      />
      <NotificationCard
        message="알림님이 애니님의 꿀팁을 저장했어요!"
        timeLabel="1일 전"
      />
      <NotificationCard
        message="애니님! HOME MASTER의 신규 회원이 되신 것을 환영합니다!"
        timeLabel="7일 전"
      />
    </div>
  );
}
