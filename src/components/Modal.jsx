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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#657A3F]/50 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-[#E8EEDB] px-6 py-4">

          <h2 className="font-bold text-[#293127]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#293127]/50 hover:bg-[#E8EEDB] hover:text-[#293127]"
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