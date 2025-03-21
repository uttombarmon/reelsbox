"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import {Loader2} from 'lucide-react'

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}


export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image"
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const onError = (err:{message : string | null}) => {
    console.log("Error", err);
    setUploading(false);
    setError(err.message)
  };

  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null)
    onSuccess(res);
  };
  
    const handleUploadProgress = (evt:ProgressEvent) => {
      if (evt.lengthComputable && onProgress) {
        const percentComplete = (evt.loaded/ evt.total) * 100;
        onProgress(Math.round(percentComplete));
      }
    };

  const handleUploadStart = () => {
    setUploading(true);
    setError(null)
  };

  const validateFile = (file: File) => {
    if(fileType === "video"){
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file")
        return false
      }
      if (file.size > 100 * 1024 * 1024) {
        setError(" Video must be less than 100 MB")
        return false
      }
    }else{
      const validTypes = [-"image/jpeg", "image/png", "image/webp"]
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid file(JPEG, PNG, WEBP)");
        return false
      }
    }
    return false
  }
  return (
    <div className="space-y-2">
        <IKUpload
          fileName={fileType === "video"? "video":"image"}
          useUniqueFileName={true}
          validateFile={validateFile}
          folder={fileType === "video"? "/reelsbox/videos": "/reelsbox/images"}
          className=" file-input file-input-bordered w-full"
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleUploadProgress}
          onUploadStart={handleUploadStart}
          transformation={{
            pre: "l-text,i-Imagekit,fs-50,l-end",
            post: [
              {
                type: "transformation",
                value: "w-100",
              },
            ],
          }}
        />
        {
          uploading && (
            <div className=" flex items-center gap-2 text-sm text-primary" >
              <Loader2 className=" animate-spin w-4 h-4"/>
              <span>Loading...</span>
            </div>
          )
        }
        {
          error && (
            <div className=" text-error text-sm">{error}</div>
          )
        }
    </div>
  );
}