import React from "react";
import Image from "next/image";

type ImageFrameProps = {
  url: string;
  amountOfBlur?: number;
};

const ImageFrame: React.FC<ImageFrameProps> = ({ url, amountOfBlur = 0 }) => (
  <div className="flex flex-col items-center justify-between min-w-72 h-80 relative border-4 border-gray-700 overflow-hidden">
    <Image
      src={url}
      alt="Game cover"
      fill
      style={{
        objectFit: "cover",
        filter: `blur(${amountOfBlur}px)`,
      }}
      priority
    />
  </div>
);

export default ImageFrame;
