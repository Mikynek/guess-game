import React from "react";
import { Stack } from "@mui/material";

interface HistoryPanelProps {
  children: React.ReactNode;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ children }) => {
  return <Stack spacing={2}>{children}</Stack>;
};

export default HistoryPanel;
