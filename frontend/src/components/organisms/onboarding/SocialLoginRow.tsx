import KaKaoIcon from "../../../asset/png/kakologo.png";
import NaverIcon from "../../../asset/png/naverIcon.png";
import { BASE_URL } from "../../../types/Regex.ts";

const baseurl = BASE_URL;

type Props = {
  finalRedirect?: string; // 필요 시 교체
};

export default function SocialLoginRow({
  finalRedirect = "http://ec2-13-125-250-93.ap-northeast-2.compute.amazonaws.com/main",
}: Props) {
  const start = (provider: "kakao" | "naver") => {
    const callback = window.location.origin + "/oauth2/success";
    document.cookie = `redirect_uri=${encodeURIComponent(callback)}; path=/`;
    document.cookie = `final_redirect=${encodeURIComponent(finalRedirect)}; path=/; SameSite=Lax`;
    window.location.href = `${baseurl}/oauth2/authorization/${provider}`;
  };

  return (
    <section className="flex flex-col gap-5 w-full max-w-md">
      <div className="flex items-center justify-center w-full gap-4">
        <div className="flex-grow h-px bg-gray-300 opacity-50" />
        <span className="text-gray-500 text-sm font-medium whitespace-nowrap">
          간편로그인
        </span>
        <div className="flex-grow h-px bg-gray-300 opacity-50" />
      </div>

      <div className="flex flex-row gap-5 justify-center items-center w-full">
        <img
          src={KaKaoIcon}
          alt="카카오 로그인"
          className="w-10 h-10 cursor-pointer"
          onClick={() => start("kakao")}
        />
        <img
          src={NaverIcon}
          alt="네이버 로그인"
          className="w-10 h-10 cursor-pointer"
          onClick={() => start("naver")}
        />
      </div>
    </section>
  );
}
