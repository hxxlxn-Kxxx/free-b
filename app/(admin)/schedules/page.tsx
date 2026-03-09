"use client";

import { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
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
import { Add, Search } from "@mui/icons-material";

import AssignmentModal from "@/src/components/AssignmentModal";
import FilterBar from "@/src/components/admin/FilterBar";
import PageHeader from "@/src/components/admin/PageHeader";
import SurfaceCard from "@/src/components/admin/SurfaceCard";
import AtomBadge from "@/src/components/atoms/AtomBadge";
import AtomButton from "@/src/components/atoms/AtomButton";
import AtomInput from "@/src/components/atoms/AtomInput";

type LessonRow = {
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  instructor: string;
  status: string;
};

const STATUS_OPTIONS = ["전체", "미배정", "요청중", "확정"];

const MOCK_LESSONS: LessonRow[] = [
  {
    title: "[초등] 역사 탐험대",
    date: "2026-03-05",
    time: "10:00 - 12:00",
    location: "국립중앙박물관",
    attendees: "8명",
    instructor: "김철수",
    status: "확정",
  },
  {
    title: "[중등] 과학 체험실",
    date: "2026-03-06",
    time: "14:00 - 16:00",
    location: "송파청소년수련관",
    attendees: "12명",
    instructor: "배정 중",
    status: "미배정",
  },
];

const lessonToneMap: Record<string, string> = {
  확정: "confirmed",
  요청중: "requested",
  미배정: "rejected",
};

export default function SchedulesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<LessonRow | null>(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [filterInstructor, setFilterInstructor] = useState("");
  const [filterStatus, setFilterStatus] = useState("전체");

  const handleReset = () => {
    setFilterDate("");
    setFilterTime("");
    setFilterInstructor("");
    setFilterStatus("전체");
  };

  return (
    <Box>
      <PageHeader
        title="수업 관리"
        description="배정 전 수업, 요청 상태, 확정 수업을 한 리스트에서 추적합니다."
        action={
          <AtomButton startIcon={<Add />} onClick={() => setIsModalOpen(true)}>
            새 수업 생성
          </AtomButton>
        }
      />

      <FilterBar>
        <AtomInput
          type="date"
          label="날짜"
          value={filterDate}
          onChange={(event) => setFilterDate(event.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <AtomInput
          type="time"
          label="시간"
          value={filterTime}
          onChange={(event) => setFilterTime(event.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <AtomInput
          label="강사명"
          placeholder="이름 입력"
          value={filterInstructor}
          onChange={(event) => setFilterInstructor(event.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <AtomInput
          select
          label="상태"
          value={filterStatus}
          onChange={(event) => setFilterStatus(event.target.value)}
          size="small"
          sx={{ flex: 1 }}
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </AtomInput>
        <Stack direction="row" spacing={1}>
          <AtomButton atomVariant="outline" onClick={handleReset}>
            초기화
          </AtomButton>
          <AtomButton startIcon={<Search />}>검색</AtomButton>
        </Stack>
      </FilterBar>

      <TableContainer component={SurfaceCard}>
        <Table>
          <TableHead sx={{ bgcolor: "#FBF7ED" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                날짜
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                시간
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                장소
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                인원
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                강사
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                상태
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                상세
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_LESSONS.map((lesson) => (
              <TableRow key={`${lesson.date}-${lesson.title}`} hover>
                <TableCell align="center">{lesson.date}</TableCell>
                <TableCell align="center">{lesson.time}</TableCell>
                <TableCell align="center">{lesson.location}</TableCell>
                <TableCell align="center">{lesson.attendees}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {lesson.instructor}
                </TableCell>
                <TableCell align="center">
                  <AtomBadge tone={lessonToneMap[lesson.status]} label={lesson.status} />
                </TableCell>
                <TableCell align="center">
                  <AtomButton
                    atomVariant="outline"
                    size="small"
                    onClick={() => setSelectedClass(lesson)}
                  >
                    보기
                  </AtomButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer anchor="right" open={Boolean(selectedClass)} onClose={() => setSelectedClass(null)}>
        <Box sx={{ width: 420, p: 4, backgroundColor: "#FFF9EF", height: "100%" }}>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            수업 상세 정보
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedClass?.title}
          </Typography>
          <Divider sx={{ my: 3 }} />

          <SurfaceCard sx={{ p: 3, mb: 3, backgroundColor: "#FFFCF5", boxShadow: "none" }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              도착 체크인 현황
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.75 }}>
              체크인 시간: 09:55 (정상)
            </Typography>
            <Typography variant="body2">GPS 거리: 15m 이내</Typography>
          </SurfaceCard>

          <Stack spacing={1.5}>
            <AtomButton atomVariant="outline" sx={{ width: "100%" }}>
              강사 변경
            </AtomButton>
            <AtomButton atomVariant="danger" sx={{ width: "100%" }}>
              수업 취소
            </AtomButton>
          </Stack>
        </Box>
      </Drawer>

      <AssignmentModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}
