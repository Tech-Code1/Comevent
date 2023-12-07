import { FormControl, FormGroup } from '@angular/forms';

type RequiredInputType = {
  variant: 'input-base' | 'input-secondary' | 'input-tertiary';
  name: string;
  type: 'number' | 'text' | 'email' | 'password' | 'date';
  id: string;
};

type OptionalInputType = {
  value: string | number;
  formGroup: FormGroup;
  formControl: FormControl;
  placeholder: string;
  disabled?: boolean;
  showPassword: boolean;
};

export type InputType = RequiredInputType & Partial<OptionalInputType>;
