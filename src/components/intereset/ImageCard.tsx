import React from "react";

interface ImageCard {
  userInterest: UserInterestType;
  onImageClick?: (interestId: number, title: string) => void;
}

const ImageCard = ({ userInterest, onImageClick }: ImageCard) => {
  return (
    <>
      <img
        key={userInterest.interestId}
        className="h-[550px] rounded-3xl cursor-pointer"
        src={userInterest.imageUrl}
        alt={`${userInterest.title}`}
        onClick={() =>
          onImageClick &&
          onImageClick(userInterest.interestId, userInterest.title)
        }
        role="presentation"
      />
      <div className="absolute bottom-20 flex flex-col w-full px-4 gap-6 text-left text-white">
        <div className="flex flex-col gap-1">
          <div className="font-hanaMedium text-2xl">{`# ${userInterest.title}`}</div>
          <div className="text-sm">{userInterest.subtitle}</div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
