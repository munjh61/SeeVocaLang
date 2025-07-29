import { Input } from "../components/atoms/Input";
import { SegmentControl } from "../components/layout/book/segmentController";
import { IconInput } from "../components/layout/book/IconInput";
import searchSvg from "../asset/search.svg?react";

function TestPageMoon() {
  return (
    <div>
      <IconInput
        icon={searchSvg}
        inputProps={{
          placeholder: "검색어를 입력하세요",
          onChange: e => console.log(e.target.value),
        }}
        inputVariant={{ scale: "md" }}
        iconVariant={{ size: "md", color: "blue" }}
        className="w-full"
      />
      <h1>Moon</h1>
      <div className="w-[50%] flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md">
        <Input scale={"md"} className="flex-grow: 1" />
        <SegmentControl
          options={[
            { label: "영어", value: "en" },
            { label: "한글", value: "ko" },
          ]}
          defaultValue="en"
          onChange={v => console.log("선택됨:", v)}
        />
      </div>
    </div>
  );
}
export default TestPageMoon;
