import KakaoIcon from '@/assets/svgs/kakao-icon.svg';

interface KakaoLoginButtonProps {
  onClick?: () => void;
}

const KakaoLoginButton = ({ onClick }: KakaoLoginButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-13 w-full max-w-[380px] cursor-pointer items-center justify-center gap-[7px] rounded-2xl border-0 bg-kakao-yellow px-8 transition-opacity hover:opacity-90"
    >
      <KakaoIcon aria-hidden />
      <span className="text-title3 text-kakao-brown">카카오 로그인</span>
    </button>
  );
};

export default KakaoLoginButton;
