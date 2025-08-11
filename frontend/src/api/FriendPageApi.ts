import { authApi } from "../utils/axios";

const FRIEND_URL=`/api/v1/friends`;

export interface Friend {
  friend_status: string; 
  nickname: string;
  profile_url: string;
  user_id: number;
  sender_id: number;
  receiver_id:number;
}

//친구요청
export const addFriend = async(userId:number):Promise<boolean>=>{
    try{
        const response =await authApi.post(`${FRIEND_URL}/${userId}`)
        return response.status === 200;
    }catch{
        return false;
    }
}

//친구요청수락
export const acceptFriend= async(userId: number):Promise<boolean>=>{
    try{
        const response =await authApi.put(`${FRIEND_URL}/${userId}`)
        return response.status === 200;    
    }catch{
        return false;
    }
}

//친구 삭제
export const deleteFriend =async(userId:number):Promise<boolean>=>{
    try{
        const response =await authApi.delete(`${FRIEND_URL}/${userId}`)
        return response.status===200;
    }catch{
        return false;
    }
}

//친구 목록
export const friendList = async (): Promise<Friend[]> => {
  try {
    const response = await authApi.get("api/v2/friends");

    console.log("API 응답 users:", response.data.content);

    if (response.status === 200) {
      // 여기에 API 응답 구조에 맞게 접근하세요
      // 예: response.data.content.users
      return response.data.content; // 친구 배열 반환
    } else {
      return [];
    }
  } catch (error) {
    console.error("friendList 호출 실패:", error);
    return [];
  }
};
