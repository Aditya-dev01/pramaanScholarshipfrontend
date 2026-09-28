import { UploadCloud } from "lucide-react";

function FileUpload({ onChange, accept = ".pdf,.jpg,.jpeg,.png" }) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50">

      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        <UploadCloud size={24} />
      </div>

      <p className="font-semibold text-slate-700">
        Click to upload
      </p>

      <p className="mt-1 text-xs text-slate-400">
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