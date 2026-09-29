import { UploadCloud } from "lucide-react";

function FileUpload({ onChange, accept = ".pdf,.jpg,.jpeg,.png" }) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#E8EEDB] bg-[#FFF8E7] px-6 py-10 text-center transition hover:border-[#9BB06D] hover:bg-[#E8EEDB]">

      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8EEDB] text-[#9BB06D]">
        <UploadCloud size={24} />
      </div>

      <p className="font-semibold text-[#293127]">
        Click to upload
      </p>

      <p className="mt-1 text-xs text-[#293127]/50">
        PDF, JPG or PNG
      </p>

      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={onChange}
      />
    </label>
  );
}

export default FileUpload;