// resources/js/components/ConfirmDeleteModal.tsx
import React from 'react';

interface ConfirmDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export default function ConfirmDeleteModal({ show, onClose, onConfirm, itemName }:
   ConfirmDeleteModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 transition">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md mx-auto space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Konfirmasi Hapus
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Yakin ingin menghapus <span className="font-medium">{itemName}</span>?
          {/* Tindakan ini tidak dapat dibatalkan. */}
        </p>
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
