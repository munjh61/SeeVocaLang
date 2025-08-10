import { authApi } from "../utils/axios";

const FRIEND_URL=`/api/v1/friends`;

export interface Friend {
  nickname: string;
  profile_image: string;
  user_id: number;
  is_friend: string;
}

//친구요청
export const addFriend = async(userId:number):Promise<boolean>=>{
    try{
        const response =await authApi.post(`${FRIEND_URL}`,{
            userId:userId
        }
    )
        return response.status === 200;
    }catch{
        return false;
    }
}

//친구요청수락
export const acceptFriend= async(userId: number):Promise<boolean>=>{
    try{
        const response =await authApi.put(`${FRIEND_URL}`,{
            userId:userId
        }
    )
        return response.status === 200;    
    }catch{
        return false;
    }
}

//친구 삭제
export const deleteFriend =async(userId:number):Promise<boolean>=>{
    try{
        const response =await authApi.delete(`${FRIEND_URL}`,{
            params:{userId}
        }
    )
        return response.status===200;
    }catch{
        return false;
    }
}

//친구 목록 혹은 요청받은 친구목록
export const friendList = async (status: string): Promise<Friend[]> => {
  try {
    const response = await authApi.get(`${FRIEND_URL}`, {
      params: { status },
    });
    console.log("API 응답 전체:", response);
    console.log("API 응답 데이터:", response.data);
    console.log("API 응답 users:", response.data?.content?.users);

    if (response.status === 200) {
      // 여기에 API 응답 구조에 맞게 접근하세요
      // 예: response.data.content.users
      return response.data.content.users; // 친구 배열 반환
    } else {
      return [];
    }
  } catch (error) {
    console.error("friendList 호출 실패:", error);
    return [];
  }
};
