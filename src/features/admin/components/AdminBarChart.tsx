type AdminBarChartProps = {
  values: number[];
  labels: string[];
  highlightIndexes?: number[];
  height?: number;
};

export default function AdminBarChart({
  values,
  labels,
  highlightIndexes = [],
  height = 440,
}: AdminBarChartProps) {
  return (
    <div className="flex gap-3">
      <div className="flex h-[calc(100%-28px)] flex-col justify-between py-1 text-xs text-gray-700">
        {[100, 80, 60, 40, 20, 0].map((tick) => <span key={tick}>{tick}</span>)}
      </div>
      <div className="flex flex-1 items-end border-b border-l border-gray-400 px-2" style={{ height }}>
        {values.map((value, index) => (
          <div key={`${labels[index]}-${index}`} className="flex h-full flex-1 flex-col justify-end px-1">
            <div className="flex flex-1 items-end justify-center bg-main-500/10">
              <div
                className={`w-[70%] rounded-t-full ${highlightIndexes.includes(index) ? 'bg-main-500' : 'bg-[#7d9187]'}`}
                style={{ height: `${value}%` }}
              />
            </div>
            <span className="h-7 truncate pt-2 text-center text-[10px] text-gray-700">{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
