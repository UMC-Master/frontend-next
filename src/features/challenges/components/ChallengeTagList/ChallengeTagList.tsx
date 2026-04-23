interface ChallengeTagListProps {
  tags: string[];
}

export default function ChallengeTagList({ tags }: ChallengeTagListProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map(tag => (
        <span
          key={tag}
          className="rounded-lg bg-gray-200 px-3 py-1.5 text-body2 text-gray-900"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
