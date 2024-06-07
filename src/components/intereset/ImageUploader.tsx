import React, { useState } from "react";
import ImageCard from "./ImageCard";
import { useModal } from "../../context/ModalContext";

interface ImageUploaderProps {
  userInterest: UserInterestType;
  children: React.ReactNode;
  onImageChange: (file: File, url: string) => void;
}

const ImageUploader = ({
  userInterest,
  children,
  onImageChange,
}: ImageUploaderProps) => {
  const { openModal } = useModal();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      return;
    }

    if (files.length > 0) {
      const file = files[0];
      if (file.size > 1024 * 1024 * 2) {
        openModal("이미지 용량을 초과했습니다.");
        return;
      }
      const url = URL.createObjectURL(file);
      onImageChange(file, url);
    }
  };

  return (
    <>
      <div className="relative flex flex-col gap-4 pt-4 pb-6">
        <div className="text-left">관심사 이미지</div>
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={handleImageChange}
        />
        {children}
        {userInterest.imageUrl ? (
          <div className="relative">
            <ImageCard userInterest={userInterest} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center bg-[#d9d9d9] rounded-2xl h-[550px]">
            이미지를 추가해주세요
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
