import { FormControl, FormGroup } from '@angular/forms';

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

export type IUserUpdateForm = IFormPersonalInfo & IFormSocialNetworks;
