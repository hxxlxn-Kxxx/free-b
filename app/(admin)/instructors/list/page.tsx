"use client";

import React, { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
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
import {
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
  Search,
} from "@mui/icons-material";

import AtomButton from "@/src/components/atoms/AtomButton";
import AtomInput from "@/src/components/atoms/AtomInput";
import FilterBar from "@/src/components/admin/FilterBar";
import PageHeader from "@/src/components/admin/PageHeader";
import StatusBadge from "@/src/components/admin/StatusBadge";
import SurfaceCard from "@/src/components/admin/SurfaceCard";

const CONTRACT_STATUS = ["전체", "서명완료", "계약대기", "만료임박"];

const MOCK_OPERATIONS = [
  {
    id: 1,
    name: "김철수",
    phone: "010-1234-5678",
    classCount: 6,
    hours: 12,
    status: "서명완료",
  },
  {
    id: 2,
    name: "이영희",
    phone: "010-9876-5432",
    classCount: 4,
    hours: 8,
    status: "만료임박",
  },
  {
    id: 3,
    name: "박지민",
    phone: "010-5555-4444",
    classCount: 0,
    hours: 0,
    status: "계약대기",
  },
  {
    id: 4,
    name: "정민수",
    phone: "010-1111-2222",
    classCount: 12,
    hours: 24,
    status: "서명완료",
  },
];

export default function InstructorListPage() {
  const [selectedInstructor, setSelectedInstructor] = useState<(typeof MOCK_OPERATIONS)[number] | null>(null);
  const currentMonth = "2026-03";
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("전체");

  const handleSearch = () => {
    console.log("검색 조건:", { currentMonth, filterName, filterStatus });
    alert(`${currentMonth}월 데이터 검색이 실행되었습니다!`);
  };

  return (
    <Box>
      <PageHeader
        title="강사 운영 리스트"
        description="계약 상태와 월별 가동률을 기준으로 강사 운영 현황을 빠르게 훑습니다."
        action={
          <SurfaceCard sx={{ px: 1, py: 0.75, borderRadius: 999 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton size="small">
                <ChevronLeft />
              </IconButton>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 1 }}>
                <CalendarMonth fontSize="small" color="action" />
                <Box component="span" sx={{ fontWeight: 700 }}>
                  2026년 3월
                </Box>
              </Stack>
              <IconButton size="small">
                <ChevronRight />
              </IconButton>
            </Stack>
          </SurfaceCard>
        }
      />

      <FilterBar>
        <AtomInput
          label="강사명"
          placeholder="이름 입력"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <AtomInput
          select
          label="계약 상태"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          size="small"
          sx={{ minWidth: { xs: "100%", lg: 220 } }}
        >
          {CONTRACT_STATUS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </AtomInput>
        <AtomButton
          startIcon={<Search />}
          onClick={handleSearch}
          sx={{ minWidth: { xs: "100%", lg: 132 } }}
        >
          검색
        </AtomButton>
      </FilterBar>

      <SurfaceCard sx={{ overflow: "hidden" }}>
        <TableContainer component="div">
          <Table>
            <TableHead sx={{ backgroundColor: "#FBF7ED" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  이름
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  연락처
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "primary.dark" }}>
                  이번달 출강 횟수
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  이번달 근무시간
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  계약 상태
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  스케줄
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_OPERATIONS.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    "& td": {
                      borderColor: "divider",
                    },
                  }}
                >
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        px: 1.5,
                        py: 0.8,
                        borderRadius: 999,
                        backgroundColor: row.classCount > 0 ? "#6C63FF" : "#F0E8DA",
                        color: row.classCount > 0 ? "#FFFFFF" : "#5F5445",
                        fontWeight: 700,
                      }}
                    >
                      {row.classCount}회
                    </Box>
                  </TableCell>
                  <TableCell align="center">{row.hours}시간</TableCell>
                  <TableCell align="center">
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell align="center">
                    <AtomButton atomVariant="outline" onClick={() => setSelectedInstructor(row)}>
                      일정 보기
                    </AtomButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SurfaceCard>

      <Drawer anchor="right" open={Boolean(selectedInstructor)} onClose={() => setSelectedInstructor(null)}>
        <Box sx={{ width: 420, p: 4, backgroundColor: "background.default", height: "100%" }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {selectedInstructor?.name} 강사
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            이번 달 배정된 수업과 계약 상태를 우측 패널에서 빠르게 점검합니다.
          </Typography>

          <SurfaceCard sx={{ p: 3, mb: 3 }}>
            <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  총 출강 횟수
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {selectedInstructor?.classCount ?? 0}회
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  총 근무 시간
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {selectedInstructor?.hours ?? 0}시간
                </Typography>
              </Box>
            </Stack>
          </SurfaceCard>

          <Stack spacing={2}>
            {["국립중앙박물관", "용산 역사관", "분당 수업지"].map((location, index) => (
              <SurfaceCard key={location} sx={{ p: 2.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  3월 {index + 9}일 · 14:00 - 16:00
                </Typography>
              </SurfaceCard>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
