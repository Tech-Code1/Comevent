import { Country, Specialty } from '@db/entities';

export interface ISocialNetworks {
  platform: string;
  link: string;
}

export interface IUserEditProfile {
  avatar: string;
  username: string;
  email: string;
  description: string;
  socialNetworks: ISocialNetworks[];
  userAreas: string[];
  firstName: string;
  lastName: string;
  gender: string;
  bornDate: Date;
  age: number;
  specialty: Specialty;
  country: Country;
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
  bornDate: Date;
  age: number;
  specialty: string;
  country: string;
}
