import type { VariantProps } from "class-variance-authority";
import { infoCard } from "../infoCard/InfoCardVariants";
import { cn } from "../../../utils/cn.ts";
import { Text } from "../../atoms/text/Text";


type EduCardBaseProps =VariantProps<typeof infoCard>

type EduCardProps = {
    icon : React.ReactNode;
    mainTitle:string;
    subTitle:string;
    className?:string;
}& EduCardBaseProps

export const EduCard =({
    icon,
    mainTitle,
    subTitle,
    bgColor,
    className,
    ...props
}:EduCardProps)=>{
     return (
    <div
      className={cn(
        "w-full rounded-xl py-4 px-6 text-white flex items-center justify-center",
        infoCard({ bgColor }),
        className
      )}
      {...props}
    >

     <div className="flex items-center text-white">
  {/* 아이콘 */}
  <div className="text-2xl mr-3">{icon}</div>

  {/* 텍스트 영역 */}
  <div className="flex flex-col justify-center">
    <Text color="white" weight="extrabold">{mainTitle}</Text>
    <Text color="white" size="xs">{subTitle}</Text>
  </div>
  </div>
    </div>
  );
};