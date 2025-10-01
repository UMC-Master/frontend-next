import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - HomeMaster',
  description: 'HomeMaster 회원가입 페이지입니다.',
};

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col items-center">{children}</div>;
};

export default SignUpLayout;
