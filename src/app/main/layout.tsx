import { createPageMetadata, PUBLIC_PAGES } from '@/lib/seo';

const page = PUBLIC_PAGES.find(page => page.path === '/main')!;
export const metadata = createPageMetadata(
  page.title,
  page.description,
  page.path,
);

import MainHeaderLayout from '@/features/main/components/headers/MainHeaderLayout';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <MainHeaderLayout title="홈마스터" />
      {children}
    </section>
  );
}
