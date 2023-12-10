import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface IUserName {
  userName: FormControl<string>;
  pass: FormControl<string>;
}

export interface IEmail {
  email: FormControl<string>;
  pass: FormControl<string>;
}

export interface IPassword {
  pass: FormControl<string>;
  password: FormControl<string>;
  passRepeat: FormControl<string>;
}

export interface IFormPersonalInfo {
  avatar: FormControl<string | null>;
  description: FormControl<string>;
  changeUserName: FormGroup<IUserName>;
  changeEmail: FormGroup<IEmail>;
  changePassword: FormGroup<IPassword>;
}

export interface IFormSocialNetworks {
  x: FormControl<string | null>;
  discord: FormControl<string | null>;
  facebook: FormControl<string | null>;
  github: FormControl<string | null>;
  linkedin: FormControl<string | null>;
  instagram: FormControl<string | null>;
}

export interface IFormAreas {
  areaOfExpertise: FormArray<FormControl<unknown>>;
  areaOfInteres: FormArray<FormControl<unknown>>;
}

export interface IFormMoreInfo {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  gender: FormControl<string | null>;
  bornDate: FormControl<string | null>;
  specialty: FormControl<number | null>;
  country: FormControl<number | null>;
}

export type IUserUpdateForm = IFormPersonalInfo &
  IFormSocialNetworks &
  IFormAreas &
  IFormMoreInfo;
