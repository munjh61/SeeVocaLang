import { Button } from "../../atoms/button/Button";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import BookIcon from "../../../asset/folder.svg?react";
type VocaButtonProps = {
    className?:string;
    data?:number;
    children?: React.ReactNode;
};

export const VocaButton = ({className}:VocaButtonProps)=>{
    
    return(
        <Button
        bgColor={"black"}
        textColor={"white"}
        size={"md"}
        className={`gap-1 px-3 py-1.5 ${className}!w-auto`}
        >
        <div className="flex items-center gap-2">
        <Icon icon={BookIcon} color={"white"} className="w-4 h-4" />
        <Text size="base" color="white" weight="medium">
          단어장 보기
        </Text>
      </div>
        </Button>
    );
};