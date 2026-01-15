'use client';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function ModalWrapper({ children, onClose }: Props) {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
      "
      onClick={onClose}
    >
      <div className="w-full max-w-[380px]" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
