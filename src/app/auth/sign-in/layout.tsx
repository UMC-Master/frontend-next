import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 - HomeMaster',
  description: 'HomeMaster 로그인 페이지입니다.',
};

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col items-center">{children}</div>;
};

export default SignInLayout;
