// components/ui/SegmentControl.tsx
import { useState } from "react";
import { Button } from "../../atoms/Button";

type SegmentOption = {
  label: string;
  value: string;
};

type SegmentControlProps = {
  options: SegmentOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const SegmentControl = ({
  options,
  defaultValue,
  onChange,
}: SegmentControlProps) => {
  const [selected, setSelected] = useState(defaultValue || options[0].value);

  const handleClick = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="inline-flex w-fit rounded-md p-1 bg-gray-300">
      {options.map(opt => (
        <Button
          key={opt.value}
          onClick={() => handleClick(opt.value)}
          bgColor={selected === opt.value ? "white" : "noBg"}
          textColor={selected === opt.value ? "purple" : "gray"}
          size="md"
          className="rounded-md px-4 py-2 hover:font-bold"
        >
          <p className="whitespace-nowrap">{opt.label}</p>
        </Button>
      ))}
    </div>
  );
};

// 이런 식으로 쓰면 됨
// import { SegmentControl } from "../components/layout/book/segmentController";

// function TestPageMoon() {
//   return (
//     <div>
//       <SegmentControl
//         options={[
//           { label: "영어", value: "en" },
//           { label: "한글", value: "ko" },
//         ]}
//         defaultValue="en"
//         onChange={v => console.log("선택됨:", v)}
//       />
//     </div>
//   );
// }
// export default TestPageMoon;
