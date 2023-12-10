type RequiredSelectType<T> = {
  options: T[];
  id: string;
  name: string;
  placeholder: string;
};

type OptionalSelectType = {
  disabled: boolean;
  variant: 'select-base';
};

export type Option =
  | { id: number | string | null; name: string | null }
  | string;

export type SelectType<T> = RequiredSelectType<T> & Partial<OptionalSelectType>;
