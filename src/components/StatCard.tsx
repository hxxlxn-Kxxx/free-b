import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

import SurfaceCard from "./admin/SurfaceCard";

interface StatCardProps {
  title: string;
  value: string;
  subValue: string;
  progress: number;
  color: string;
}

export default function StatCard({
  title,
  value,
  subValue,
  progress,
  color,
}: StatCardProps) {
  return (
    <SurfaceCard sx={{ p: 3 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4" sx={{ mt: 1.5, mb: 1, fontWeight: 700 }}>
        {value}
      </Typography>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          px: 1.5,
          py: 0.75,
          borderRadius: 999,
          backgroundColor: "rgba(251, 247, 237, 0.95)",
          color: "text.secondary",
          fontSize: 12,
          fontWeight: 700,
          mb: 2,
        }}
      >
        운영 지표
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: "#F4E9CB",
          "& .MuiLinearProgress-bar": { bgcolor: color },
        }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
        {subValue}
      </Typography>
    </SurfaceCard>
  );
}
