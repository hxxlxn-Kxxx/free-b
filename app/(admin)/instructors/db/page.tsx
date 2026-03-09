"use client";

import { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Search, UploadFile } from "@mui/icons-material";

import FilterBar from "@/src/components/admin/FilterBar";
import PageHeader from "@/src/components/admin/PageHeader";
import SurfaceCard from "@/src/components/admin/SurfaceCard";
import AtomButton from "@/src/components/atoms/AtomButton";
import AtomInput from "@/src/components/atoms/AtomInput";

const LEVEL_OPTIONS = ["전체", "주니어", "시니어", "마스터"];

type InstructorRow = {
  name: string;
  level: string;
  phone: string;
  region: string;
  availability: string;
  major: string;
};

const MOCK_INSTRUCTORS: InstructorRow[] = [
  {
    name: "강혜린",
    level: "주니어",
    phone: "010-5304-3742",
    region: "경기",
    availability: "14일, 15일, 28일",
    major: "컴퓨터공학",
  },
];

export default function InstructorDBPage() {
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorRow | null>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [filterRegion, setFilterRegion] = useState("");
  const [filterMajor, setFilterMajor] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterLevel, setFilterLevel] = useState("전체");

  const handleReset = () => {
    setFilterRegion("");
    setFilterMajor("");
    setFilterName("");
    setFilterLevel("전체");
  };

  return (
    <Box>
      <PageHeader
        title="전체 강사 DB"
        description="강사 프로필, 레벨, 가능 일정과 계약 자료를 같은 구조 안에서 탐색합니다."
        action={
          <Stack direction="row" spacing={1}>
            <AtomButton atomVariant="outline" startIcon={<UploadFile />}>
              엑셀 업로드
            </AtomButton>
            <AtomButton startIcon={<Add />}>강사 추가</AtomButton>
          </Stack>
        }
      />

      <FilterBar>
        <AtomInput
          label="강사명"
          placeholder="이름 입력"
          value={filterName}
          onChange={(event) => setFilterName(event.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <AtomInput
          label="거주지역"
          placeholder="예: 경기"
          value={filterRegion}
          onChange={(event) => setFilterRegion(event.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <AtomInput
          label="전공"
          placeholder="예: 컴퓨터공학"
          value={filterMajor}
          onChange={(event) => setFilterMajor(event.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <AtomInput
          select
          label="레벨"
          value={filterLevel}
          onChange={(event) => setFilterLevel(event.target.value)}
          size="small"
          sx={{ flex: 1 }}
        >
          {LEVEL_OPTIONS.map((option) => (
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
                이름
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                레벨
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                연락처
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                거주지역
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                출강가능일
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                전공
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                상세
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_INSTRUCTORS.map((instructor) => (
              <TableRow key={instructor.name} hover>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {instructor.name}
                </TableCell>
                <TableCell align="center">{instructor.level}</TableCell>
                <TableCell align="center">{instructor.phone}</TableCell>
                <TableCell align="center">{instructor.region}</TableCell>
                <TableCell align="center">{instructor.availability}</TableCell>
                <TableCell align="center">{instructor.major}</TableCell>
                <TableCell align="center">
                  <AtomButton
                    atomVariant="outline"
                    size="small"
                    onClick={() => setSelectedInstructor(instructor)}
                  >
                    보기
                  </AtomButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer
        anchor="right"
        open={Boolean(selectedInstructor)}
        onClose={() => setSelectedInstructor(null)}
      >
        <Box
          sx={{
            width: 520,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#FFF9EF",
          }}
        >
          <Box sx={{ p: 4, pb: 2 }}>
            <Typography variant="h4">{selectedInstructor?.name} 강사</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {selectedInstructor?.level} | 연락처: {selectedInstructor?.phone}
            </Typography>
          </Box>

          <Box sx={{ px: 2.5 }}>
            <Tabs
              value={tabIndex}
              onChange={(_, newValue) => setTabIndex(newValue)}
              variant="fullWidth"
              sx={{
                "& .MuiTab-root": {
                  minHeight: 48,
                  borderRadius: "14px 0 14px 14px",
                  textTransform: "none",
                  fontWeight: 600,
                },
                "& .Mui-selected": {
                  backgroundColor: "#FFF0C2",
                  color: "#251B10 !important",
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
            >
              <Tab label="기본 정보" />
              <Tab label="가용시간" />
              <Tab label="수업 이력" />
              <Tab label="계약" />
            </Tabs>
          </Box>

          <Divider sx={{ mt: 2 }} />

          <Box sx={{ p: 4, flexGrow: 1, overflowY: "auto" }}>
            {tabIndex === 0 ? (
              <SurfaceCard sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  상세 프로필
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  학력, 주요 경력, 주소, 선호 수업 연령대 등 프로필 원문이 들어갑니다.
                </Typography>
              </SurfaceCard>
            ) : null}
            {tabIndex === 1 ? (
              <SurfaceCard sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  투입 가능 스케줄
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  요일별 출강 가능 시간과 우선 배정 지역을 표시합니다.
                </Typography>
              </SurfaceCard>
            ) : null}
            {tabIndex === 2 ? (
              <SurfaceCard sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  진행한 수업 내역
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  과거 수업 이력과 평가 메모를 시간순으로 노출합니다.
                </Typography>
              </SurfaceCard>
            ) : null}
            {tabIndex === 3 ? (
              <SurfaceCard sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  체결된 계약서
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  전자서명된 PDF 계약서와 만료 예정 정보를 묶어서 보여줍니다.
                </Typography>
              </SurfaceCard>
            ) : null}
          </Box>

          <Box sx={{ p: 3, borderTop: "1px solid #EBDDC3" }}>
            <AtomButton sx={{ width: "100%" }}>정보 수정하기</AtomButton>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
