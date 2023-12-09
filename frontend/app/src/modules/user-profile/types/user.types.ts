import { UserArea } from '@db/entities';

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
  avatar: string | undefined;
  username: string;
  email: string;
  description: string;
  socialNetworks: ISocialNetworks[];
  areaOfInteres: string[];
  areaOfExpertise: string[];
  firstName: string;
  lastName: string;
  gender: string;
  bornDate: Date | null;
  age: number | null;
  specialty: string[];
  country: string;
  currentPassword?: string;
  password?: string;
}

export interface IEditProfileFormData {
  description: string;
  socialNetworks: ISocialNetworks[];
  areas: {
    areaOfExpertise: string[];
    areaOfInteres: string[];
  };
  moreInformation: {
    firstName: string;
    lastName: string;
    gender: string;
    bornDate: Date | null;
    specialty: string;
    country: string;
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
