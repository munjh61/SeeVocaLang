import { cn } from "../../../utils/cn"; // className 병합 유틸
import { imageboxVariants } from "./ImageboxVariants";

type ImageBoxProps = {
  src?: string; // img가 없을 수도 있으니 optional
  alt?: string;
  shape?: "square" | "circle";
  data?: string;
  imageValue?: (v: string) => void;
  className?: string;
};

export const ImageBox = ({
  src,
  alt = "",
  shape,
  data,
  imageValue,
  className,
}: ImageBoxProps) => {
  const hasImage = Boolean(src);

  return (
    <div
      className={cn(
        imageboxVariants({ shape }),
        !hasImage && "bg-gray-100 w-32 h-32", // 이미지 없을 때만 회색 배경
        className
      )}
    >
      {hasImage && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          onClick={data ? () => imageValue?.(data) : undefined}
        />
      )}
    </div>
  );
};

// 사용 방법
// import { ImageBox } from "../components/molecules/imagebox/Imagebox";
// import apple from "../asset/png/apple.png";

// function TestPageMoon() {
//   const handleSearch = (value: string) => {
//     console.log(value);
//   };
//   return (
//     <>
//       {/* 이미지를 안주면 회색 */}
//       <ImageBox shape="circle"></ImageBox>
//       {/* 꽉 채움 */}
//       <ImageBox src={apple} shape="circle" />
//       {/* 크기는 className으로 넣으셈 */}
//       <ImageBox src={apple} shape="circle" className="w-[200px]" />
//       {/* 클릭시 함수 */}
//       <ImageBox
//         src={apple}
//         className="w-200"
//         data="apple"
//         imageValue={handleSearch}
//       />
//     </>
//   );
// }
// export default TestPageMoon;
