'use client';

export default function EmptySavedTips() {

  return (
    <div className="flex flex-col items-center gap-8 pt-12">
      {/* Placeholder Image */}
      <div className="w-full max-w-[300px] aspect-square bg-gray-300 rounded-lg" />

      {/* Empty Message */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-title3 text-gray-800 text-center">
          저장된 꿀팁이 존재하지 않습니다
        </p>
        <p className="text-title3 text-gray-800 text-center">
          홈마스터에서 꿀팁을 모아 보세요
        </p>
      </div>
    </div>
  );
}
