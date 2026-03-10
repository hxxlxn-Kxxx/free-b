// src/lib/apiClient.ts
import { ApiError } from "./apiError";

// 백엔드 명세에는 API_URL이지만, 기존에 쓰시던 API_BASE_URL도 호환되게 함.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();

  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, { ...options, headers });

  // 에러 핸들링
  if (!response.ok) {
    // 401 (인증 만료/실패) 떨어지면 로그인 페이지로 강제 추방
    if (response.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    }

    // 백엔드가 주는 에러 메시지 파싱해서 ApiError로 던지기
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || "API 요청 중 에러가 발생했습니다.",
      errorData.code
    );
  }

  const data = await response.json();
  // 백엔드가 { data: ... } 형태로 감싸서 주면 알맹이만 빼고, 아니면 그냥 반환
  return data.data !== undefined ? data.data : data;
}

// 컴포넌트에서 가져다 쓸 실제 API 메서드들
export const apiClient = {
  // --- Auth ---
  getMe: () => request<any>("/auth/me"),

  // --- Lessons ---
  getLessons: (queryString: string = "") => 
    request<any>(`/lessons${queryString ? `?${queryString}` : ""}`),

  // --- Instructors (강사 DB) ---
  getInstructorById: (id: string) => request<any>(`/instructors/${id}`),

  // --- Contracts (뼈대) ---
  getContracts: () => request<any>("/contracts"),

  // --- Attendance (뼈대) ---
  getAttendances: () => request<any>("/attendances"),

  // --- Chat (뼈대) ---
  getChatRooms: () => request<any>("/chat/rooms"),
};