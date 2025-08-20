// lib/authApi.ts
import axios from "axios";
import { useAuthStore } from "../stores/AuthStore.ts";
import { BASE_URL } from "../types/Regex.ts";
import { isTokenExpired } from "./tokenUtils.ts"; // 만료 판정 함수 (가능하면 여유 offset 사용 권장)

// ✅ 전역 플래그/큐: 동시에 여러 요청이 만료를 만나도 refresh는 "단 한 번"만 돌리기 위함
let isRefreshing = false;
// refresh가 끝나길 기다리는 요청들의 콜백을 쌓아두는 큐
let refreshSubscribers: ((newToken: string) => void)[] = [];

/**
 * 새 토큰을 기다리는 요청(구독자)을 등록한다.
 * - refresh가 끝나면 onRefreshed가 모든 구독자 콜백을 호출하여 재개시킴
 */
const subscribeTokenRefresh = (callback: (newToken: string) => void) => {
  refreshSubscribers.push(callback);
};

/**
 * refresh 성공 시, 대기 중인 모든 구독자에게 새 토큰을 전달하고 큐를 비운다.
 */
const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach(cb => cb(newToken));
  refreshSubscribers = [];
};

// 🔧 인증 전용 axios 인스턴스
// - 공통 baseURL/withCredentials 설정
// - 이 인스턴스에만 토큰 부착/리프레시 로직이 적용됨
export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // refreshToken 쿠키 전송을 위해 필요
});

/**
 * 요청 인터셉터
 * - 역할: 요청에 Authorization 헤더를 붙이고,
 *         토큰이 만료(또는 거의 만료)라면 선제적으로 refresh가 끝날 때까지 대기한 뒤 새 토큰으로 헤더를 세팅
 * - 동시성: 첫 만료 요청만 실제 refresh를 호출하고, 나머지는 구독자로서 대기 → 새 토큰 수신 즉시 이어서 진행
 *
 * ⚠️ 응답 인터셉터(401에서 갱신/재시도) 패턴도 대안이지만,
 *    이 코드는 "요청 인터셉터에서 선제 갱신" 패턴을 안정화한 구현입니다.
 */
authApi.interceptors.request.use(async config => {
  // Zustand 스토어(싱글턴)에서 현재 인증 상태 함수들을 직접 꺼냄
  const { accessToken, refreshAccessToken, logout } = useAuthStore.getState();

  // 1) accessToken 자체가 없으면 아무 것도 하지 않고 진행
  //    (비로그인 영역/공개 API 등)
  if (!accessToken) return config;

  // 2) 토큰 만료(또는 거의 만료) 시
  //    - isTokenExpired가 offsetSeconds를 지원한다면 isTokenExpired(accessToken, 30)처럼 여유를 두는 것이 좋음
  if (isTokenExpired(accessToken)) {
    /**
     * waitForToken:
     * - 구독(콜백 등록)을 먼저 수행한 뒤,
     * - "처음" 만료를 감지한 요청만 refresh를 실제로 수행
     * - refresh가 끝나면 onRefreshed(newToken)으로 모든 구독자 콜백 실행 → Promise resolve
     *
     * 이렇게 해야 onRefreshed가 먼저 실행되어 구독자가 알림을 놓치는 레이스 컨디션을 막을 수 있음
     */
    const waitForToken = () =>
      new Promise<string>((resolve, reject) => {
        // (a) 일단 자신을 구독자로 등록 → 나중에 onRefreshed(newToken)에서 깨워줌
        subscribeTokenRefresh(resolve);

        // (b) 만약 아직 아무도 refresh를 시작하지 않았다면, 이번 요청이 "대표"로 refresh 수행
        if (!isRefreshing) {
          isRefreshing = true;
          refreshAccessToken()
            .then(newToken => {
              if (!newToken) throw new Error("새 토큰 없음");
              // 모든 대기자에게 새 토큰을 전달하고 큐 비우기
              onRefreshed(newToken);
            })
            .catch(err => {
              // 실패 시: 대기 중인 구독자들이 더 이상 기다리지 않도록 큐 정리 후 전체 실패 처리
              refreshSubscribers = [];
              logout(); // 인증 만료/실패 상태로 전환
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
      });

    // (c) 여기서 refresh 종료까지 대기 → 새 토큰을 받고 현재 요청 헤더에 즉시 적용
    const newToken = await waitForToken();

    // 헤더 객체 보장
    config.headers = config.headers ?? {};
    // Authorization 헤더 최신화
    config.headers.Authorization = `Bearer ${newToken}`;
    return config;
  }

  // 3) 토큰 유효 → 그냥 붙여서 진행
  config.headers = config.headers ?? {};
  config.headers.Authorization = accessToken.startsWith("Bearer ")
    ? accessToken
    : `Bearer ${accessToken}`;
  return config;
});
