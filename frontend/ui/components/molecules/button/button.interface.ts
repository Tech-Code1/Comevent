type OptionalInputType = {
  type: 'button' | 'reset' | 'submit';
  disabled: boolean;
  loading: boolean;
  colorLoading: 'white' | 'disabled';
  variant:
    | 'button-base'
    | 'button-disabled'
    | 'button-ghost'
    | 'button-ghost-error'
    | 'button-accent';
};

export type ButtonType = Partial<OptionalInputType>;
