import { authApi } from "../utils/axios";

const   MYPAGE_URL = `/api/v1/users`;

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
export const deleteAccount =async():Promise<boolean> =>{
    try{
        const response =await authApi.delete(`${MYPAGE_URL}`);
        return response.status ===200;
    }catch{
        return false;
    }
};

//인증번호 요청
export const getEmailCode =async(email:string): Promise<boolean> => {
    try{
        const response =await authApi.get(`${MYPAGE_URL}/validation-code`,
            {
                params: {email: email}
            }
        )

        return response.status === 200;
     } catch (error) {
    console.error("이메일 인증 코드 전송 실패:", error);
    return false;
  }
};

//인증번호 확인
export const sendEmailCode =async(email:string,code:string): Promise<boolean> => {
    try{
        const response =await authApi.get(`${MYPAGE_URL}/validation-email`,
            {
                params:{
                    email:email,
                    code:code
                }
            }
        )
         return response.status === 200;
    }catch{
        return false;
    }
};

//비밀번호 체크
export const checkPassword =async(password:string): Promise<boolean> =>{
    try{
        const response =await authApi.post(`${MYPAGE_URL}/password-validation`,
            {
                password:password
            }
        )
        return response.status === 200;
    }catch{
        return false;
    }
};

// ✅ profileFile은 null일 수도 있음
export const updateProfile = async ( 
  currentPassword: string,
  newPassword:string,
  nickname: string,
  profileFile: File | null
): Promise<boolean> => {
  try {
    const formData = new FormData();

    // 📌 JSON 부분을 문자열로 변환해서 "data"에 담기
    const profileData = {    
      currentPassword,
      newPassword,
      nickname,
    };
    const blob = new Blob([JSON.stringify(profileData)], { type: "application/json" });
    formData.append("data", blob);

    // 📌 파일이 있으면 "profile"이라는 키로 추가
    if (profileFile) {
      formData.append("profile", profileFile);
    }

    const response = await authApi.patch(`${MYPAGE_URL}`, formData);

    return response.status === 200;
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
    return false;
  }
};

//달력
export const getCalendar= async(year:number, month:number):Promise<string[]>=>{
   try {
    const response = await authApi.get(`${MYPAGE_URL}/studyhistory`, {
      params: {
        year,
        month,
      },
    });
    console.log( "달력:", response.data.content.days)
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
    const response = await authApi.get<StatisticsResponse>(`${MYPAGE_URL}/statistics`);
    console.log(response.data.content)
    return response.data;
  } catch (error) {
    console.error("📌 통계 불러오기 실패:", error);
    return null;
  }
};