"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Stack, Typography } from "@mui/material";

type AtomSearchBarProps = {
  placeholder: string;
};

export default function AtomSearchBar({ placeholder }: AtomSearchBarProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        width: "100%",
        minHeight: 44,
        px: 2,
        borderRadius: "14px 0 14px 14px",
        backgroundColor: "#F8F4EA",
        color: "text.secondary",
      }}
    >
      <SearchRoundedIcon sx={{ fontSize: 20 }} />
      <Typography variant="body2">{placeholder}</Typography>
    </Stack>
  );
}
