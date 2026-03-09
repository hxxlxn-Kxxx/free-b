"use client";

import { useState } from "react";
import {
  Box,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CalendarMonth,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
} from "@mui/icons-material";

import PageHeader from "@/src/components/admin/PageHeader";
import SurfaceCard from "@/src/components/admin/SurfaceCard";
import AtomBadge from "@/src/components/atoms/AtomBadge";
import AtomButton from "@/src/components/atoms/AtomButton";
import AtomCheckbox from "@/src/components/atoms/AtomCheckbox";
import AtomInput from "@/src/components/atoms/AtomInput";

type SettlementRow = {
  id: number;
  name: string;
  classCount: number;
  hours: number;
  basePay: number;
  manualBonus: number;
  totalPay: number;
  status: string;
};

const MOCK_SETTLEMENTS: SettlementRow[] = [
  {
    id: 1,
    name: "김철수",
    classCount: 8,
    hours: 16,
    basePay: 480000,
    manualBonus: 50000,
    totalPay: 530000,
    status: "지급 대기",
  },
  {
    id: 2,
    name: "이영희",
    classCount: 4,
    hours: 8,
    basePay: 280000,
    manualBonus: 0,
    totalPay: 280000,
    status: "지급 완료",
  },
  {
    id: 3,
    name: "박지민",
    classCount: 12,
    hours: 24,
    basePay: 600000,
    manualBonus: 100000,
    totalPay: 700000,
    status: "지급 대기",
  },
];

const summaryCards = [
  {
    label: "이번 달 총 지급 예정액",
    value: "1,510,000원",
    accent: "#F3C742",
  },
  {
    label: "지급 완료",
    value: "280,000원",
    accent: "#9AD4AF",
  },
  {
    label: "지급 대기",
    value: "1,230,000원",
    accent: "#F5D37B",
  },
];

export default function SettlementPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? MOCK_SETTLEMENTS.map((row) => row.id) : []);
  };

  const handleSelectOne = (id: number) => {
    setSelectedRows((previous) =>
      previous.includes(id) ? previous.filter((rowId) => rowId !== id) : [...previous, id],
    );
  };

  return (
    <Box>
      <PageHeader
        title="월별 정산 관리"
        description="지급 예정액, 수동 수당, 지급 완료 처리를 한 화면에서 정리합니다."
        action={
          <SurfaceCard
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: "18px 0 18px 18px",
              boxShadow: "none",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <AtomButton atomVariant="ghost" size="small" sx={{ minWidth: 36, px: 1.25 }}>
                <ChevronLeft />
              </AtomButton>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 1 }}>
                <CalendarMonth sx={{ color: "#B7791F", fontSize: 18 }} />
                <Typography variant="subtitle2">2026년 3월</Typography>
              </Stack>
              <AtomButton atomVariant="ghost" size="small" sx={{ minWidth: 36, px: 1.25 }}>
                <ChevronRight />
              </AtomButton>
            </Stack>
          </SurfaceCard>
        }
      />

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
        {summaryCards.map((card) => (
          <SurfaceCard
            key={card.label}
            sx={{
              flex: 1,
              p: 3,
              borderRadius: "24px 0 24px 24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: "0 auto 0 0",
                width: 8,
                backgroundColor: card.accent,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {card.label}
            </Typography>
            <Typography variant="h3" sx={{ mt: 1.5 }}>
              {card.value}
            </Typography>
          </SurfaceCard>
        ))}
      </Stack>

      <TableContainer component={SurfaceCard} sx={{ mb: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#FBF7ED" }}>
            <TableRow>
              <TableCell padding="checkbox">
                <AtomCheckbox
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < MOCK_SETTLEMENTS.length
                  }
                  checked={selectedRows.length === MOCK_SETTLEMENTS.length}
                  onChange={(event) => handleSelectAll(event.target.checked)}
                />
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                강사명
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                수업 수
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                근무시간
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                기본 지급액
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: "#B7791F" }}>
                수동 수당
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                최종 지급액
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                상태
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_SETTLEMENTS.map((row) => {
              const isSelected = selectedRows.includes(row.id);

              return (
                <TableRow key={row.id} hover selected={isSelected}>
                  <TableCell padding="checkbox">
                    <AtomCheckbox
                      checked={isSelected}
                      onChange={() => handleSelectOne(row.id)}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.classCount}회</TableCell>
                  <TableCell align="center">{row.hours}시간</TableCell>
                  <TableCell align="center">{row.basePay.toLocaleString()}원</TableCell>
                  <TableCell align="center">
                    <AtomInput
                      size="small"
                      defaultValue={row.manualBonus}
                      disabled={row.status === "지급 완료"}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">원</InputAdornment>,
                      }}
                      sx={{ width: 140 }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: "#251B10" }}>
                    {row.totalPay.toLocaleString()}원
                  </TableCell>
                  <TableCell align="center">
                    <AtomBadge
                      tone={row.status === "지급 완료" ? "signed" : "requested"}
                      label={row.status}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
        <AtomButton atomVariant="outline" startIcon={<Download />}>
          엑셀 다운로드
        </AtomButton>
        <AtomButton
          startIcon={<CheckCircle />}
          disabled={selectedRows.length === 0}
          sx={{
            opacity: selectedRows.length === 0 ? 0.5 : 1,
          }}
        >
          {selectedRows.length > 0 ? `${selectedRows.length}건 ` : ""}지급 완료 처리
        </AtomButton>
      </Box>
    </Box>
  );
}
