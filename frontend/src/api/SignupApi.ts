// 임시 api
export const checkIdDuplicate = async (id: string): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const isAvailable = id !== "dojin9654";
      resolve(isAvailable);
    }, 800);
  });
};

export const checkNicknameDuplicate = async (
  nickname: string
): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const isAvailable = nickname !== "김도현";
      resolve(isAvailable);
    }, 800);
  });
};

export const registerUser = async (form: {
  id: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
}): Promise<{ success: boolean }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("📦 회원가입 요청 데이터:", form);
      resolve({ success: true });
    }, 1000);
  });
};
