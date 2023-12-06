type RequiredChipSelectType = {
  colorText: 'white' | 'black' | 'primary' | 'disabled' | '';
  title: string;
  select: boolean;
};

type OptionalChipSelectType = {
  disabled: boolean;
  hover: boolean;
};

export type ChipSelectType = RequiredChipSelectType &
  Partial<OptionalChipSelectType>;
