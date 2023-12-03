/* type RequiredIconClearType = {

}; */

type OptionalIconClearInputType = {
  type: 'solid' | 'outlined';
  color: 'error' | 'gray';
  parentHovered: boolean;
};

export type IconClearInputType = Partial<OptionalIconClearInputType>;
