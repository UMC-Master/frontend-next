import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - HomeMaster',
  description: 'HomeMaster 회원가입 페이지입니다.',
};

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  /* items-stretch: 약관/마케팅 상세는 전폭·왼쪽 정렬. 메인 회원가입은 page 내부에서 items-center 처리 */
  return <div className="flex flex-col">{children}</div>;
};

export default SignUpLayout;
