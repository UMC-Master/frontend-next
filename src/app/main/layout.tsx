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
