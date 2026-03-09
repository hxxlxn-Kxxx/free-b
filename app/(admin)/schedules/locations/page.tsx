"use client";

import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add, LocationOn, Search } from "@mui/icons-material";

import FilterBar from "@/src/components/admin/FilterBar";
import PageHeader from "@/src/components/admin/PageHeader";
import SurfaceCard from "@/src/components/admin/SurfaceCard";
import AtomBadge from "@/src/components/atoms/AtomBadge";
import AtomButton from "@/src/components/atoms/AtomButton";
import AtomInput from "@/src/components/atoms/AtomInput";

const LOCATION_STATUS_MAP: Record<string, string> = {
  ACTIVE: "운영중",
  INACTIVE: "계약 종료",
  MAINTENANCE: "공사/휴관",
};

const LOCATION_TONE_MAP: Record<string, string> = {
  ACTIVE: "confirmed",
  INACTIVE: "cancelled",
  MAINTENANCE: "requested",
};

const MOCK_LOCATIONS = [
  {
    locationId: "LOC_001",
    locationName: "송파청소년수련관",
    address: "서울시 송파구 중대로 4길",
    contactPerson: "김담당 주임 (02-123-4567)",
    guideNotionUrl: "https://notion.so/songpa-guide",
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

const formatUtcToLocalDateOnly = (utcString: string) => new Date(utcString).toLocaleDateString("ko-KR");

export default function LocationManagementPage() {
  const [filterName, setFilterName] = useState("");

  return (
    <Box>
      <PageHeader
        title="수업지(장소) 관리"
        description="장소 정보와 가이드 문서를 같은 구조 안에서 관리합니다."
        action={<AtomButton startIcon={<Add />}>새 장소 등록</AtomButton>}
      />

      <FilterBar>
        <AtomInput
          label="장소명 또는 주소 검색"
          size="small"
          sx={{ flexGrow: 1, maxWidth: 420 }}
          value={filterName}
          onChange={(event) => setFilterName(event.target.value)}
        />
        <AtomButton startIcon={<Search />}>검색</AtomButton>
      </FilterBar>

      <TableContainer component={SurfaceCard}>
        <Table>
          <TableHead sx={{ bgcolor: "#FBF7ED" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                장소명
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                주소
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                담당자 연락처
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                강사 가이드
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                등록일
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                상태
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                수정
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_LOCATIONS.map((row) => (
              <TableRow key={row.locationId} hover>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.75,
                    }}
                  >
                    <LocationOn sx={{ fontSize: 18, color: "#B7791F" }} />
                    {row.locationName}
                  </Box>
                </TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.contactPerson}</TableCell>
                <TableCell align="center">
                  <AtomButton
                    atomVariant="ghost"
                    size="small"
                    href={row.guideNotionUrl}
                    target="_blank"
                  >
                    가이드 보기
                  </AtomButton>
                </TableCell>
                <TableCell align="center">{formatUtcToLocalDateOnly(row.createdAt)}</TableCell>
                <TableCell align="center">
                  <AtomBadge
                    tone={LOCATION_TONE_MAP[row.locationStatus]}
                    label={LOCATION_STATUS_MAP[row.locationStatus]}
                  />
                </TableCell>
                <TableCell align="center">
                  <AtomButton atomVariant="outline" size="small">
                    관리
                  </AtomButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
