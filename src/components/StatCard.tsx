import React from "react";
import { Card, Typography, LinearProgress } from "@mui/material";

// TypeScript 인터페이스로 전달받을 데이터의 타입을 명확히 정의합니다.
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
    <Card
      sx={{ p: 2, borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
    >
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h5" sx={{ my: 1, fontWeight: "bold" }}>
        {value}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: 5,
          bgcolor: "#eee",
          "& .MuiLinearProgress-bar": { bgcolor: color },
        }}
      />
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ mt: 1, display: "block" }}
      >
        {subValue}
      </Typography>
    </Card>
  );
}
