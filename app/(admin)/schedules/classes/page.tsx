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
  Drawer,
  Divider,
  Grid,
  InputAdornment,
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
    startsAt: "2026-03-10T05:00:00Z", // KST 14:00 (필드명 수정됨)
    endsAt: "2026-03-10T07:00:00Z", // KST 16:00
    classStatus: "SCHEDULED",
  },
];

const formatUtcToLocal = (utcString: string) => {
  const d = new Date(utcString);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })}`;
};

export default function ClassManagementPage() {
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [formData, setFormData] = useState({
    lectureTitle: "",
    startsAt: "",
    endsAt: "",
    payAmount: "",
    studentCount: "",
    region: "",
    museum: "",
    guideNotionUrl: "",
    lessonDetails: "",
    deliveryNotes: "",
  });

  // 폼 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 유효성 검증 로직 1: 날짜 유효성 (시작 시간이 종료 시간보다 빨라야 함)
  const isDateValid =
    formData.startsAt &&
    formData.endsAt &&
    new Date(formData.startsAt) < new Date(formData.endsAt);

  // 유효성 검증 로직 2: 필수값 확인 (전달사항 deliveryNotes 제외 모두 필수라고 가정)
  const isRequiredFilled = !!(
    formData.lectureTitle &&
    formData.startsAt &&
    formData.endsAt &&
    formData.payAmount &&
    formData.studentCount &&
    formData.region &&
    formData.museum &&
    formData.guideNotionUrl &&
    formData.lessonDetails
  );

  // 최종 제출 버튼 활성화 조건
  const isFormValid = isRequiredFilled && isDateValid;

  // 폼 제출 (백엔드 전송 모의)
  const handleSubmit = () => {
    if (!isFormValid) return;

    const payload = {
      ...formData,
      startsAt: new Date(formData.startsAt).toISOString(),
      endsAt: new Date(formData.endsAt).toISOString(),
      payAmount: Number(formData.payAmount),
      studentCount: Number(formData.studentCount),
      classStatus: "PENDING", // 신규 등록 시 기본 상태(Enum)
    };

    console.log("[API 전송 모의] POST /api/classes", payload);
    alert("새 수업이 성공적으로 등록되었습니다! (콘솔 확인)");

    // 초기화 및 닫기
    setIsDrawerOpen(false);
    setFormData({
      lectureTitle: "",
      startsAt: "",
      endsAt: "",
      payAmount: "",
      studentCount: "",
      region: "",
      museum: "",
      guideNotionUrl: "",
      lessonDetails: "",
      deliveryNotes: "",
    });
  };

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
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsDrawerOpen(true)}
        >
          새 수업 등록
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="강사명"
            size="small"
            sx={{ width: 200 }}
            placeholder="이름 입력"
          />
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

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8f9fa" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                수업명
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                장소
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                시작 시간
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                상태
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_CLASSES.map((row) => (
              <TableRow key={row.classId} hover>
                <TableCell align="center">{row.lectureTitle}</TableCell>
                <TableCell align="center">{row.locationName}</TableCell>
                <TableCell align="center">
                  {formatUtcToLocal(row.startsAt)}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={CLASS_STATUS_MAP[row.classStatus]}
                    color="primary"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 새 수업 등록 슬라이드 패널 */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 500,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box sx={{ p: 3, bgcolor: "#1976d2", color: "white" }}>
            <Typography variant="h6" fontWeight="bold">
              새 수업 등록
            </Typography>
          </Box>
          <Divider />

          <Box sx={{ p: 4, flexGrow: 1, overflowY: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="수업명 (lectureTitle)"
                  name="lectureTitle"
                  value={formData.lectureTitle}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* 시간 입력 필드 (datetime-local 사용) */}
              <Grid item xs={6}>
                <TextField
                  type="datetime-local"
                  label="시작 일시 (startsAt)"
                  name="startsAt"
                  value={formData.startsAt}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  error={
                    formData.startsAt !== "" &&
                    formData.endsAt !== "" &&
                    !isDateValid
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="datetime-local"
                  label="종료 일시 (endsAt)"
                  name="endsAt"
                  value={formData.endsAt}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  error={
                    formData.startsAt !== "" &&
                    formData.endsAt !== "" &&
                    !isDateValid
                  }
                  helperText={
                    formData.startsAt !== "" &&
                    formData.endsAt !== "" &&
                    !isDateValid
                      ? "종료 시간이 시작 시간보다 빠를 수 없습니다."
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  type="number"
                  label="지급액 (payAmount)"
                  name="payAmount"
                  value={formData.payAmount}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">원</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  label="학생 수 (studentCount)"
                  name="studentCount"
                  value={formData.studentCount}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">명</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="지역 (region)"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="박물관/장소 (museum)"
                  name="museum"
                  value={formData.museum}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="url"
                  label="가이드 노션 링크 (guideNotionUrl)"
                  name="guideNotionUrl"
                  value={formData.guideNotionUrl}
                  onChange={handleChange}
                  fullWidth
                  required
                  placeholder="https://notion.so/..."
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="수업 상세 내용 (lessonDetails)"
                  name="lessonDetails"
                  value={formData.lessonDetails}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="전달 사항 (deliveryNotes)"
                  name="deliveryNotes"
                  value={formData.deliveryNotes}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="강사에게 전달할 추가 메모 (선택)"
                />
              </Grid>
            </Grid>
          </Box>

          {/* 하단 고정 액션 버튼 */}
          <Box
            sx={{
              p: 3,
              borderTop: "1px solid #eee",
              bgcolor: "#f8f9fa",
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={() => setIsDrawerOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={!isFormValid} // 완료 조건: 미입력 및 날짜 오류 시 비활성화!
            >
              수업 등록하기
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
