import LeftArrowIcon from '@/assets/svgs/LeftArrow.svg';

interface SignUpHeaderProps {
  onClick?: () => void;
}

const SignUpHeader = ({ onClick }: SignUpHeaderProps) => {
  return (
    <div className="w-95 h-13.5 bg-white">
      <div className="py-3 flex items-center gap-[127px]">
        <div onClick={onClick}>
          <LeftArrowIcon />
        </div>
        <div className="text-title2 text-gray-1000">회원가입</div>
      </div>
    </div>
  );
};

export default SignUpHeader;
