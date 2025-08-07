import axios from "axios";
import { BASE_URL } from "../types/Regex";

const   MYPAGE_URL = `${BASE_URL}/api/v1/users`;

//회원탈퇴
export const deleteAccount =async():Promise<boolean> =>{
    try{
        const response =await axios.delete(`${MYPAGE_URL}`);
        return response.status ===200;
    }catch{
        return false;
    }
};


