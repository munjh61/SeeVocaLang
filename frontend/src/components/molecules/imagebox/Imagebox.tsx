import { cn } from "../../../utils/cn"; // className 병합 유틸
import { imageboxVariants } from "./ImageboxVariants";

type ImageBoxProps = {
  src?: string; // img가 없을 수도 있으니 optional
  alt?: string;
  shape?: "square" | "circle";
  data?: string;
  imageValue?: (v: string) => void;
  className?: string;
  imgClassName?: string;
  defaultBg?: "bg-gray-200" | "bg-transparent";
};

export const ImageBox = ({
  src,
  alt = "",
  shape,
  data,
  defaultBg = "bg-gray-200",
  imageValue,
  className,
  imgClassName,
}: ImageBoxProps) => {
  const hasImage = Boolean(src);

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden", // 이미지를 가운데로
        imageboxVariants({ shape }),
        defaultBg,
        !hasImage && "bg-gray-100 w-32 h-32", // 없을 때
        className
      )}
      draggable={false}
    >
      {hasImage && (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full max-w-full h-full max-h-full object-contain", // 비율 유지
            "mx-auto my-auto", // 가운데 정렬
            imgClassName
          )}
          onClick={data ? () => imageValue?.(data) : undefined}
          draggable={false}
        />
      )}
    </div>
  );
};
