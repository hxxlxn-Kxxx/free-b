"use client";

import type { ReactNode } from "react";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

type AtomNavItemProps = {
  label: string;
  icon: ReactNode;
  active?: boolean;
  nested?: boolean;
  onClick?: () => void;
  trailing?: ReactNode;
};

export default function AtomNavItem({
  label,
  icon,
  active = false,
  nested = false,
  onClick,
  trailing,
}: AtomNavItemProps) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        minHeight: nested ? 42 : 48,
        px: nested ? 2 : 2,
        pl: nested ? 3 : 2,
        borderRadius: active ? "14px 0 14px 14px" : nested ? "12px 0 0 0" : "14px 0 14px 14px",
        color: active ? (nested ? "#251B10" : "#FFF9EF") : "#5F5445",
        backgroundColor: active ? (nested ? "#FFF0C2" : "#251B10") : "transparent",
        "&:hover": {
          backgroundColor: active ? (nested ? "#FFF0C2" : "#251B10") : "rgba(243, 199, 66, 0.10)",
        },
      }}
    >
      {!nested ? (
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: active ? (nested ? "#251B10" : "#FFF9EF") : "#7A6A58",
          }}
        >
          {icon}
        </ListItemIcon>
      ) : null}
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          fontSize: nested ? 14 : 15,
          fontWeight: active ? 700 : 500,
        }}
      />
      {trailing ? <Box sx={{ ml: 1 }}>{trailing}</Box> : null}
    </ListItemButton>
  );
}
