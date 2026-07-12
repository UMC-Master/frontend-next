import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 찾기 - HomeMaster',
  description: 'HomeMaster 비밀번호 찾기 페이지입니다.',
};

const FindPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col items-center">{children}</div>;
};

export default FindPasswordLayout;
