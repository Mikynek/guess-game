import React from "react";
import { Stack, Button } from "@mui/material";

interface ButtonGroupProps {
  isLargeScreen: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ isLargeScreen }) => {
  const buttonStyles = {
    width: "200px",
  };

  return isLargeScreen ? (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" sx={buttonStyles}>
        Skip
      </Button>
      <Button variant="contained" color="success" sx={buttonStyles}>
        Submit
      </Button>
    </Stack>
  ) : (
    <Stack direction="column" spacing={1}>
      <Button variant="contained" color="success">
        Submit
      </Button>
      <Button variant="outlined">Skip</Button>
    </Stack>
  );
};

export default ButtonGroup;