interface Props {
  title: string;
  description?: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  description,
  confirmText,
  cancelText = '닫기',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="rounded-2xl bg-white px-6 py-6">
      <p className="text-center text-title1 font-semibold text-gray-900">
        {title}
      </p>

      {description && (
        <p className="mt-2 text-center text-body2 text-gray-700">
          {description}
        </p>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={onCancel}
          className="flex-1 rounded-lg bg-gray-600 py-3 text-white"
        >
          {cancelText}
        </button>

        <button
          onClick={onConfirm}
          className="flex-1 rounded-lg bg-main-500 py-3 text-white"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
