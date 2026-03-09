import type { ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', md: 'center' }}
      sx={{ mb: 4 }}
    >
      <Box>
        <Typography variant="h2" sx={{ mb: description ? 1 : 0 }}>
          {title}
        </Typography>
        {description ? (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        ) : null}
      </Box>
      {action}
    </Stack>
  );
}
