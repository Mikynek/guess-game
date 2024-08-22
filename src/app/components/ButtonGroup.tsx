import React from "react";
import { Stack, Button } from "@mui/material";

interface ButtonGroupProps {
  isLargeScreen: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ isLargeScreen }) => {
  const commonButtonStyles = {
    width: isLargeScreen ? "200px" : "auto",
  };

  return (
    <Stack
      direction={isLargeScreen ? "row" : "column-reverse"}
      spacing={isLargeScreen ? 2 : 1}
    >
      <Button variant="outlined" sx={commonButtonStyles}>
        Skip
      </Button>
      <Button
        variant="contained"
        className="white bg-gray-800 hover:bg-gray-950"
        sx={commonButtonStyles}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default ButtonGroup;
