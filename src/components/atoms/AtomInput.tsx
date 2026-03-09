"use client";

import { TextField, type TextFieldProps } from "@mui/material";

type AtomInputProps = TextFieldProps & {
  multilineRows?: number;
};

export default function AtomInput({
  multilineRows,
  InputLabelProps,
  multiline,
  slotProps,
  sx,
  ...props
}: AtomInputProps) {
  return (
    <TextField
      {...props}
      multiline={multiline ?? Boolean(multilineRows)}
      minRows={multilineRows}
      InputLabelProps={{ shrink: true, ...InputLabelProps }}
      slotProps={{
        ...slotProps,
        htmlInput: {
          suppressHydrationWarning: true,
          ...slotProps?.htmlInput,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: multilineRows ? "8px" : "14px 0 14px 14px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          "& fieldset": {
            borderColor: "#EFD9A2",
          },
        },
        "& .MuiInputBase-input": {
          color: "#251B10",
        },
        "& .MuiInputLabel-root": {
          color: "#7A6A58",
        },
        ...sx,
      }}
    />
  );
}
