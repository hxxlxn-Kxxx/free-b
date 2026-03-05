"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// 💡 대시보드에서 만들었던 모달을 똑같이 가져옵니다!
import AssignmentModal from "@/src/components/AssignmentModal";

// 💡 기획서에 맞춘 상태값 필터 옵션 [cite: 32]
const STATUS_OPTIONS = ["전체", "미배정", "요청중", "확정"];

// 💡 임시 데이터 (역사나래 컨텍스트 반영)
const MOCK_CLASSES = [
  {
    id: 1,
    title: "[초등] 고조선의 건국",
    date: "2026-03-10",
    time: "14:00 - 16:00",
    location: "국립중앙박물관",
    instructor: "김철수",
    status: "확정",
  },
  {
    id: 2,
    title: "[중등] 삼국시대 통일",
    date: "2026-03-11",
    time: "10:00 - 12:00",
    location: "역사나래 본원",
    instructor: "-",
    status: "미배정",
  },
  {
    id: 3,
    title: "[초등] 조선의 궁궐",
    date: "2026-03-12",
    time: "13:00 - 15:00",
    location: "경복궁",
    instructor: "이영희",
    status: "요청중",
  },
];

export default function ClassesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("전체");

  // 상태에 따라 Chip 색상을 다르게 주는 센스! ㅋㅋㅋㅋ
  const getStatusColor = (status: string) => {
    switch (status) {
      case "확정":
        return "success";
      case "요청중":
        return "warning";
      case "미배정":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      {/* 1. 상단 타이틀 및 생성 버튼 [cite: 33] */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#1e293b" }}>
          수업 관리
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          새 수업 생성
        </Button>
      </Box>

      {/* 2. 기획서에 명시된 상단 필터 영역 [cite: 30, 31, 32] */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            type="date"
            label="날짜 필터"
            InputLabelProps={{ shrink: true }}
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            size="small"
          />
          <TextField
            select
            label="상태 필터"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="text"
            onClick={() => {
              setFilterDate("");
              setFilterStatus("전체");
            }}
          >
            필터 초기화
          </Button>
        </Stack>
      </Paper>

      {/* 3. 기획서의 리스트 컬럼을 반영한 테이블 영역  */}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f8f9fa" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>수업명</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>날짜</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>시간</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>장소</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>강사</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>상태</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>상세</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_CLASSES.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontWeight: "medium" }}>{row.title}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.instructor}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={getStatusColor(row.status) as any}
                    size="small"
                    variant={row.status === "미배정" ? "filled" : "outlined"}
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">
                    보기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 💡 대시보드에서 만들었던 똑같은 모달 렌더링! */}
      <AssignmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}
