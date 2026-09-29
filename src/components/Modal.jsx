import { X } from "lucide-react";

function Modal({
  open,
  onClose,
  title,
  children,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#185C2C]/50 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-[#DDEBD8] px-6 py-4">

          <h2 className="font-bold text-[#26332A]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#26332A]/50 hover:bg-[#DDEBD8] hover:text-[#26332A]"
          >
            <X size={20} />
          </button>

        </div>

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;