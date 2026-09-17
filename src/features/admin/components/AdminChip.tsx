import type { ButtonHTMLAttributes } from 'react';

type AdminChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export default function AdminChip({ active = false, className = '', ...props }: AdminChipProps) {
  return (
    <button
      type="button"
      className={`rounded-full px-6 py-2.5 text-lg font-semibold leading-[1.5] tracking-[-0.01em] text-gray-100 ${active ? 'bg-main-500' : 'bg-gray-500'} ${className}`}
      {...props}
    />
  );
}
