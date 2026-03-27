'use client';

interface InterestTag {
  label: string;
  value: string;
}

interface InterestCategory {
  title: string;
  tags: InterestTag[];
}

interface InterestTagSelectorProps {
  selectedInterests: string[];
  onToggle: (interest: string) => void;
}

const interestCategories: InterestCategory[] = [
  {
    title: '계절',
    tags: [
      { label: '#봄', value: '봄' },
      { label: '#여름', value: '여름' },
      { label: '#가을', value: '가을' },
      { label: '#겨울', value: '겨울' },
      { label: '#환절기', value: '환절기' },
    ],
  },
  {
    title: '청소',
    tags: [
      { label: '#청소', value: '청소' },
      { label: '#방', value: '방' },
      { label: '#정리', value: '정리' },
      { label: '#인테리어', value: '인테리어' },
      { label: '#가구', value: '가구' },
      { label: '#청소도구', value: '청소도구' },
    ],
  },
  {
    title: '요리/식재료',
    tags: [
      { label: '#요리', value: '요리' },
      { label: '#냉장고', value: '냉장고' },
      { label: '#음식', value: '음식' },
      { label: '#보관', value: '보관' },
      { label: '#냉장', value: '냉장' },
      { label: '#냉동', value: '냉동' },
      { label: '#면', value: '면' },
      { label: '#밥', value: '밥' },
      { label: '#반찬', value: '반찬' },
    ],
  },
  {
    title: '재활용/분리수거',
    tags: [
      { label: '#재활용', value: '재활용' },
      { label: '#분리수거', value: '분리수거' },
      { label: '#리폼', value: '리폼' },
      { label: '#플라스틱', value: '플라스틱' },
      { label: '#스티로폼', value: '스티로폼' },
      { label: '#종이', value: '종이' },
      { label: '#유리', value: '유리' },
    ],
  },
  {
    title: '주거',
    tags: [
      { label: '#주택', value: '주택' },
      { label: '#빌라', value: '빌라' },
      { label: '#아파트', value: '아파트' },
      { label: '#원룸', value: '원룸' },
      { label: '#투룸', value: '투룸' },
      { label: '#오피스텔', value: '오피스텔' },
    ],
  },
];

export default function InterestTagSelector({
  selectedInterests,
  onToggle,
}: InterestTagSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-title3 text-gray-900">관심사 (최대 5개)</h2>

      <div className="flex flex-col gap-5">
        {interestCategories.map((category) => (
          <div key={category.title} className="flex flex-col gap-3">
            <h3 className="text-title3 text-gray-800">{category.title}</h3>
            <div className="flex flex-wrap gap-3">
              {category.tags.map((tag) => {
                const isSelected = selectedInterests.includes(tag.value);
                return (
                  <button
                    key={tag.value}
                    onClick={() => onToggle(tag.value)}
                    className={`px-3 py-1.5 rounded-lg text-body2 transition-colors ${
                      isSelected
                        ? 'bg-main-500 text-gray-100'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
