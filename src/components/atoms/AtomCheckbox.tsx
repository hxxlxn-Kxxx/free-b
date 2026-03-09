"use client";

import { Checkbox, type CheckboxProps } from "@mui/material";

export default function AtomCheckbox({ sx, ...props }: CheckboxProps) {
  return (
    <Checkbox
      {...props}
      sx={{
        color: "#D5B35F",
        "&.Mui-checked": {
          color: "#251B10",
        },
        "& .MuiSvgIcon-root": {
          fontSize: 22,
        },
        ...sx,
      }}
    />
  );
}
