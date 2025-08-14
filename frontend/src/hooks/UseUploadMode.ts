import { useMemo, useEffect, useState } from "react";
import type { AnalysisResult } from "../types/FileUploadType.ts";

export function useUploadMode(result: AnalysisResult | null) {
  const mode = useMemo<"analyze" | "replace" | "save">(() => {
    if (!result) return "analyze";
    return result.word ? "replace" : "save";
  }, [result]);

  const wordId = result?.word?.word_id ?? null;

  const [existingImageUrl, setExistingImageUrl] = useState("");
  useEffect(() => {
    setExistingImageUrl(result?.word?.image_url ?? "");
  }, [result?.word?.image_url]);

  return { mode, wordId, existingImageUrl };
}
