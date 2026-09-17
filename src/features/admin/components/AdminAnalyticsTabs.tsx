import AdminChip from './AdminChip';

export type AnalyticsTab = 'acquisition' | 'conversion' | 'retention' | 'active-users' | 'feature-usage';

const tabs: { value: AnalyticsTab; label: string }[] = [
  { value: 'acquisition', label: '유입' },
  { value: 'conversion', label: '전환' },
  { value: 'retention', label: '리텐션' },
  { value: 'active-users', label: 'MAU/DAU' },
  { value: 'feature-usage', label: '기능 사용량' },
];

export default function AdminAnalyticsTabs({ value, onChange }: { value: AnalyticsTab; onChange: (tab: AnalyticsTab) => void }) {
  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <AdminChip key={tab.value} active={value === tab.value} onClick={() => onChange(tab.value)}>
          {tab.label}
        </AdminChip>
      ))}
    </div>
  );
}
