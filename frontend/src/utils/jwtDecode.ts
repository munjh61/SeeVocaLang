type JwtPayload = {
  userId: number;
  iat?: number;
  exp?: number;
};

export const decodeJwtPayload = (token: string): JwtPayload | null => {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("❌ JWT 디코딩 실패:", error);
    return null;
  }
};
