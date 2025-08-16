import { authApi } from "../utils/axios";

const MYPAGE_URL = `/api/v1/users`;

interface StatisticsContent {
  totalDaysCount: number;
  streakDaysCount: number;
  monthDaysCount: number;
  totalWordsCount: number;
  totalFoldersCount: number;
}

export interface StatisticsResponse {
  message: string;
  content: StatisticsContent;
}

//회원탈퇴
export const deleteAccount = async (): Promise<boolean> => {
  try {
    const response = await authApi.delete(`${MYPAGE_URL}`);
    return response.status === 200;
  } catch {
    return false;
  }
};

//인증번호 요청
export const getEmailCode = async (email: string): Promise<boolean> => {
  try {
    const response = await authApi.get(`${MYPAGE_URL}/validation-code`, {
      params: { email: email },
    });

    return response.status === 200;
  } catch (error) {
    console.error("이메일 인증 코드 전송 실패:", error);
    return false;
  }
};

//인증번호 확인
export const sendEmailCode = async (
  email: string,
  code: string
): Promise<boolean> => {
  try {
    const response = await authApi.get(`${MYPAGE_URL}/validation-email`, {
      params: {
        email: email,
        code: code,
      },
    });
    return response.status === 200;
  } catch {
    return false;
  }
};

//비밀번호 체크
export const checkPassword = async (password: string): Promise<boolean> => {
  try {
    const response = await authApi.post(`${MYPAGE_URL}/password-validation`, {
      password: password,
    });
    return response.status === 200;
  } catch {
    return false;
  }
};

// ✅ profileFile은 null일 수도 있음
// ✅ 서버 스펙: multipart/form-data
// Parts: data(JSON, 필수), profile(File, 선택)
export const updateProfile = async (
  currentPassword: string,
  newPassword: string,
  nickname: string,
  profileFile: File | null
): Promise<boolean> => {
  try {
    // 값이 비어있으면 보내지 않도록 omit
    const dataObj: Record<string, string> = {};

    const nick = nickname?.trim();
    if (nick) dataObj.nickname = nick;

    const currPwd = currentPassword?.trim();
    const newPwd = newPassword?.trim();
    // 비번 변경 의사가 있을 때만 둘 다 보냄(한 쪽만 보내면 400 가능)
    if (currPwd && newPwd) {
      dataObj.currentPassword = currPwd;
      dataObj.newPassword = newPwd;
    }

    // ⚠️ data(JSON)는 필수이므로, 비어있어도 최소 {}는 보내야 함
    const fd = new FormData();
    const dataBlob = new Blob([JSON.stringify(dataObj)], {
      type: "application/json",
    });
    fd.append("data", dataBlob); // ← 서버 요구: data(JSON)

    if (profileFile) {
      // ⚠️ 서버가 요구한 파일 파트명: "profile"
      fd.append("profile", profileFile);
    }

    const response = await authApi.patch(`${MYPAGE_URL}`, fd, {
      // Content-Type은 자동 설정(boundary 포함) → 명시 X
      withCredentials: true,
    });

    return response.status === 200;
  } catch (error: any) {
    console.error("프로필 업데이트 실패:", {
      status: error?.response?.status,
      data: error?.response?.data,
    });
    return false;
  }
};

//달력
export const getCalendar = async (
  year: number,
  month: number
): Promise<string[]> => {
  try {
    const response = await authApi.get(`${MYPAGE_URL}/studyhistory`, {
      params: {
        year,
        month,
      },
    });
    if (response.status === 200 && response.data?.content?.days) {
      return response.data.content.days; // 날짜 배열 반환
    } else {
      return [];
    }
  } catch (error) {
    console.error("getCalendar 호출 실패:", error);
    return [];
  }
};

//학습통계
export const getStatics = async (): Promise<StatisticsResponse | null> => {
  try {
    const response = await authApi.get<StatisticsResponse>(
      `${MYPAGE_URL}/statistics`
    );
    console.log("통계", response.data.content);
    return response.data;
  } catch (error) {
    console.error("📌 통계 불러오기 실패:", error);
    return null;
  }
};
