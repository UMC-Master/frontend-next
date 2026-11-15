import { createPageMetadata, PUBLIC_PAGES } from '@/lib/seo';

const page = PUBLIC_PAGES.find(page => page.path === '/trending-tips')!;
export const metadata = createPageMetadata(
  page.title,
  page.description,
  page.path,
);

import ClientLayout from './client-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
