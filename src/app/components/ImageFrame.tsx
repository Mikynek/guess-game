import React from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

type ImageFrameProps = {
  url?: string;
  amountOfBlur?: number;
};

// Placeholder component for loading or missing images
const Placeholder = () => (
  <div className="flex flex-col items-center justify-center min-w-72 h-80 border-4 border-gray-700 overflow-hidden">
    <CircularProgress color="inherit" />
  </div>
);

const ImageFrame: React.FC<ImageFrameProps> = ({ url, amountOfBlur = 0 }) => {
  if (!url) {
    return <Placeholder />;
  }

  const blurStyle = {
    objectFit: "cover" as const,
    filter: `blur(${amountOfBlur}px)`,
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-w-72 h-80 border-4 border-gray-700 overflow-hidden">
      <Image src={url} alt="Game cover" fill style={blurStyle} priority />
    </div>
  );
};

export default ImageFrame;
