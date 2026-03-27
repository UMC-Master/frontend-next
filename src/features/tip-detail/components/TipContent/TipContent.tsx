interface Props {
  content: string;
}

export default function TipContent({ content }: Props) {
  return (
    <section className="px-5 pt-6">
      <p className="whitespace-pre-line text-body1 leading-[1.7] text-gray-1000">
        {content}
      </p>
    </section>
  );
}
