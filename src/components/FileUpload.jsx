import { UploadCloud } from "lucide-react";

function FileUpload({ onChange, accept = ".pdf,.jpg,.jpeg,.png" }) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#DDEBD8] bg-[#FFF8E7] px-6 py-10 text-center transition hover:border-[#24823F] hover:bg-[#DDEBD8]">

      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#DDEBD8] text-[#24823F]">
        <UploadCloud size={24} />
      </div>

      <p className="font-semibold text-[#26332A]">
        Click to upload
      </p>

      <p className="mt-1 text-xs text-[#26332A]/50">
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