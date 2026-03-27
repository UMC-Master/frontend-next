interface Props {
  tags: string[];
}

export default function TagList({ tags }: Props) {
  return (
    <div className="mt-6 flex flex-wrap gap-2 px-5">
      {tags.map(tag => (
        <span
          key={tag}
          className="rounded-lg bg-gray-200 px-3 py-2 text-body2 text-gray-900"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
