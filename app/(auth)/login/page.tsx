"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  CssBaseline,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      router.push("/dashboard");
    } else {
      alert("이메일과 비밀번호를 입력해주세요!");
    }
  };

  return (
    // 전체 화면을 꽉 채우는 가장 바깥쪽 Box
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <CssBaseline />

      {/* 1. 왼쪽 브랜드 영역 (Flexbox 비율 1.5 차지 = 약 60%) */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" }, // 모바일에서는 숨기고 PC에서만 노출
          flex: 1.5,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497215728101-856f4ea42174)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(0,0,0,0.6)",
            p: 6,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h2" fontWeight="bold" sx={{ mb: 2 }}>
            SETTLY
          </Typography>
          <Typography variant="h5">
            스마트한 프리랜서 강사 관리 시스템
          </Typography>
        </Box>
      </Box>

      {/* 2. 오른쪽 로그인 폼 영역 (Flexbox 비율 1 차지 = 약 40%) */}
      <Box
        component={Paper}
        elevation={6}
        square
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            관리자 로그인
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleLogin}
            sx={{ width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              접속하기
            </Button>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ mt: 2 }}
            >
              © 2026 Settly Corp. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
