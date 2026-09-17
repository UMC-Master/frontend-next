'use client';

type AdminModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export default function AdminModal({
  open,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: AdminModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" role="presentation">
      <div className="w-[480px] rounded-2xl bg-white p-8 text-center shadow-xl" role="dialog" aria-modal="true">
        <h2 className="text-2xl font-bold text-gray-1000">{title}</h2>
        {description && <p className="mt-4 text-lg text-gray-800">{description}</p>}
        <div className="mt-8 flex justify-center gap-3">
          {onCancel && (
            <button type="button" onClick={onCancel} className="h-12 rounded-lg bg-gray-400 px-8 text-white">
              {cancelLabel}
            </button>
          )}
          <button type="button" onClick={onConfirm} className="h-12 rounded-lg bg-main-500 px-8 text-white">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
