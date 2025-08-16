import { Text } from "../../atoms/text/Text";

type FolderInfoProps = {
  name: string;
  description: string;
  className?: string;
};

export const FolderInfo = ({
  name,
  description,
  className,
}: FolderInfoProps) => {
  return (
    <div className={`bg-white/40 rounded-md p-2 ${className}`}>
      <Text
        size={"xxl"}
        weight={"bold"}
        onlyOneLine={"yes"}
        className="mb-3"
        font={"hakgyo"}
        align={"center"}
      >
        {name}
      </Text>
      <Text
        size={"xl"}
        color={"gray"}
        onlyOneLine={"yes"}
        className="mb-5"
        font={"hakgyo"}
        align={"center"}
      >
        {description}
      </Text>
    </div>
  );
};
