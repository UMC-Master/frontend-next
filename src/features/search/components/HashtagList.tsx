'use client';

export interface TagListProps {
  title: string;
  tags: string[];
  onClick?: (tag: string) => void;
  className?: string;
}

export default function HashtagList({
  title,
  tags,
  onClick,
  className = '',
}: TagListProps) {
  return (
    <section className={`w-full ${className}`}>
      {/* 제목 */}
      <h3 className="text-title3 text-gray-1000 mb-3">{title}</h3>

      {/* 태그 리스트 */}
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, idx) => (
          <button
            key={idx}
            onClick={() => onClick?.(tag)}
            className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-lg text-body2"
          >
            #{tag}
          </button>
        ))}
      </div>
    </section>
  );
}
