import { Button } from "../../atoms/button/Button";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import BookIcon from "../../../asset/folder.svg?react";
import { getfolders } from "../../../api/FolderAPI";
import { useState } from "react";
import { FriendVocaModal } from "../friendModal/FriendVocaModal";
type VocaButtonProps = {
    className?:string;
    data?:number;
    children?: React.ReactNode;
};

export const VocaButton = ({className,data}:VocaButtonProps)=>{
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchFriendVoca = async () => {
    if (!data) {
      console.error("❌ userId가 없습니다.");
      return;
    }
    setLoading(true);
    try {
      const folderList = await getfolders(data);
      console.log("📚 불러온 단어장 목록:", folderList);
  
      setFolders(folderList);
      setIsOpen(true);
    } catch (error) {
      console.error("단어장 목록 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };
    return(
      <>
        <Button
        bgColor={"black"}
        textColor={"white"}
        size={"md"}
        className={`gap-1 px-3 py-1.5 ${className}!w-auto`}
        onClick={searchFriendVoca}
        disabled={loading}
        >
        <div className="flex items-center gap-2">
        <Icon icon={BookIcon} color={"white"} className="w-4 h-4" />
        <Text size="base" color="white" weight="medium">
          단어장
        </Text>
      </div>
        </Button>

        {isOpen && (
        <FriendVocaModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          folders={folders} // API 결과 전달
        />
      )}
    </>
    );
};