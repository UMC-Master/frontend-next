'use client';

import TagList from '@/features/search/components/TagList';

export default function SearchPage() {
  const exampleTags = ['청소', '방', '정리', '인테리어', '가구', '청소도구'];

  const handleTagClick = (tag: string) => {
    console.log('Clicked:', tag);
  };

  return (
    <div className="flex flex-col gap-6">
      <TagList
        title="인기 관심사"
        tags={exampleTags}
        onTagClick={handleTagClick}
      />
      <TagList
        title="추천 관심사"
        tags={exampleTags}
        onTagClick={handleTagClick}
      />
    </div>
  );
}
