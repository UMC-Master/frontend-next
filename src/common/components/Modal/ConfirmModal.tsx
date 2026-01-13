'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText = '닫기',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-1000/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[rgba(254,254,254,0.95)] backdrop-blur-[200px] rounded-3xl p-6 w-full max-w-[380px]">
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Title */}
          <p className="text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-gray-900 text-center w-full">
            {title}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 w-full">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="flex-1 h-12 bg-gray-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-title4 text-gray-200">{cancelText}</span>
            </button>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="flex-1 h-12 bg-main-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-title4 text-gray-200">{confirmText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
