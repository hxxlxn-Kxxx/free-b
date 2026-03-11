"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem,
  CircularProgress, Alert, InputLabel, FormControl, Select, Typography, Stack
} from "@mui/material";
import { Add, LocationOn, Search, Edit } from "@mui/icons-material";

import FilterBar from "@/src/components/admin/FilterBar";
import PageHeader from "@/src/components/admin/PageHeader";
import SurfaceCard from "@/src/components/admin/SurfaceCard";
import AtomBadge from "@/src/components/atoms/AtomBadge";
import AtomButton from "@/src/components/atoms/AtomButton";
import AtomInput from "@/src/components/atoms/AtomInput";

import { apiClient } from "@/src/lib/apiClient";

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

const formatUtcToLocalDateOnly = (utcString: string) => new Date(utcString).toLocaleDateString("ko-KR");

type LocationDto = {
  locationId: string;
  locationName: string;
  address: string;
  contactPerson: string | null;
  guideNotionUrl: string | null;
  locationStatus: string;
  createdAt: string;
};

export default function LocationManagementPage() {
  const [locations, setLocations] = useState<LocationDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [filterQuery, setFilterQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    locationName: "",
    address: "",
    contactPerson: "",
    guideNotionUrl: "",
    locationStatus: "ACTIVE",
  });

  const fetchLocations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.getLessonLocations({
        query: filterQuery || undefined,
        status: filterStatus === "ALL" ? undefined : filterStatus,
      });
      setLocations(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      setError(err.message || "장소 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [filterQuery, filterStatus]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleSearchClick = () => {
    setFilterQuery(searchInput);
  };

  const handleOpenModal = (loc?: LocationDto) => {
    if (loc) {
      setEditingId(loc.locationId);
      setFormData({
        locationName: loc.locationName,
        address: loc.address,
        contactPerson: loc.contactPerson || "",
        guideNotionUrl: loc.guideNotionUrl || "",
        locationStatus: loc.locationStatus,
      });
    } else {
      setEditingId(null);
      setFormData({
        locationName: "",
        address: "",
        contactPerson: "",
        guideNotionUrl: "",
        locationStatus: "ACTIVE",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.locationName || !formData.address) {
      return alert("장소명과 주소는 필수 입력 사항입니다.");
    }

    setIsSubmitting(true);
    try {
      const payload = {
        locationName: formData.locationName,
        address: formData.address,
        contactPerson: formData.contactPerson || null,
        guideNotionUrl: formData.guideNotionUrl || null,
        locationStatus: formData.locationStatus,
      };

      if (editingId) {
        await apiClient.updateLessonLocation(editingId, payload);
        alert("장소 정보가 성공적으로 수정되었습니다.");
      } else {
        await apiClient.createLessonLocation(payload);
        alert("새 장소가 성공적으로 등록되었습니다.");
      }
      setIsModalOpen(false);
      fetchLocations();
    } catch (err: any) {
      alert(`저장 실패: ${err.message || "알 수 없는 오류"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <PageHeader
        title="수업지(장소) 관리"
        description="장소 정보와 가이드 문서를 같은 구조 안에서 관리합니다."
        action={
          <AtomButton startIcon={<Add />} onClick={() => handleOpenModal()}>
            새 장소 등록
          </AtomButton>
        }
      />

      <FilterBar>
        <AtomInput
          label="장소명 또는 주소 검색"
          size="small"
          sx={{ flexGrow: 1, maxWidth: 360 }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>운영 상태</InputLabel>
          <Select
            label="운영 상태"
            name="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as string)}
          >
            <MenuItem value="ALL">전체 상태</MenuItem>
            <MenuItem value="ACTIVE">운영중</MenuItem>
            <MenuItem value="MAINTENANCE">공사/휴관</MenuItem>
            <MenuItem value="INACTIVE">계약 종료</MenuItem>
          </Select>
        </FormControl>
        <AtomButton startIcon={<Search />} onClick={handleSearchClick}>
          검색
        </AtomButton>
      </FilterBar>

      <TableContainer component={SurfaceCard}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={8} flexDirection="column" gap={2}>
            <CircularProgress size={32} />
            <Typography color="text.secondary">목록을 불러오는 중입니다...</Typography>
          </Box>
        ) : error ? (
          <Box p={4} textAlign="center">
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : locations.length === 0 ? (
          <Box textAlign="center" py={8} bgcolor="#fcfcfc">
            <Typography color="text.secondary" mb={1}>조회된 수업 장소가 없습니다.</Typography>
            <Typography variant="body2" color="text.secondary">{"'새 장소 등록' 버튼을 눌러 장소를 추가해주세요."}</Typography>
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "#FBF7ED" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 700 }}>장소명</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>주소</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>담당자 연락처</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>강사 가이드</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>등록일</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>상태</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>기능</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((row) => (
                <TableRow key={row.locationId} hover>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75 }}>
                      <LocationOn sx={{ fontSize: 18, color: row.locationStatus === "ACTIVE" ? "#B7791F" : "#9E9E9E" }} />
                      {row.locationName}
                    </Box>
                  </TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.contactPerson || "-"}</TableCell>
                  <TableCell align="center">
                    {row.guideNotionUrl ? (
                      <AtomButton atomVariant="ghost" size="small" href={row.guideNotionUrl} target="_blank">
                        가이드 보기
                      </AtomButton>
                    ) : (
                      <Typography variant="body2" color="text.secondary">-</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">{formatUtcToLocalDateOnly(row.createdAt)}</TableCell>
                  <TableCell align="center">
                    <AtomBadge
                      tone={LOCATION_TONE_MAP[row.locationStatus] || "neutral"}
                      label={LOCATION_STATUS_MAP[row.locationStatus] || row.locationStatus}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <AtomButton atomVariant="outline" size="small" startIcon={<Edit />} onClick={() => handleOpenModal(row)}>
                      상세·수정
                    </AtomButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* 등록/수정 모달 */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle fontWeight="bold">{editingId ? "수업지(장소) 상세/수정" : "새 장소 등록"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <TextField
              label="장소명 (*필수)"
              name="locationName"
              value={formData.locationName}
              onChange={handleFormChange}
              fullWidth
              size="small"
              placeholder="예: 송파청소년수련관"
            />
            <TextField
              label="상세 주소 (*필수)"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              fullWidth
              size="small"
              placeholder="예: 서울시 송파구 중대로 4길"
            />
            <TextField
              label="담당자 이름 및 연락처"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleFormChange}
              fullWidth
              size="small"
              placeholder="예: 김담당 주임 (02-123-4567)"
            />
            <TextField
              label="강사 가이드 Notion URL"
              name="guideNotionUrl"
              value={formData.guideNotionUrl}
              onChange={handleFormChange}
              fullWidth
              size="small"
              placeholder="https://notion.so/..."
            />
            <FormControl fullWidth size="small">
              <InputLabel>운영 상태</InputLabel>
              <Select
                label="운영 상태"
                name="locationStatus"
                value={formData.locationStatus}
                onChange={(e) => setFormData(p => ({ ...p, locationStatus: e.target.value as string }))}
              >
                <MenuItem value="ACTIVE">운영중</MenuItem>
                <MenuItem value="MAINTENANCE">공사/휴관</MenuItem>
                <MenuItem value="INACTIVE">계약 종료</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <AtomButton atomVariant="ghost" onClick={handleCloseModal} disabled={isSubmitting}>
            취소
          </AtomButton>
          <AtomButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : "저장하기"}
          </AtomButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
