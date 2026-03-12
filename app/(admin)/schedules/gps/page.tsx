"use client";

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { 
  Box, 
  Grid, 
  Stack, 
  Typography, 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  MyLocation, 
  Search, 
  Refresh, 
  WarningAmber, 
  CheckCircleOutline,
  DirectionsRun,
  Login,
  Flag,
  InfoOutlined,
  ArrowForwardIos
} from '@mui/icons-material';
import { apiClient } from '@/src/lib/apiClient';
import { LessonGpsStatus } from '@/src/types/backend';
import PageHeader from '@/src/components/admin/PageHeader';
import SurfaceCard from '@/src/components/admin/SurfaceCard';
import FilterBar from '@/src/components/admin/FilterBar';
import AtomButton from '@/src/components/atoms/AtomButton';
import AtomInput from '@/src/components/atoms/AtomInput';
import AtomBadge from '@/src/components/atoms/AtomBadge';

export default function GpsMonitoringPage() {
  const router = useRouter();
  const [filterQuery, setFilterQuery] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const { data: gpsStatusList = [], isLoading, refetch, isFetching } = useQuery<LessonGpsStatus[]>({
    queryKey: ['gpsStatus', today],
    queryFn: () => apiClient.getGpsStatus(today),
    refetchInterval: 60000, // 1분마다 자동 갱신
  });

  // 통계 계산
  const stats = useMemo(() => {
    if (!Array.isArray(gpsStatusList)) return { total: 0, departed: 0, arrived: 0, finished: 0, suspicious: 0, risk: 0 };
    return {
      total: gpsStatusList.length,
      departed: gpsStatusList.filter(g => g.departed).length,
      arrived: gpsStatusList.filter(g => g.arrived).length,
      finished: gpsStatusList.filter(g => g.finished).length,
      suspicious: gpsStatusList.filter(g => g.suspicious).length,
      risk: gpsStatusList.filter(g => g.commuteRiskDetected || g.delayedFinish).length,
    };
  }, [gpsStatusList]);

  // 필터링 필터 구현
  const filteredList = useMemo(() => {
    if (!filterQuery) return gpsStatusList;
    const lowerQuery = filterQuery.toLowerCase();
    return gpsStatusList.filter(g => 
      g.lectureTitle.toLowerCase().includes(lowerQuery) || 
      g.instructorName.toLowerCase().includes(lowerQuery)
    );
  }, [gpsStatusList, filterQuery]);

  const formatTime = (isoString?: string) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleTimeString('ko-KR', {
      hour: '2-digit', minute: '2-digit', hour12: false
    });
  };

  return (
    <Box>
      <PageHeader
        title="실시간 GPS 모니터링"
        action={
          <AtomButton
            atomVariant="outline"
            startIcon={<Refresh className={isFetching ? 'animate-spin' : ''} />}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            데이터 갱신
          </AtomButton>
        }
      />
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: -3, mb: 4 }}>
        금일({today}) 진행되는 모든 수업의 위치 및 출결 상태를 실시간으로 모니터링합니다.
      </Typography>

      {/* 요약 카드 영역 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SummaryCard title="전체 수업" value={stats.total} icon={<Flag color="action" />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SummaryCard title="출발 완료" value={stats.departed} color="#E3F2FD" icon={<DirectionsRun sx={{ color: '#1565C0' }} />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SummaryCard title="도착 완료" value={stats.arrived} color="#E8F5E9" icon={<Login sx={{ color: '#2E7D32' }} />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SummaryCard title="수업 종료" value={stats.finished} color="#F3E5F5" icon={<CheckCircleOutline sx={{ color: '#7B1FA2' }} />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SummaryCard title="의심/리스크" value={stats.suspicious + stats.risk} color="#FFF5F5" icon={<WarningAmber sx={{ color: '#E53E3E' }} />} highlight />
        </Grid>
      </Grid>

      <FilterBar>
        <AtomInput
          placeholder="강사명 또는 수업명 검색"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          size="small"
          sx={{ width: 320 }}
          slotProps={{
            input: {
              startAdornment: (
                <Search fontSize="small" color="action" sx={{ mr: 1 }} />
              ),
            }
          }}
        />
        <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
          <AtomButton 
            atomVariant="outline" 
            onClick={() => setFilterQuery('')}
            sx={{ minWidth: 80 }}
          >
            초기화
          </AtomButton>
        </Stack>
      </FilterBar>

      <TableContainer component={SurfaceCard}>

        {isLoading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress size={40} />
          </Box>
        ) : (
            <Table sx={{ minWidth: 800 }}>
              <TableHead sx={{ bgcolor: '#FBF7ED' }}>
                <TableRow sx={{ '& th': { whiteSpace: 'nowrap', fontWeight: 700 } }}>
                  <TableCell align="center">수업 정보</TableCell>
                  <TableCell align="center">강사</TableCell>
                  <TableCell align="center">수업 시간</TableCell>
                  <TableCell align="center">GPS 시퀀스</TableCell>
                  <TableCell align="center">리스크 현황</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                      <Typography variant="body2" color="text.secondary">조회된 모니터링 데이터가 없습니다.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredList.map((g: LessonGpsStatus) => (
                    <TableRow 
                      key={g.lessonId} 
                      hover 
                      sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#F9FAFB' } }}
                      onClick={() => router.push(`/schedules/lessons/${g.lessonId}`)}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">{g.lectureTitle}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{g.instructorName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {formatTime(g.startsAt)} ~ {formatTime(g.endsAt)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <StatusIndicator label="출발" active={g.departed} time={formatTime(g.departedAt)} />
                          <StatusIndicator label="도착" active={g.arrived} time={formatTime(g.arrivedAt)} />
                          <StatusIndicator label="종료" active={g.finished} time={formatTime(g.finishedAt)} />
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          {g.suspicious && <AtomBadge tone="rejected" label="위치 의심" />}
                          {g.commuteRiskDetected && <AtomBadge tone="late" label="지각 위험" />}
                          {g.delayedFinish && <AtomBadge tone="requested" label="지연 종료" />}
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <ArrowForwardIos sx={{ fontSize: 14 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
        )}
      </TableContainer>

      {/* 정책 안내 */}
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
        <InfoOutlined sx={{ fontSize: 16 }} />
        <Typography variant="caption">
          GPS 모니터링 데이터는 강사의 위치 정보를 기반으로 백엔드에서 실시간 검증(250m 반경, GPS 정확도 등)을 거쳐 집계됩니다.
        </Typography>
      </Box>
    </Box>
  );
}

// ── 보조 컴포넌트

function SummaryCard({ title, value, icon, color, highlight }: { title: string; value: number; icon: any; color?: string; highlight?: boolean }) {
  return (
    <SurfaceCard 
      sx={{ 
        p: '20px !important',
        bgcolor: color || 'white', 
        border: highlight ? '2px solid #B24231' : '1px solid #EFD9A2',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: highlight ? '0 4px 12px rgba(178, 66, 49, 0.1)' : 'none'
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" gutterBottom sx={{ fontWeight: 700, letterSpacing: '0.02em', mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="800" sx={{ color: highlight ? '#B24231' : '#251B10' }}>
            {value}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            p: 1.25, 
            bgcolor: highlight ? 'rgba(178, 66, 49, 0.08)' : 'rgba(239, 217, 162, 0.15)', 
            borderRadius: '12px 0 12px 12px',
            color: highlight ? '#B24231' : '#B7791F'
          }}
        >
          {icon}
        </Box>
      </Stack>
    </SurfaceCard>
  );
}

function StatusIndicator({ label, active, time }: { label: string; active: boolean; time?: string }) {
  const getColors = () => {
    if (!active) return { bg: 'transparent', border: '#EFD9A2', text: '#A2907E', op: 0.4 };
    switch(label) {
      case '출발': return { bg: '#E3F2FD', border: '#90CAF9', text: '#1565C0', op: 1 };
      case '도착': return { bg: '#EAF7F0', border: '#A5D6A7', text: '#2F6B2F', op: 1 };
      case '종료': return { bg: '#F3ECFA', border: '#CE93D8', text: '#7C5C99', op: 1 };
      default: return { bg: '#F5EFE2', border: '#EFD9A2', text: '#5F5445', op: 1 };
    }
  };

  const colors = getColors();

  return (
    <Box 
      sx={{ 
        px: 1.25, py: 0.75, 
        borderRadius: '8px 0 8px 8px', 
        border: '1px solid', 
        borderColor: colors.border,
        bgcolor: colors.bg,
        opacity: colors.op,
        minWidth: 60,
        textAlign: 'center',
        transition: 'all 0.2s'
      }}
    >
      <Typography variant="caption" display="block" sx={{ fontWeight: 800, color: colors.text, fontSize: '0.7rem' }}>
        {label}
      </Typography>
      {active && time !== '-' && (
        <Typography variant="caption" sx={{ fontSize: '0.6rem', fontWeight: 600, color: colors.text }}>{time}</Typography>
      )}
    </Box>
  );
}
