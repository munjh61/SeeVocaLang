import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string, offsetSeconds = 30): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now + offsetSeconds;
  } catch {
    return true;
  }
};
