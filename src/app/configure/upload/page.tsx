"use client";

import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { ImageUp, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import { toast } from "sonner";

export default function Page() {
  // const [id, setId] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [isDragOver, setIsDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configID = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configID}`);
      });
    },
    onUploadError: () => {},
    onUploadBegin: () => {},
    onUploadProgress: (p) => {
      setProgress(p);
    },
  });

  const onAcceptedFiles = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, {
      configId: undefined,
    });
    setIsDragOver(false);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast.error(
      "Please ensure the file is a valid image format (PNG, JPG, JPEG)."
    );
  };

  return (
    <div className="flex flex-1 h-full w-full md:px-12 md:py-12 lg:px-24 xl:px-36">
      <Dropzone
        disabled={isUploading || isPending}
        onDropAccepted={onAcceptedFiles}
        onDropRejected={onDropRejected}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        accept={{
          "image/png": [".png"],
          "image/jpeg": [".jpeg"],
          "image/jpg": [".jpg"],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={`border-2 flex flex-1 min-h-full border-dashed border-gray-300 p-6 rounded-lg flex-col text-center items-center justify-center ${
              isDragOver ? "bg-gray-100" : ""
            }`}
          >
            <input {...getInputProps()} className="flex-1 h-full" />
            <div className="flex flex-1 flex-col items-center justify-center">
              {isUploading ? <Loader2 className="animate-spin" /> : <ImageUp />}
              {isUploading ? (
                <div>
                  <p>Uploading...</p>
                  <Progress className="mt-2 w-36" value={progress} />
                </div>
              ) : isPending ? (
                <p>Redirecting, please wait...</p>
              ) : isDragOver ? (
                <p>Drop file to upload</p>
              ) : (
                <p>
                  Click here to upload or <span>Drag and drop</span>
                </p>
              )}
              {isPending ? null : <p>PNG, JPG, JPEG</p>}
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
}
