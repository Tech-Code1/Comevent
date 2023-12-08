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
  avatar: string;
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

export type IEditProfile = Partial<ISimplifiedUserEditProfile>;
