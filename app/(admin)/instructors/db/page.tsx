"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box, MenuItem, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, CircularProgress, Typography,
  TableSortLabel
} from "@mui/material";
import { Add, Search, UploadFile } from "@mui/icons-material";

import FilterBar from "@/src/components/admin/FilterBar";
import PageHeader from "@/src/components/admin/PageHeader";
import SurfaceCard from "@/src/components/admin/SurfaceCard";
import AtomButton from "@/src/components/atoms/AtomButton";
import AtomInput from "@/src/components/atoms/AtomInput";
import { apiClient } from "@/src/lib/apiClient";

const LEVEL_OPTIONS = ["전체", "주니어", "시니어", "마스터"];

type InstructorRow = {
  instructorId: string;
  name: string;
  phone: string | null;
  residenceArea: string | null;
  majorField: string | null;
  isActive: boolean;
};

export default function InstructorDBPage() {
  const router = useRouter();
  
  const [filterRegion, setFilterRegion] = useState("");
  const [regionInput, setRegionInput] = useState("");
  const [filterMajor, setFilterMajor] = useState("");
  const [majorInput, setMajorInput] = useState("");
  const [filterName, setFilterName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filterLevel, setFilterLevel] = useState("전체");
  const [instructors, setInstructors] = useState<InstructorRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");

  useEffect(() => {
    const fetchInstructors = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.getInstructors();
        const data = response.data || response;
        
        setInstructors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("강사 목록 DB 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  // ── 데바운싱 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterName(searchInput);
      setFilterRegion(regionInput);
      setFilterMajor(majorInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, regionInput, majorInput]);

  const handleReset = () => {
    setSearchInput("");
    setRegionInput("");
    setMajorInput("");
    setFilterName("");
    setFilterRegion("");
    setFilterMajor("");
    setFilterLevel("전체");
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredInstructors = instructors.filter((ins) => {
    const nameMatch = !filterName || ins.name.includes(filterName);
    const regionMatch = !filterRegion || (ins.residenceArea ?? "").includes(filterRegion);
    const majorMatch = !filterMajor || (ins.majorField ?? "").includes(filterMajor);
    // 레벨은 현재 데이터 스키마에 명시적으로 없으므로 일단 스킵하거나 추가 로직 필요 (필요시 데이터 모델에 맞춰 수정)
    return nameMatch && regionMatch && majorMatch;
  });

  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    let aValue = a[orderBy as keyof InstructorRow] ?? "";
    let bValue = b[orderBy as keyof InstructorRow] ?? "";

    if (bValue < aValue) {
      return order === "desc" ? -1 : 1;
    }
    if (bValue > aValue) {
      return order === "desc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box>
      <PageHeader
        title="전체 강사 DB"
        action={
          <Stack direction="row" spacing={1}>
            <AtomButton atomVariant="outline" startIcon={<UploadFile />}>엑셀 업로드</AtomButton>
            <AtomButton startIcon={<Add />}>강사 추가</AtomButton>
          </Stack>
        }
      />

      <FilterBar>
        <AtomInput label="강사명" placeholder="이름 입력" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} size="small" sx={{ flex: 1 }} />
        <AtomInput label="거주지역" placeholder="예: 경기" value={regionInput} onChange={(e) => setRegionInput(e.target.value)} size="small" sx={{ flex: 1 }} />
        <AtomInput label="전공" placeholder="예: 컴퓨터공학" value={majorInput} onChange={(e) => setMajorInput(e.target.value)} size="small" sx={{ flex: 1 }} />
        <AtomInput select label="레벨" value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} size="small" sx={{ flex: 1 }}>
          {LEVEL_OPTIONS.map((opt) => (<MenuItem key={opt} value={opt}>{opt}</MenuItem>))}
        </AtomInput>
        <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
          <AtomButton atomVariant="outline" onClick={handleReset}>초기화</AtomButton>
          <AtomButton 
            startIcon={<Search />}
            onClick={() => {
              setFilterName(searchInput);
              setFilterRegion(regionInput);
              setFilterMajor(majorInput);
            }}
          >
            검색
          </AtomButton>
        </Stack>
      </FilterBar>

      <TableContainer component={SurfaceCard}>
        <Table>
          <TableHead sx={{ bgcolor: "#FBF7ED" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                  sx={{ pl: "26px" }}
                >
                  이름
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === "isActive"}
                  direction={orderBy === "isActive" ? order : "asc"}
                  onClick={() => handleRequestSort("isActive")}
                  sx={{ pl: "26px" }}
                >
                  상태
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === "phone"}
                  direction={orderBy === "phone" ? order : "asc"}
                  onClick={() => handleRequestSort("phone")}
                  sx={{ pl: "26px" }}
                >
                  연락처
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === "residenceArea"}
                  direction={orderBy === "residenceArea" ? order : "asc"}
                  onClick={() => handleRequestSort("residenceArea")}
                  sx={{ pl: "26px" }}
                >
                  거주지역
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === "majorField"}
                  direction={orderBy === "majorField" ? order : "asc"}
                  onClick={() => handleRequestSort("majorField")}
                  sx={{ pl: "26px" }}
                >
                  전공
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>상세</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  <CircularProgress />
                  <Typography color="textSecondary" sx={{ mt: 2 }}>DB에서 강사 데이터를 불러오는 중입니다...</Typography>
                </TableCell>
              </TableRow>
            ) : sortedInstructors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  <Typography color="textSecondary">조건에 맞는 강사가 없습니다.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedInstructors.map((instructor) => (
                <TableRow key={instructor.instructorId} hover>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>{instructor.name}</TableCell>
                  <TableCell align="center">{instructor.isActive ? "활동 중" : "비활동"}</TableCell>
                  <TableCell align="center">{instructor.phone || "미등록"}</TableCell>
                  <TableCell align="center">{instructor.residenceArea || "미등록"}</TableCell>
                  <TableCell align="center">{instructor.majorField || "미등록"}</TableCell>
                  <TableCell align="center">
                    <AtomButton atomVariant="outline" size="small" onClick={() => router.push(`/instructors/db/${instructor.instructorId}`)}>
                      보기
                    </AtomButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}