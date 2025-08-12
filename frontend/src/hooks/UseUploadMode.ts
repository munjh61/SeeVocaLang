// hooks/useUploadMode.ts
import { useMemo, useEffect, useState } from "react";
import type { AnalysisResult } from "../types/FileUploadType.ts";

export function useUploadMode(result: AnalysisResult | null) {
  const wordId = result?.word?.word_id ?? null;
  const mode = useMemo<"analyze" | "replace" | "save">(
    () => (!result ? "analyze" : wordId ? "replace" : "save"),
    [result, wordId]
  );

  const [existingImageUrl, setExistingImageUrl] = useState("");
  useEffect(() => {
    setExistingImageUrl(result?.word?.image_url ?? "");
  }, [result?.word?.image_url]);

  return { mode, wordId, existingImageUrl };
}
