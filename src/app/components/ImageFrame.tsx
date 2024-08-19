import React from "react";
import Image from "next/image";

type ImageFrameProps = {
  url: string;
};

const ImageFrame: React.FC<ImageFrameProps> = ({ url }) => (
  <div className="flex flex-col items-center justify-between p-4">
    <Image
      src={url}
      alt="Game cover"
      width={300}
      height={200}
      objectFit="cover"
      priority
    />
  </div>
);

export default ImageFrame;