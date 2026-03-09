"use client";

import { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import SurfaceCard from "@/src/components/admin/SurfaceCard";
import AtomBadge from "@/src/components/atoms/AtomBadge";
import AtomButton from "@/src/components/atoms/AtomButton";
import AtomInput from "@/src/components/atoms/AtomInput";

interface AssignmentModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = ["날짜/시간", "장소 및 지도안", "강사 배정"];

const convertToUTCISO8601 = (date: string, time: string): string => {
  if (!date || !time) return "";
  return `${date}T${time}:00Z`;
};

const START_TIME_OPTIONS = Array.from({ length: (22 - 8) * 2 + 1 }, (_, index) => {
  const hours = 8 + Math.floor(index / 2);
  const minutes = index % 2 === 0 ? "00" : "30";
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
});

const END_TIME_OPTIONS = Array.from({ length: (24 - 8) * 2 + 1 }, (_, index) => {
  const hours = 8 + Math.floor(index / 2);
  const minutes = index % 2 === 0 ? "00" : "30";
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
});

const suggestedLocations = ["국립중앙박물관", "국립경주박물관"];

const mockInstructors = [
  {
    id: "inst_1",
    name: "강혜린",
    status: "가용확인 완료",
    match: "98%",
    tone: "confirmed",
  },
  {
    id: "inst_2",
    name: "김용관",
    status: "스케줄 확인 필요",
    match: "85%",
    tone: "requested",
  },
  {
    id: "inst_3",
    name: "박지혁",
    status: "긴급 대강 가능",
    match: "70%",
    tone: "sent",
  },
];

export default function AssignmentModal({ open, onClose }: AssignmentModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [lessonDate, setLessonDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");
  const [location, setLocation] = useState("");
  const [guideUrl, setGuideUrl] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);

    if (!value) {
      setEndTime("");
      return;
    }

    const [hourString, minuteString] = value.split(":");
    const nextHour = (parseInt(hourString, 10) + 2) % 24;
    setEndTime(`${nextHour.toString().padStart(2, "0")}:${minuteString}`);
  };

  const resetState = () => {
    setActiveStep(0);
    setLessonDate("");
    setStartTime("09:00");
    setEndTime("11:00");
    setLocation("");
    setGuideUrl("");
    setSelectedInstructor("");
  };

  const handleCloseModal = () => {
    resetState();
    onClose();
  };

  const handleCreateLesson = () => {
    const lessonData = {
      startsAt: convertToUTCISO8601(lessonDate, startTime),
      endsAt: convertToUTCISO8601(lessonDate, endTime),
      location,
      guideUrl,
      instructorId: selectedInstructor,
    };

    console.log("수업 생성 데이터 (UTC ISO 8601):", lessonData);
    handleCloseModal();
  };

  const renderStepPills = () => (
    <Stack direction="row" spacing={1.25} sx={{ mb: 4, flexWrap: "wrap" }}>
      {steps.map((label, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <Box
            key={label}
            sx={{
              px: 2,
              py: 1,
              borderRadius: "16px 0 16px 16px",
              border: "1px solid #EFD9A2",
              backgroundColor: isActive ? "#FFF0C2" : isCompleted ? "#FBF7ED" : "#FFFFFF",
              color: "#251B10",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {index + 1}. {label}
          </Box>
        );
      })}
    </Stack>
  );

  const renderDateStep = () => (
    <Stack spacing={2.5}>
      <Typography variant="subtitle2" color="text.secondary">
        수업 일정을 선택해주세요.
      </Typography>
      <AtomInput
        type="date"
        label="날짜"
        value={lessonDate}
        onChange={(event) => setLessonDate(event.target.value)}
        fullWidth
        required
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <AtomInput
          select
          label="시작시간"
          value={startTime}
          onChange={(event) => handleStartTimeChange(event.target.value)}
          fullWidth
          required
        >
          {START_TIME_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </AtomInput>
        <AtomInput
          select
          label="종료시간"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
          fullWidth
          required
        >
          {END_TIME_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option === "24:00" ? "24:00 (자정)" : option}
            </MenuItem>
          ))}
        </AtomInput>
      </Stack>
      {lessonDate && startTime && endTime ? (
        <SurfaceCard sx={{ p: 2.5, backgroundColor: "#FFFCF5", boxShadow: "none" }}>
          <Typography variant="caption" color="text.secondary">
            UTC ISO 8601 형식
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontFamily: "monospace" }}>
            시작: {convertToUTCISO8601(lessonDate, startTime)}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
            종료: {convertToUTCISO8601(lessonDate, endTime)}
          </Typography>
        </SurfaceCard>
      ) : null}
    </Stack>
  );

  const renderLocationStep = () => (
    <Stack spacing={2.5}>
      <Typography variant="subtitle2" color="text.secondary">
        수업 장소와 진행할 지도안 링크를 입력하세요.
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        {suggestedLocations.map((item) => (
          <AtomButton
            key={item}
            atomVariant={location === item ? "secondary" : "outline"}
            size="small"
            onClick={() => setLocation(item)}
          >
            {item}
          </AtomButton>
        ))}
      </Stack>
      <AtomInput
        label="장소"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="직접 입력하거나 위 추천 장소를 선택하세요"
        fullWidth
        required
      />
      <Divider />
      <AtomInput
        label="지도안 링크 (노션 URL)"
        value={guideUrl}
        onChange={(event) => setGuideUrl(event.target.value)}
        placeholder="https://notion.so/..."
        fullWidth
      />
    </Stack>
  );

  const renderInstructorStep = () => (
    <Stack spacing={2}>
      <Typography variant="subtitle2" color="text.secondary">
        해당 일정과 장소에 투입 가능한 강사 목록입니다.
      </Typography>
      {mockInstructors.map((instructor) => {
        const isSelected = selectedInstructor === instructor.id;

        return (
          <SurfaceCard
            key={instructor.id}
            sx={{
              p: 2.5,
              borderRadius: "18px 0 18px 18px",
              backgroundColor: isSelected ? "#FFF8E1" : "#FFFFFF",
              borderColor: isSelected ? "#D8B457" : "divider",
              boxShadow: "none",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
                  <Typography variant="subtitle2">{instructor.name} 강사</Typography>
                  <AtomBadge tone={instructor.tone} label={instructor.status} />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  적합도 {instructor.match} · 최근 응답 및 가용 스케줄 기준
                </Typography>
              </Box>
              <AtomButton
                atomVariant={isSelected ? "secondary" : "outline"}
                size="small"
                onClick={() => setSelectedInstructor(isSelected ? "" : instructor.id)}
              >
                {isSelected ? "선택됨" : "선택"}
              </AtomButton>
            </Stack>
          </SurfaceCard>
        );
      })}
    </Stack>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderDateStep();
      case 1:
        return renderLocationStep();
      case 2:
        return renderInstructorStep();
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "28px 0 28px 28px",
          overflow: "hidden",
          backgroundColor: "#FFF9EF",
        },
      }}
    >
      <DialogTitle
        component="div"
        sx={{
          px: 4,
          py: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #EBDDC3",
        }}
      >
        <Typography variant="h4" component="div">
          새 수업 생성
        </Typography>
        <Tooltip title="가장 최근에 만든 수업 정보를 그대로 가져옵니다">
          <Box>
            <AtomButton atomVariant="outline" size="small" startIcon={<ContentCopyIcon />}>
              이전 수업 복제
            </AtomButton>
          </Box>
        </Tooltip>
      </DialogTitle>

      <DialogContent sx={{ px: 4, py: 3.5 }}>
        {renderStepPills()}
        {renderStepContent()}
      </DialogContent>

      <DialogActions sx={{ px: 4, py: 3, borderTop: "1px solid #EBDDC3" }}>
        <AtomButton atomVariant="ghost" onClick={handleCloseModal}>
          취소
        </AtomButton>
        <Box sx={{ flexGrow: 1 }} />
        <AtomButton atomVariant="outline" disabled={activeStep === 0} onClick={() => setActiveStep((prev) => prev - 1)}>
          이전
        </AtomButton>
        {activeStep === steps.length - 1 ? (
          <AtomButton onClick={handleCreateLesson}>수업 생성</AtomButton>
        ) : (
          <AtomButton onClick={() => setActiveStep((prev) => prev + 1)}>다음</AtomButton>
        )}
      </DialogActions>
    </Dialog>
  );
}
