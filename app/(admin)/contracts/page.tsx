"use client";

import { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, HistoryEdu, PictureAsPdf, Search, VerifiedUser } from "@mui/icons-material";

import PageHeader from "@/src/components/admin/PageHeader";
import FilterBar from "@/src/components/admin/FilterBar";
import SurfaceCard from "@/src/components/admin/SurfaceCard";
import AtomBadge from "@/src/components/atoms/AtomBadge";
import AtomButton from "@/src/components/atoms/AtomButton";
import AtomInput from "@/src/components/atoms/AtomInput";

type ContractStatus = "DRAFT" | "SENT" | "INSTRUCTOR_SIGNED" | "FULLY_SIGNED" | "VOID";

type ContractRow = {
  id: string;
  name: string;
  type: string;
  status: ContractStatus;
  startDate: string;
  endDate: string;
};

const CONTRACT_STATUS_MAP: Record<ContractStatus, string> = {
  DRAFT: "초안",
  SENT: "발송",
  INSTRUCTOR_SIGNED: "열람",
  FULLY_SIGNED: "서명완료",
  VOID: "무효",
};

const CONTRACT_TONE_MAP: Record<ContractStatus, string> = {
  DRAFT: "draft",
  SENT: "sent",
  INSTRUCTOR_SIGNED: "viewed",
  FULLY_SIGNED: "signed",
  VOID: "cancelled",
};

const STATUS_OPTIONS = ["전체", "초안", "발송", "열람", "서명완료"];

const MOCK_CONTRACTS: ContractRow[] = [
  {
    id: "C-2603-01",
    name: "김철수",
    type: "정규 프리랜서",
    status: "FULLY_SIGNED",
    startDate: "2026-03-01",
    endDate: "2026-08-31",
  },
  {
    id: "C-2603-02",
    name: "이영희",
    type: "단기 대강",
    status: "INSTRUCTOR_SIGNED",
    startDate: "2026-03-10",
    endDate: "2026-03-31",
  },
  {
    id: "C-2603-03",
    name: "박지민",
    type: "정규 프리랜서",
    status: "SENT",
    startDate: "2026-04-01",
    endDate: "2026-09-30",
  },
  {
    id: "C-2603-04",
    name: "강혜린",
    type: "정규 프리랜서",
    status: "DRAFT",
    startDate: "2026-03-15",
    endDate: "2026-09-14",
  },
];

export default function ContractsPage() {
  const [selectedContract, setSelectedContract] = useState<ContractRow | null>(null);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("전체");

  return (
    <Box>
      <PageHeader
        title="계약 관리"
        description="계약 생성, 발송, 서명 진행 상태를 한 흐름으로 확인합니다."
        action={<AtomButton startIcon={<Add />}>새 계약 생성</AtomButton>}
      />

      <FilterBar>
        <AtomInput
          label="강사명"
          placeholder="이름 입력"
          value={filterName}
          onChange={(event) => setFilterName(event.target.value)}
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <AtomInput
          select
          label="계약 상태"
          value={filterStatus}
          onChange={(event) => setFilterStatus(event.target.value)}
          size="small"
          sx={{ minWidth: 220 }}
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </AtomInput>
        <AtomButton startIcon={<Search />}>검색</AtomButton>
      </FilterBar>

      <TableContainer component={SurfaceCard}>
        <Table>
          <TableHead sx={{ bgcolor: "#FBF7ED" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                강사명
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                계약 유형
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                상태
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                시작일
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                종료일
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                상세
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_CONTRACTS.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">
                  <AtomBadge
                    tone={CONTRACT_TONE_MAP[row.status]}
                    label={CONTRACT_STATUS_MAP[row.status]}
                  />
                </TableCell>
                <TableCell align="center">{row.startDate}</TableCell>
                <TableCell align="center">{row.endDate}</TableCell>
                <TableCell align="center">
                  <AtomButton
                    atomVariant="outline"
                    size="small"
                    onClick={() => setSelectedContract(row)}
                  >
                    보기
                  </AtomButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer anchor="right" open={Boolean(selectedContract)} onClose={() => setSelectedContract(null)}>
        <Box
          sx={{
            width: 460,
            p: 4,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#FFF9EF",
          }}
        >
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            계약 상세 정보
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            계약 번호: {selectedContract?.id}
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <SurfaceCard sx={{ p: 3, mb: 3, backgroundColor: "#FFFCF5", boxShadow: "none" }}>
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
              <VerifiedUser
                sx={{
                  color: selectedContract?.status === "FULLY_SIGNED" ? "#2F6B2F" : "#B7791F",
                }}
              />
              {selectedContract ? (
                <AtomBadge
                  tone={CONTRACT_TONE_MAP[selectedContract.status]}
                  label={CONTRACT_STATUS_MAP[selectedContract.status]}
                />
              ) : null}
            </Stack>

            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">
                  서명 시간
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {selectedContract?.status === "FULLY_SIGNED" ? "2026-03-05 14:30" : "-"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">
                  서명 IP
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {selectedContract?.status === "FULLY_SIGNED" ? "192.168.1.104" : "-"}
                </Typography>
              </Grid>
            </Grid>
          </SurfaceCard>

          <SurfaceCard sx={{ p: 3, mb: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2" color="text.secondary">
                진행 로그
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <HistoryEdu sx={{ color: "#B7791F" }} />
                <Typography variant="body2">발송 후 열람 완료, 최종 서명 대기</Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PictureAsPdf sx={{ color: "#7A6A58" }} />
                <Typography variant="body2">원본 PDF와 전자서명 이력 보관</Typography>
              </Stack>
            </Stack>
          </SurfaceCard>

          <AtomButton
            atomVariant="outline"
            size="large"
            startIcon={<PictureAsPdf />}
            sx={{ width: "100%", mb: "auto", borderStyle: "dashed", borderWidth: 2 }}
          >
            계약서 원본 PDF 열람
          </AtomButton>

          <Box sx={{ pt: 3, borderTop: "1px solid #EBDDC3" }}>
            {selectedContract?.status !== "FULLY_SIGNED" ? (
              <AtomButton sx={{ width: "100%", mb: 1.25 }}>재발송 및 서명 요청</AtomButton>
            ) : null}
            <AtomButton atomVariant="danger" sx={{ width: "100%" }}>
              계약 종료 처리
            </AtomButton>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
