import { ImageBox } from "../components/molecules/imagebox/Imagebox";
import apple from "../asset/png/apple.png";

function TestPageMoon() {
  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <>
      {/* 이미지를 안주면 회색 */}
      <ImageBox shape="circle"></ImageBox>
      {/* 꽉 채움 */}
      <ImageBox src={apple} shape="circle" />
      {/* 크기는 className으로 넣으셈 */}
      <ImageBox src={apple} shape="circle" className="w-[200px]" />
      {/* 클릭시 함수 */}
      <ImageBox
        src={apple}
        className="w-200"
        data="apple"
        imageValue={handleSearch}
      />
    </>
  );
}
export default TestPageMoon;
