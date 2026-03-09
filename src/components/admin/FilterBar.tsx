import type { ReactNode } from 'react';
import { Stack } from '@mui/material';
import SurfaceCard from './SurfaceCard';

type FilterBarProps = {
  children: ReactNode;
};

export default function FilterBar({ children }: FilterBarProps) {
  return (
    <SurfaceCard sx={{ p: 2.5, mb: 3 }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
        {children}
      </Stack>
    </SurfaceCard>
  );
}
