import { IconInput } from "../../layout/book/IconInput";
import { SegmentControl } from "../../layout/book/SegmentControl";
import type { ComponentProps } from "react";

type IconInputProps = ComponentProps<typeof IconInput>;
type SegmentControlProps = ComponentProps<typeof SegmentControl>;

type SearchbarSegmentProps = {
  iconInput?: Pick<
    IconInputProps,
    "icon" | "inputProps" | "inputVariant" | "iconVariant"
  >;
  segmentControl?: Pick<
    SegmentControlProps,
    "options" | "defaultValue" | "onChange"
  >;
};

export const SearchbarSegment = ({
  iconInput,
  segmentControl,
}: SearchbarSegmentProps) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 shadow-md">
      {iconInput && <IconInput {...iconInput} />}
      {segmentControl && <SegmentControl {...segmentControl} />}
    </div>
  );
};
