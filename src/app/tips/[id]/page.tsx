import TipDetailLayout from '@/features/tip-detail/components/TipDetailLayout';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <TipDetailLayout tipId={id} />;
}
