// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// clsx로 조건부 className 처리 + tailwind-merge로 중복 제거
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
