"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  TextField,
  Chip,
  Stack,
  Divider,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface AssignmentModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  "기본 정보 (날짜/시간)",
  "장소 및 명단",
  "지도안 및 수업명",
  "강사 배정",
];

export default function AssignmentModal({
  open,
  onClose,
}: AssignmentModalProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleClose = () => {
    setActiveStep(0);
    onClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // 1단계: 기획서의 날짜/시간 [cite: 39, 40, 41]
        return (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 2 }}
            >
              수업 일정을 선택해주세요.
            </Typography>
            <Stack spacing={3}>
              <TextField
                type="date"
                label="날짜"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  type="time"
                  label="시작시간"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
                <TextField
                  type="time"
                  label="종료시간"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
              </Stack>
            </Stack>
          </Box>
        );
      case 1: // 2단계: 기획서의 장소, 학생명단 [cite: 42, 43]
        return (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 2 }}
            >
              수업 장소와 참여 학생 명단을 입력하세요.
            </Typography>
            <Stack spacing={3}>
              <Box>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    label="역사나래 본원"
                    onClick={() => {}}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label="국립중앙박물관"
                    onClick={() => {}}
                    color="primary"
                    variant="outlined"
                  />
                </Stack>
                <TextField label="장소 (필수)" fullWidth required />
              </Box>
              <TextField
                label="학생명단 (선택)"
                placeholder="예: 김철수, 이영희, 박지성"
                multiline
                rows={2}
                fullWidth
              />
            </Stack>
          </Box>
        );
      case 2: // 3단계: 기획서의 수업명 + 노션 링크 [cite: 38]
        return (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 2 }}
            >
              지도안 링크를 넣으면 수업명이 자동으로 채워집니다.
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="지도안 링크 (노션 URL)"
                placeholder="https://notion.so/..."
                fullWidth
              />
              <Divider>또는</Divider>
              <TextField
                label="수업명 (필수)"
                placeholder="직접 입력 시 여기에 작성하세요"
                fullWidth
                required
              />
            </Stack>
          </Box>
        );
      case 3: // 4단계: 강사 선택
        return (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 2 }}
            >
              투입 가능한 강사 목록입니다.
            </Typography>
            <Stack spacing={2}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #eee",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold">
                  김철수 강사 (가용확인 완료)
                </Typography>
                <Button variant="contained" size="small">
                  선택
                </Button>
              </Box>
            </Stack>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        새 수업 생성
        {/* 기획서에 명시된 '이전 수업 복제' 버튼  */}
        <Tooltip title="가장 최근에 만든 수업 정보를 그대로 가져옵니다">
          <Button
            size="small"
            startIcon={<ContentCopyIcon />}
            variant="outlined"
            color="inherit"
          >
            이전 수업 복제
          </Button>
        </Tooltip>
      </DialogTitle>
      <DialogContent dividers sx={{ minHeight: 350 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="inherit">
          취소
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          이전
        </Button>
        {activeStep === steps.length - 1 ? (
          // 기획서에 명시된 '수업 생성' 버튼 [cite: 45]
          <Button variant="contained" onClick={handleClose}>
            수업 생성
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            다음
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
