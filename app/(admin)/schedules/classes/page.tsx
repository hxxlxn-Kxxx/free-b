"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";

const CLASS_STATUS_MAP: Record<string, string> = {
  SCHEDULED: "배정 완료",
  PENDING: "강사 대기",
  IN_PROGRESS: "수업 진행중",
  COMPLETED: "수업 완료",
  CANCELED: "취소됨",
};

const MOCK_CLASSES = [
  {
    classId: "CLS_1001",
    lectureTitle: "[초등] 역사 탐험대 1기",
    locationName: "송파청소년수련관",
    instructorName: "김철수",
    startTime: "2026-03-10T05:00:00Z", // KST 14:00
    endTime: "2026-03-10T07:00:00Z", // KST 16:00
    classStatus: "SCHEDULED", // 영문 Enum
  },
  {
    classId: "CLS_1002",
    lectureTitle: "[중등] 근현대사 바로알기",
    locationName: "마포평생학습관",
    instructorName: "-", // 미배정
    startTime: "2026-03-12T01:00:00Z", // KST 10:00
    endTime: "2026-03-12T03:00:00Z", // KST 12:00
    classStatus: "PENDING",
  },
];

// 유틸: UTC -> 로컬 화면 표시용 포맷팅 (예: 3/10 14:00)
const formatUtcToLocal = (utcString: string) => {
  const d = new Date(utcString);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })}`;
};

export default function ClassManagementPage() {
  const [filterStatus, setFilterStatus] = useState("ALL");

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          수업 관리
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          새 수업 등록
        </Button>
      </Box>

      {/* 필터 영역 */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Stack direction="row" spacing={2}>
          <TextField label="강사명" size="small" sx={{ width: 200 }} />
          <TextField
            select
            label="수업 상태"
            size="small"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="ALL">전체</MenuItem>
            {Object.entries(CLASS_STATUS_MAP).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" disableElevation startIcon={<Search />}>
            검색
          </Button>
        </Stack>
      </Paper>

      {/* 데이터 테이블 */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8f9fa" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                수업명
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                수업 장소
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                담당 강사
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                시작 시간
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                종료 시간
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                상태
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                상세
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_CLASSES.map((row) => (
              <TableRow key={row.classId} hover>
                <TableCell align="center" sx={{ fontWeight: "medium" }}>
                  {row.lectureTitle}
                </TableCell>
                <TableCell align="center">{row.locationName}</TableCell>
                <TableCell align="center">{row.instructorName}</TableCell>
                <TableCell align="center">
                  {formatUtcToLocal(row.startTime)}
                </TableCell>
                <TableCell align="center">
                  {formatUtcToLocal(row.endTime)}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={CLASS_STATUS_MAP[row.classStatus]}
                    color={
                      row.classStatus === "SCHEDULED"
                        ? "primary"
                        : row.classStatus === "PENDING"
                          ? "warning"
                          : "default"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button size="small" variant="outlined">
                    보기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
