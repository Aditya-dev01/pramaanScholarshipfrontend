import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

function DocumentCard({
  document,
  uploadedFile,
  onUpload,
}) {
  const status = uploadedFile?.status || "Not Uploaded";

  const config = {
    "Not Uploaded": {
      icon: Upload,
      text: "Not Uploaded",
      style: "bg-slate-100 text-slate-600",
    },

    Checking: {
      icon: Clock,
      text: "AI/OCR Checking",
      style: "bg-amber-100 text-amber-700",
    },

    Verified: {
      icon: CheckCircle,
      text: "Verified",
      style: "bg-green-100 text-green-700",
    },

    Rejected: {
      icon: AlertCircle,
      text: "Rejected",
      style: "bg-red-100 text-red-700",
    },
  };

  const current = config[status] || config["Not Uploaded"];
  const StatusIcon = current.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {document}
            </h3>

            {uploadedFile?.name ? (
              <p className="mt-1 text-xs text-slate-500">
                {uploadedFile.name}
              </p>
            ) : (
              <p className="mt-1 text-xs text-slate-400">
                PDF, JPG or PNG
              </p>
            )}
          </div>

        </div>

        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${current.style}`}
        >
          <StatusIcon size={15} />
          {current.text}
        </span>

      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">

        {status === "Verified" ? (
          <div className="flex items-center gap-2 text-sm font-medium text-green-600">
            <CheckCircle size={17} />
            Document successfully verified.
          </div>
        ) : status === "Checking" ? (
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <Clock size={17} />
            AI/OCR is checking this document...
          </div>
        ) : (
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            <Upload size={17} />

            {status === "Rejected"
              ? "Re-upload"
              : "Upload Document"}

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  onUpload(file);
                }
              }}
            />
          </label>
        )}

        {status === "Rejected" && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0"
            />

            The document could not be verified. Please upload
            another copy.
          </div>
        )}

      </div>
    </div>
  );
}

export default DocumentCard;