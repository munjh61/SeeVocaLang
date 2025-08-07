type Props = {
  file: File;
  result: {
    name_en: string;
    name_ko: string;
    image_key: string;
    is_already_exist: boolean;
  };
  onClose: () => void;
};

export const UploadStep3 = ({ file, result, onClose }: Props) => {
  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">AI 분석 결과</h2>

      <div className="flex gap-6">
        <div className="flex-1">
          <img
            src={fileUrl}
            alt="분석 이미지"
            className="rounded-lg border shadow-sm w-full max-w-[240px]"
          />
        </div>

        <div className="flex-1 text-sm text-gray-700">
          <p>
            📌 영어 이름: <strong>{result.name_en}</strong>
          </p>
          <p>
            📌 한국어 이름: <strong>{result.name_ko}</strong>
          </p>
          <p>
            📦 Redis Key: <code>{result.image_key}</code>
          </p>
          <p>
            ✅ 존재 여부:{" "}
            {result.is_already_exist ? "이미 존재함" : "신규 단어"}
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={onClose}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};
