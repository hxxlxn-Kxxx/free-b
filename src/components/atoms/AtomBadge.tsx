"use client";

import { Chip } from "@mui/material";

const badgeStyles: Record<
  string,
  { label: string; textColor: string; backgroundColor: string; borderColor?: string }
> = {
  draft: {
    label: "초안",
    textColor: "#5F5445",
    backgroundColor: "#F5EFE2",
  },
  pending: {
    label: "대기",
    textColor: "#5F5445",
    backgroundColor: "#F5EFE2",
  },
  sent: {
    label: "발송",
    textColor: "#B7791F",
    backgroundColor: "#FFF6DC",
  },
  viewed: {
    label: "열람",
    textColor: "#7C5C99",
    backgroundColor: "#F3ECFA",
  },
  confirmed: {
    label: "확정",
    textColor: "#2F6B2F",
    backgroundColor: "#EAF7F0",
  },
  signed: {
    label: "서명완료",
    textColor: "#2F6B2F",
    backgroundColor: "#EAF7F0",
  },
  requested: {
    label: "요청중",
    textColor: "#B7791F",
    backgroundColor: "#FFF2D9",
  },
  late: {
    label: "지각",
    textColor: "#B7791F",
    backgroundColor: "#FFF2D9",
  },
  rejected: {
    label: "거절",
    textColor: "#B24231",
    backgroundColor: "#FCE9E7",
  },
  cancelled: {
    label: "취소",
    textColor: "#B24231",
    backgroundColor: "#FCE9E7",
  },
  "서명완료": {
    label: "서명완료",
    textColor: "#2F6B2F",
    backgroundColor: "#EAF7F0",
  },
  "만료임박": {
    label: "만료임박",
    textColor: "#B7791F",
    backgroundColor: "#FFF2D9",
  },
  "계약대기": {
    label: "계약대기",
    textColor: "#B24231",
    backgroundColor: "#FCE9E7",
  },
  "운영중": {
    label: "운영중",
    textColor: "#2F6B2F",
    backgroundColor: "#EAF7F0",
  },
  "지급 대기": {
    label: "지급 대기",
    textColor: "#B7791F",
    backgroundColor: "#FFF2D9",
  },
  "지급 완료": {
    label: "지급 완료",
    textColor: "#2F6B2F",
    backgroundColor: "#EAF7F0",
  },
};

type AtomBadgeProps = {
  tone: string;
  label?: string;
};

export default function AtomBadge({ tone, label }: AtomBadgeProps) {
  const style = badgeStyles[tone] ?? {
    label: label ?? tone,
    textColor: "#5F5445",
    backgroundColor: "#F5EFE2",
  };

  return (
    <Chip
      label={label ?? style.label}
      size="small"
      sx={{
        height: 30,
        borderRadius: "16px 0 16px 16px",
        color: style.textColor,
        backgroundColor: style.backgroundColor,
        fontWeight: 700,
        border: style.borderColor ? `1px solid ${style.borderColor}` : "none",
      }}
    />
  );
}
