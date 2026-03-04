// app/(admin)/dashboard/page.tsx
"use client";

import React from "react";
import { Grid, Typography, Paper, Stack, Box } from "@mui/material";
// 상대경로를 사용하는 경우
import StatCard from "../../../src/components/StatCard";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";
import AssignmentModal from "../../../src/components/AssignmentModal";
import { Button } from "@mui/material";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#1e293b" }}>
          종합 대시보드
        </Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          + 새 수업 배정
        </Button>
      </Box>

      {/* 1. 상단 요약 카드 섹션 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* 구버전: <Grid item xs={12} sm={6} md={3}> */}
        {/* 신버전: 아래처럼 size 속성으로 묶어줍니다! */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="오늘 수업"
            value="12건"
            subValue="어제 대비 15% 증가"
            progress={70}
            color="#6366f1"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="미확정 일정"
            value="5건"
            subValue="긴급 확인 필요"
            progress={40}
            color="#f59e0b"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="체크인 경고"
            value="2건"
            subValue="미체크인 강사 존재"
            progress={20}
            color="#ef4444"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="계약 만료"
            value="3건"
            subValue="이번 달 만료 예정"
            progress={80}
            color="#8b5cf6"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* 2. 중앙 캘린더 (가로 8칸 차지) */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              height: 650,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              월간 배정 현황
            </Typography>
            <FullCalendar
              plugins={[daygridPlugin]}
              initialView="dayGridMonth"
              height="100%"
              locale="ko"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth",
              }}
            />
          </Paper>
        </Grid>

        {/* 3. 우측 실시간 피드 및 AI 추천 (가로 4칸 차지) */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Live 체크인
              </Typography>
              <Typography variant="body2" color="textSecondary">
                강남역 지점 - 김철수 도착 (10:05)
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                홍대 지점 - 이영희 도착 (09:55)
              </Typography>
            </Paper>
            <Paper
              sx={{ p: 3, borderRadius: 4, bgcolor: "#1e293b", color: "white" }}
            >
              <Typography variant="h6" fontWeight="bold">
                AI 대강 추천
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                수학 강의에 '이영희' 강사 추천 (적합도 98%)
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
      <AssignmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}
