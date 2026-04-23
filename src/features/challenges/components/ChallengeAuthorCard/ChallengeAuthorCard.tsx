export default function ChallengeAuthorCard() {
  return (
    <div className="rounded-[10px] bg-gray-200 p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-title3 text-main-500">
          A
        </div>
        <div>
          <p className="text-title2 text-gray-1000">애니</p>
          <p className="text-caption1 text-gray-700">
            등급 자취마스터 · 이 달의 꿀팁 선정 20회
          </p>
        </div>
      </div>
    </div>
  );
}
