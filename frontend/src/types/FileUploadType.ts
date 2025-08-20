export type AnalysisResult = {
  name_en: string;
  name_ko: string;
  image_key: string;
  word: {
    word_id: number;
    image_url: string;
  };
};

export type Folder = {
  folderId: number;
  thumbnailUrl?: string | null;
  name: string;
  description: string;
  favorite: boolean;
  onLearnClick?: (id: number) => void;
  onEditClick?: (id: number) => void;
  onToggleFavorite?: (id: number, favorite: boolean) => void;
};

export type CardFolder = {
  folder_id: number;
  name: string;
};
