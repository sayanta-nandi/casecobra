"use client";

import { createNewImage } from "@/actions/action";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { useState, useTransition } from "react";


export default function Page() {
  const [id, setId] = useState<string>();
  const [isPending, startTransition] = useTransition();
  return (
    <div className={cn}>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {id && <p>{id}</p>}
    </div>
  );
}
