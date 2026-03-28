import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이메일 찾기 - HomeMaster',
  description: 'HomeMaster 이메일 찾기 페이지입니다.',
};

const FindEmailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col items-center">{children}</div>;
};

export default FindEmailLayout;
