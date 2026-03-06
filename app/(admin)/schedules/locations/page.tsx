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
} from "@mui/material";
import { Add, Search, LocationOn } from "@mui/icons-material";

const LOCATION_STATUS_MAP: Record<string, string> = {
  ACTIVE: "운영중",
  INACTIVE: "계약 종료",
  MAINTENANCE: "공사/휴관",
};

const MOCK_LOCATIONS = [
  {
    locationId: "LOC_001",
    locationName: "송파청소년수련관",
    address: "서울시 송파구 중대로 4길",
    contactPerson: "김담당 주임 (02-123-4567)",
    guideNotionUrl: "https://notion.so/songpa-guide", // 명세서 필드명 강제
    locationStatus: "ACTIVE",
    createdAt: "2025-11-20T00:00:00Z",
  },
  {
    locationId: "LOC_002",
    locationName: "롯데월드 민속박물관",
    address: "서울시 송파구 올림픽로 240",
    contactPerson: "이학예사 (02-987-6543)",
    guideNotionUrl: "https://notion.so/lotte-guide",
    locationStatus: "ACTIVE",
    createdAt: "2026-01-15T00:00:00Z",
  },
];

const formatUtcToLocalDateOnly = (utcString: string) => {
  return new Date(utcString).toLocaleDateString("ko-KR");
};

export default function LocationManagementPage() {
  const [filterName, setFilterName] = useState("");

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
          수업지(장소) 관리
        </Typography>
        <Button variant="contained" color="secondary" startIcon={<Add />}>
          새 장소 등록
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="장소명 또는 주소 검색"
            size="small"
            sx={{ flexGrow: 1, maxWidth: 400 }}
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
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
                장소명
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                주소
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                담당자 연락처
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                강사 가이드 (Notion)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                등록일
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                상태
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                수정
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_LOCATIONS.map((row) => (
              <TableRow key={row.locationId} hover>
                <TableCell align="center" sx={{ fontWeight: "medium" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    <LocationOn fontSize="small" color="action" />
                    {row.locationName}
                  </Box>
                </TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.contactPerson}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    href={row.guideNotionUrl}
                    target="_blank"
                  >
                    가이드 보기
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {formatUtcToLocalDateOnly(row.createdAt)}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={LOCATION_STATUS_MAP[row.locationStatus]}
                    color={
                      row.locationStatus === "ACTIVE" ? "success" : "default"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button size="small" variant="outlined" color="inherit">
                    관리
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
