import { authApi } from "../utils/axios";

const   MYPAGE_URL = `/api/v1/users`;

//회원탈퇴
export const deleteAccount =async():Promise<boolean> =>{
    try{
        const response =await authApi.delete(`${MYPAGE_URL}`);
        return response.status ===200;
    }catch{
        return false;
    }
};

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

// export const sendEmailCode =async(code:string): Promise<boolean> => {
//     try{
//         const response =await authApi.get()
//     }catch{
//         return false;
//     }
// };


