import React from "react";
import { Stack, Button } from "@mui/material";

interface ControlPanelProps {
  isLargeScreen: boolean;
  onSubmit: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isLargeScreen,
  onSubmit,
}) => {
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
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default ControlPanel;
