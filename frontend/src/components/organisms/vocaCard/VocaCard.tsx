import { Text } from "../../atoms/text/Text";
import { ImageBox } from "../../molecules/imagebox/Imagebox";

type VocaCardProps = {
  thumbnail?: string;
  name: string;
  description: string;
};

export const VocaCard = ({ thumbnail, name, description }: VocaCardProps) => {
  return (
    <div className="rounded-ms w-400 h-600">
      <div>
        <ImageBox src={thumbnail} className="w-full h-full"></ImageBox>
      </div>
      <div>
        <Text>{name}</Text>
        <Text>{description}</Text>
      </div>
    </div>
  );
};
