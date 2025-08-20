type Props = {
  disabled: boolean;
  onBack: () => void;
  onReplace: () => void;
  nameEn: string;
  nameKo: string;
  DuplicateCard: any; // 기존 카드 재사용시 주입
};

export function ActionsReplace({
  disabled,
  onBack,
  onReplace,
  nameEn,
  nameKo,
  DuplicateCard,
}: Props) {
  return (
    <DuplicateCard
      nameEn={nameEn}
      nameKo={nameKo}
      onBack={onBack}
      onReplace={onReplace}
      disabled={disabled}
      isProcessing={disabled} // 필요시 별도 prop
    />
  );
}
