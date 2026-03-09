"use client";

import React, { useState } from "react";
import {
  Box,
  Divider,
  FormControlLabel,
  InputAdornment,
  Stack,
  Switch,
  Tab,
  Tabs,
} from "@mui/material";
import { NotificationsActive, Person, Save, Tune } from "@mui/icons-material";

import AtomButton from "@/src/components/atoms/AtomButton";
import AtomInput from "@/src/components/atoms/AtomInput";
import PageHeader from "@/src/components/admin/PageHeader";
import SurfaceCard from "@/src/components/admin/SurfaceCard";

export default function SettingsPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [alerts, setAlerts] = useState({
    lateCheckIn: true,
    contractExpiry: true,
    newClassRequest: false,
    systemError: true,
  });

  const handleToggle = (key: keyof typeof alerts) => {
    setAlerts((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleSave = () => {
    alert("설정이 성공적으로 저장되었습니다!");
  };

  return (
    <Box sx={{ maxWidth: 960 }}>
      <PageHeader
        title="환경 설정"
        description="운영 기준, 알림 정책, 계정 관리 규칙을 한곳에서 조정합니다."
        action={
          <AtomButton startIcon={<Save />} onClick={handleSave}>
            변경사항 저장
          </AtomButton>
        }
      />

      <SurfaceCard sx={{ overflow: "hidden" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "#FBF7ED" }}>
          <Tabs value={tabIndex} onChange={(_, nextValue) => setTabIndex(nextValue)} variant="fullWidth">
            <Tab icon={<Tune />} iconPosition="start" label="운영 기본 설정" sx={{ py: 2 }} />
            <Tab icon={<NotificationsActive />} iconPosition="start" label="알림 설정" sx={{ py: 2 }} />
            <Tab icon={<Person />} iconPosition="start" label="내 계정 관리" sx={{ py: 2 }} />
          </Tabs>
        </Box>

        <Box sx={{ p: 4 }}>
          {tabIndex === 0 && (
            <Stack spacing={4}>
              <Box>
                <Box sx={{ fontWeight: 700, mb: 1 }}>강사 정산 및 계약 기준</Box>
                <Box sx={{ color: "text.secondary", fontSize: 14, lineHeight: 1.6, mb: 2 }}>
                  신규 강사 등록 시 기본으로 세팅되는 금액과 기준을 설정합니다.
                </Box>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                  <AtomInput
                    label="초기 기본 시급"
                    defaultValue="30,000"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">원</InputAdornment>,
                    }}
                    fullWidth
                  />
                  <AtomInput
                    label="계약 만료 알림 기준"
                    defaultValue="30"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">일 전</InputAdornment>,
                    }}
                    fullWidth
                  />
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Box sx={{ fontWeight: 700, mb: 2 }}>수업 및 체크인 기준</Box>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                  <AtomInput
                    label="도착 체크인 허용 반경"
                    defaultValue="50"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">m (미터)</InputAdornment>,
                    }}
                    fullWidth
                  />
                  <AtomInput label="지각 처리 기준" defaultValue="수업 시작 10분 전" fullWidth />
                </Stack>
              </Box>
            </Stack>
          )}

          {tabIndex === 1 && (
            <Stack spacing={2}>
              <Box sx={{ fontWeight: 700, mb: 1 }}>시스템 알림 (Push / Dashboard)</Box>

              {[
                {
                  key: "lateCheckIn",
                  title: "강사 현장 체크인 지각 알림",
                  description: "수업 시작 전까지 체크인하지 않은 경우 경고를 띄웁니다.",
                },
                {
                  key: "contractExpiry",
                  title: "전자계약 만료 임박 알림",
                  description: "강사의 계약 종료일이 다가오면 대시보드에 표시합니다.",
                },
                {
                  key: "newClassRequest",
                  title: "강사의 대강(대체강사) 요청 알림",
                  description: "강사가 앱에서 긴급 대강을 요청했을 때 알림을 받습니다.",
                },
                {
                  key: "systemError",
                  title: "시스템 오류 보고 알림",
                  description: "백엔드 장애 또는 서명 오류가 발생했을 때 관리자에게 전달합니다.",
                },
              ].map((item) => (
                <SurfaceCard
                  key={item.key}
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "none",
                  }}
                >
                  <Box>
                    <Box sx={{ fontWeight: 600 }}>{item.title}</Box>
                    <Box sx={{ fontSize: 14, color: "text.secondary", mt: 0.5 }}>
                      {item.description}
                    </Box>
                  </Box>
                  <Switch
                    checked={alerts[item.key as keyof typeof alerts]}
                    onChange={() => handleToggle(item.key as keyof typeof alerts)}
                    color="primary"
                  />
                </SurfaceCard>
              ))}
            </Stack>
          )}

          {tabIndex === 2 && (
            <Stack spacing={4}>
              <Box>
                <Box sx={{ fontWeight: 700, mb: 1 }}>관리자 프로필</Box>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mt: 2 }}>
                  <AtomInput label="이름" defaultValue="최고 관리자" fullWidth />
                  <AtomInput label="이메일 주소" defaultValue="admin@settly.com" fullWidth />
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Box sx={{ fontWeight: 700, mb: 2 }}>보안 설정</Box>
                <Stack spacing={2} sx={{ maxWidth: 480 }}>
                  <AtomInput label="현재 비밀번호" type="password" size="small" fullWidth />
                  <AtomInput label="새 비밀번호" type="password" size="small" fullWidth />
                  <AtomInput label="새 비밀번호 확인" type="password" size="small" fullWidth />
                  <FormControlLabel control={<Switch defaultChecked />} label="2단계 인증 활성화" />
                  <AtomButton atomVariant="outline" sx={{ alignSelf: "flex-start" }}>
                    비밀번호 변경
                  </AtomButton>
                </Stack>
              </Box>
            </Stack>
          )}
        </Box>
      </SurfaceCard>
    </Box>
  );
}
