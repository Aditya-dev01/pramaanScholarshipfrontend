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
      style: "bg-[#DDEBD8] text-[#26332A]",
    },

    Checking: {
      icon: Clock,
      text: "AI/OCR Checking",
      style: "bg-[#FFF8E7] text-[#E5B84B]",
    },

    Verified: {
      icon: CheckCircle,
      text: "Verified",
      style: "bg-[#DDEBD8] text-[#24823F]",
    },

    Rejected: {
      icon: AlertCircle,
      text: "Rejected",
      style: "bg-[#FBE8DF] text-[#C76B45]",
    },
  };

  const current = config[status] || config["Not Uploaded"];
  const StatusIcon = current.icon;

  return (
    <div className="rounded-2xl border border-[#DDEBD8] bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DDEBD8] text-[#24823F]">
            <FileText size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-[#26332A]">
              {document}
            </h3>

            {uploadedFile?.name ? (
              <p className="mt-1 text-xs text-[#26332A]/60">
                {uploadedFile.name}
              </p>
            ) : (
              <p className="mt-1 text-xs text-[#26332A]/50">
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

      <div className="mt-5 border-t border-[#DDEBD8] pt-4">

        {status === "Verified" ? (
          <div className="flex items-center gap-2 text-sm font-medium text-[#24823F]">
            <CheckCircle size={17} />
            Document successfully verified.
          </div>
        ) : status === "Checking" ? (
          <div className="flex items-center gap-2 text-sm text-[#E5B84B]">
            <Clock size={17} />
            AI/OCR is checking this document...
          </div>
        ) : (
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#24823F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#185C2C]">
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
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#FBE8DF] p-3 text-sm text-[#C76B45]">
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