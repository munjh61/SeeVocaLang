import { Input } from "../components/atoms/Input";
import { SegmentControl } from "../components/layout/book/segmentController";

function TestPageMoon() {
  return (
    <div>
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
