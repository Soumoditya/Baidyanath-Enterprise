"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/cloudinary/upload";

interface ImageUploaderProps {
  currentImage?: string;
  onUpload: (url: string, publicId: string) => void;
}

export default function ImageUploader({ currentImage, onUpload }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const result = await uploadImage(file);
      onUpload(result.url, result.publicId);
    } catch {
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 transition-colors hover:border-primary-400 hover:bg-primary-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-primary-500 dark:hover:bg-primary-900/10"
      >
        {isUploading ? (
          <>
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 dark:border-primary-800 dark:border-t-primary-400" />
            <span className="text-base font-medium text-slate-600 dark:text-slate-300">
              Uploading...
            </span>
          </>
        ) : currentImage ? (
          <>
            <div className="relative h-32 w-32 overflow-hidden rounded-xl">
              <Image
                src={currentImage}
                alt="Current product image"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <span className="text-base font-semibold text-primary-600 dark:text-primary-400">
              Change Image
            </span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-slate-400 dark:text-slate-500"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-base font-semibold text-primary-600 dark:text-primary-400">
              Upload Image
            </span>
            <span className="text-sm text-slate-400 dark:text-slate-500">
              Click to select (max 5MB)
            </span>
          </>
        )}
      </button>

      {error && (
        <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
