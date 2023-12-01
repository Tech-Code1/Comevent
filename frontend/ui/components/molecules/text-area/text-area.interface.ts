import { FormControl, FormGroup } from '@angular/forms';

type RequiredTextArea = {
  variant: 'text-area-base';
  name: string;
  id: string;
  placeholder: string;
  maxCharacters: number;
  currentCharacters: number;
};

type OptionalTextAreaType = {
  value: string | number;
  formGroup: FormGroup;
  formControl: FormControl;
  disabled?: boolean;
};

export type TextAreaType = RequiredTextArea & Partial<OptionalTextAreaType>;
