import AdminHeader from '@/features/admin/components/AdminHeader';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main className="mx-auto w-[1200px] py-12">{children}</main>
    </>
  );
}
