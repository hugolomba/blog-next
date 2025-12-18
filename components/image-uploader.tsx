"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const [isUploaded, setIsUploaded] = useState(false);
  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result) => {
        if (typeof result.info === "object" && "secure_url" in result.info) {
          onUploadSuccess(result.info.secure_url);
          setIsUploaded(true);
        }
      }}
      options={{
        // singleUploadAutoClose: true,
        folder: "blog-next",
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isUploaded ? "Change Image" : "Upload Image"}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
