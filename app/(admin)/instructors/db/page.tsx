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
  Drawer,
  Divider,
  Tabs,
  Tab, // 💡 탭 구현을 위한 MUI 컴포넌트 추가
} from "@mui/material";
import { Add, Search, UploadFile } from "@mui/icons-material";

// 강사 레벨/상태 옵션 (임시)
const LEVEL_OPTIONS = ["전체", "주니어", "시니어", "마스터"];

export default function InstructorDBPage() {
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null); // 강사 상세 보기용
  const [tabIndex, setTabIndex] = useState(0); // 💡 상세 패널 탭 상태 관리

  const [filterRegion, setFilterRegion] = useState("");
  const [filterMajor, setFilterMajor] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterLevel, setFilterLevel] = useState("전체");

  const handleSearch = () => {
    console.log("검색 조건:", {
      filterRegion,
      filterMajor,
      filterName,
      filterLevel,
    });
    alert("검색이 실행되었습니다!");
  };

  const handleReset = () => {
    setFilterRegion("");
    setFilterMajor("");
    setFilterName("");
    setFilterLevel("전체");
  };

  return (
    <Box>
      {/* 상단 타이틀 및 액션 버튼 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          전체 강사 DB
        </Typography>
        <Stack direction="row" spacing={1}>
          {/* 💡 기획서 반영: 엑셀 업로드 및 강사 추가 버튼  */}
          <Button variant="outlined" startIcon={<UploadFile />}>
            엑셀 업로드
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            강사 추가
          </Button>
        </Stack>
      </Box>

      {/* 필터 영역 (강사 DB 성격에 맞게 조정) */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        }}
      >
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="강사명"
            placeholder="이름 입력"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="거주지역"
            placeholder="예: 경기"
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="전공"
            placeholder="예: 컴퓨터공학"
            value={filterMajor}
            onChange={(e) => setFilterMajor(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            select
            label="레벨"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            size="small"
            fullWidth
          >
            {LEVEL_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined" color="inherit" onClick={handleReset}>
            초기화
          </Button>
          <Button
            variant="contained"
            startIcon={<Search />}
            onClick={handleSearch}
            disableElevation
          >
            검색
          </Button>
        </Box>
      </Paper>

      {/* 사용자님이 만드신 리스트 테이블 완벽 적용! */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8f9fa" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                이름
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                레벨
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                연락처
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                거주지역
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                출강가능일
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                전공
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                상세
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell align="center">강혜린</TableCell>
              <TableCell align="center">주니어</TableCell>
              <TableCell align="center">010-5304-3742</TableCell>
              <TableCell align="center">경기</TableCell>
              <TableCell align="center">14일, 15일, 28일</TableCell>
              <TableCell align="center">컴퓨터공학</TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSelectedInstructor({ name: "강혜린" })}
                >
                  보기
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* 💡 기획서를 완벽 반영한 강사 상세 슬라이드 패널 */}
      <Drawer
        anchor="right"
        open={!!selectedInstructor}
        onClose={() => setSelectedInstructor(null)}
      >
        <Box
          sx={{
            width: 500,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* 패널 상단: 강사 이름 */}
          <Box sx={{ p: 4, pb: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              {selectedInstructor?.name} 강사
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              주니어 | 연락처: 010-5304-3742
            </Typography>
          </Box>

          {/* 💡 기획서 4가지 탭 영역  */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
            <Tabs
              value={tabIndex}
              onChange={(e, newValue) => setTabIndex(newValue)}
              variant="fullWidth"
            >
              <Tab label="기본 정보" /> {/*  */}
              <Tab label="가용시간" /> {/*  */}
              <Tab label="수업 이력" /> {/*  */}
              <Tab label="계약" /> {/*  */}
            </Tabs>
          </Box>

          {/* 탭 내용이 렌더링되는 영역 */}
          <Box sx={{ p: 4, flexGrow: 1, overflowY: "auto" }}>
            {tabIndex === 0 && (
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  👤 상세 프로필
                </Typography>
                <Typography variant="body2">
                  여기에 학력, 주요 경력, 주소 등의 내용이 들어갑니다.
                </Typography>
              </Box>
            )}
            {tabIndex === 1 && (
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  ⏰ 투입 가능 스케줄
                </Typography>
                <Typography variant="body2">
                  요일별/시간대별 출강 가능 여부 캘린더가 들어갑니다.
                </Typography>
              </Box>
            )}
            {tabIndex === 2 && (
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  📚 진행한 수업 내역
                </Typography>
                <Typography variant="body2">
                  과거 강의 평가 및 출강 히스토리 리스트가 뜹니다.
                </Typography>
              </Box>
            )}
            {tabIndex === 3 && (
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  📄 체결된 계약서
                </Typography>
                <Typography variant="body2">
                  전자 서명된 PDF 계약서 목록이 뜹니다.
                </Typography>
              </Box>
            )}
          </Box>

          {/* 패널 하단 고정 버튼 */}
          <Box sx={{ p: 3, borderTop: "1px solid #eee" }}>
            <Button variant="contained" fullWidth size="large">
              정보 수정하기
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
