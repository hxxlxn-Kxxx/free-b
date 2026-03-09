import type { ReactNode } from 'react';
import { Paper } from '@mui/material';

type SurfaceCardProps = {
  children: ReactNode;
  sx?: object;
};

export default function SurfaceCard({ children, sx }: SurfaceCardProps) {
  return (
    <Paper
      sx={{
        borderRadius: "24px 0 24px 24px",
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 24px 60px rgba(77, 54, 24, 0.06)',
        backgroundColor: 'background.paper',
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}
