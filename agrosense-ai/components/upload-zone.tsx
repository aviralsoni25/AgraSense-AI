"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Camera, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type UploadZoneProps = {
  onFile: (file: File) => void;
  previewUrl?: string | null;
};

export function UploadZone({ onFile, previewUrl }: UploadZoneProps) {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    noClick: true,
    onDropAccepted: (files) => {
      const [file] = files;
      if (file) onFile(file);
    },
  });

  const message = useMemo(
    () =>
      isDragActive
        ? "Drop image to start AI analysis"
        : "Drag and drop crop leaf photo, or click to upload",
    [isDragActive],
  );

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          "relative overflow-hidden rounded-2xl border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-colors",
          isDragActive && "border-primary bg-primary/5",
        )}
      >
        <input {...getInputProps()} />
        <ImagePlus className="mx-auto h-10 w-10 text-primary" />
        <p className="mt-3 text-sm font-medium">{message}</p>
        <p className="mt-1 text-xs text-muted-foreground">JPG, PNG up to 8MB</p>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Crop preview"
            width={1200}
            height={600}
            unoptimized
            className="mt-5 h-48 w-full rounded-xl object-cover"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={open} className="w-full">
          <ImagePlus className="h-4 w-4" />
          Upload
        </Button>
        <Button variant="secondary" className="w-full">
          <Camera className="h-4 w-4" />
          Take Photo
        </Button>
      </div>
    </div>
  );
}
