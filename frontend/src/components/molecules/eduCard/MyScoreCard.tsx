import type { VariantProps } from "class-variance-authority";
import { infoCard } from "../infoCard/InfoCardVariants";
import { Text } from "../../atoms/text/Text";
import { cn } from "../../../utils/cn.ts";

type BaseCardProps =VariantProps<typeof infoCard>
type MyCardProps = {
    wordCount: string;
    percent: string;
    text1:string;
    text2:string;
    className?:string;
}&BaseCardProps

export const MyScoreCard =({
    wordCount,
    percent,
    text1,
    text2,
    bgColor,
    className,
    ...props
}:MyCardProps) =>{
   return (
  <div
    className={cn(
      "w-full rounded-xl py-4 px-6 text-white flex items-center justify-center",
      infoCard({ bgColor }),
      className
    )}
    {...props}
  >
      <div className="flex justify-evenly w-full">
      {/* 왼쪽 영역 */}
      <div className="flex flex-col items-start">
        <Text size="lg" weight="bold" color="black">{wordCount}</Text>
        <Text size="xs" weight="normal" color="gray">{text1}</Text>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex flex-col items-end">
        <Text size="lg" weight="bold" color="black">{percent}</Text>
        <Text size="xs" weight="normal" color="gray">{text2}</Text>
      </div>
    </div>
  </div>
);

};