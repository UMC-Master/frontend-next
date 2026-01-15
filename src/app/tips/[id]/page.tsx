import TipDetailLayout from '@/features/tip-detail/components/TipDetailLayout';

interface Props {
  params: { id: string };
}

export default function Page({ params }: Props) {
  return <TipDetailLayout tipId={params.id} />;
}
