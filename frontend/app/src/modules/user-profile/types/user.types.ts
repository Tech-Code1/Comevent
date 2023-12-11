import { UserArea } from '@db/entities';
import { ICountries, ISpecialties } from '.';

export interface ISocialNetworks {
  platform: string;
}

export interface IUserProfile {
  username?: string;
  avatar?: string;
  description?: string;
  userAreas?: UserArea[];
  socialNetworks?: string[];
  events?: string[];
}

export interface ISocialNetworks {
  platform: string;
  link: string;
}

export interface ISimplifiedUserEditProfile {
  avatar: string | null;
  username: string | null;
  email: string | null;
  description: string;
  socialNetworks: ISocialNetworks[];
  areaOfInteres: string[];
  areaOfExpertise: string[];
  firstName: string;
  lastName: string;
  gender: string;
  bornDate: Date;
  age: number;
  specialty: ISpecialties;
  country: ICountries;
  currentPassword?: string;
  password?: string;
}

export interface IUpdateProfile {
  avatar: string | null;
  username: string | null;
  email: string | null;
  description: string | null;
  socialNetworks: ISocialNetworks[] | null;
  areaOfInteres: number[] | null;
  areaOfExpertise: number[] | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  bornDate: string | null;
  age: number | null;
  specialty: number | null;
  country: number | null;
  currentPassword?: string | null;
  password?: string | null;
}

export interface IEditProfileFormData {
  description: string;
  socialNetworks: ISocialNetworks[];
  areas: {
    areaOfExpertise: number[];
    areaOfInteres: number[];
  };
  moreInformation: {
    firstName: string;
    lastName: string;
    gender: string;
    bornDate: Date | null;
    specialty: number;
    country: number;
  };
  changeUserName: {
    userName: string;
    pass: string;
  };
  changePassword: {
    pass: string;
    password: string;
    passRepeat: string;
    currentPassword?: string;
  };
  changeEmail: {
    email: string;
    pass: string;
  };
  avatar: string;
}

export type IEditProfile = Partial<ISimplifiedUserEditProfile>;
