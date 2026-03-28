import LeftArrowIcon from '@/assets/svgs/LeftArrow.svg';

interface SignUpHeaderProps {
  onClick?: () => void;
}

const SignUpHeader = ({ onClick }: SignUpHeaderProps) => {
  return (
    <div className="h-13.5 w-full max-w-[380px] bg-white">
      <div className="grid h-full grid-cols-[40px_minmax(0,1fr)_40px] items-center py-3">
        <button
          type="button"
          onClick={onClick}
          className="flex cursor-pointer items-center justify-start border-0 bg-transparent p-0"
          aria-label="뒤로 가기"
        >
          <LeftArrowIcon />
        </button>
        <h1 className="min-w-0 truncate text-center text-title2 text-gray-1000">
          회원가입
        </h1>
        <span className="w-10 shrink-0" aria-hidden />
      </div>
    </div>
  );
};

export default SignUpHeader;
