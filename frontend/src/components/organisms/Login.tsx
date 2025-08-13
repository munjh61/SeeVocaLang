import React, { useEffect, useState } from "react";
import { Logo } from "../atoms/Logo.tsx";
import { Text } from "../atoms/text/Text.tsx";
import { Label } from "../atoms/Label.tsx";
import { Input } from "../atoms/input/Input.tsx";
import { Checkbox } from "../atoms/Checkbox.tsx";
import { Button } from "../atoms/button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api/user/LoginApi.ts";
import { getUserInfo } from "../../api/userInfo.ts";
import { useAuthStore } from "../../stores/AuthStore.ts";

export const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [isRemembered, setIsRemembered] = useState(false);
  const navigate = useNavigate();

  // 아이디 저장/삭제 처리
  useEffect(() => {
    if (isRemembered && id) {
      localStorage.setItem("savedId", id);
    } else {
      localStorage.removeItem("savedId");
    }
  }, [isRemembered, id]);

  // 로그인 처리
  const handleLogin = async () => {
    try {
      console.log("로그인 시도:", { id, password });
      const { token, nickname, profileImage } = await signin(id, password);

      // ✅ 유저 정보 content에서 꺼내기
      const userInfo = await getUserInfo();

      console.log("userInfo : ", userInfo);

      // ✅ 상태 업데이트
      useAuthStore.getState().login(token, {
        userId: userInfo.userId,
        loginId: userInfo.loginId,
        nickname: userInfo.nickname ?? nickname,
        email: userInfo.email ?? null,
        profileImage: profileImage ?? null,
      });

      console.log("로그인 유저 정보 : ", useAuthStore.getState().user);
      navigate("/main");
    } catch {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim() === "" || password.trim() === "") {
      setShowErrors(true);
      return;
    }
    handleLogin();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-5 px-6"
      >
        <Logo />
        <Text size="xl" weight="extrabold" color="black">
          로그인
        </Text>

        {/* 아이디 입력 */}
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="id" className="ml-1 font-bold">
            아이디
          </Label>
          <Input
            id="id"
            scale="signup"
            border={showErrors && id.trim() === "" ? "red" : "lightgray"}
            text="gray"
            placeholder="아이디"
            value={id}
            onChange={e => {
              setId(e.target.value);
              setShowErrors(false);
            }}
            className="m-0 px-3"
          />
          {showErrors && id.trim() === "" && (
            <Text size="xs" color="red" className="ml-2">
              아이디를 입력해주세요.
            </Text>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="password" className="ml-1 font-bold">
            비밀번호
          </Label>
          <Input
            id="password"
            type="password"
            scale="signup"
            border={showErrors && password.trim() === "" ? "red" : "lightgray"}
            text="gray"
            placeholder="비밀번호"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setShowErrors(false);
            }}
            className="m-0 px-3"
          />
          {showErrors && password.trim() === "" && (
            <Text size="xs" color="red" className="ml-2">
              비밀번호를 입력해주세요.
            </Text>
          )}
        </div>

        {/* 아이디 저장 & 찾기 */}
        <div className="flex flex-row justify-between items-center w-full text-sm mt-1">
          <div className="flex flex-row gap-2 items-center">
            <Checkbox
              id="rememberId"
              checked={isRemembered}
              onCheckedChange={setIsRemembered}
            />
            <Label htmlFor="rememberId">아이디 저장</Label>
          </div>
          <div className="flex gap-2 text-gray-600">
            <Text
              size="sm"
              color={"muted"}
              className="cursor-pointer hover:text-blue-600"
            >
              아이디 찾기
            </Text>
            <span>|</span>
            <Text
              size="sm"
              color={"muted"}
              className="cursor-pointer hover:text-blue-600"
            >
              비밀번호 찾기
            </Text>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col justify-between mt-4 gap-2 w-full">
          <Button
            type="submit"
            size="signup"
            rounded="lg"
            className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
          >
            로그인
          </Button>
          <Button
            type="button"
            size="signup"
            border="blue"
            rounded="lg"
            textColor="blue"
            onClick={() => navigate("/")}
          >
            &lt; 돌아가기
          </Button>
        </div>
      </form>
    </div>
  );
};
