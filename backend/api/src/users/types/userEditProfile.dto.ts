import { Country, Specialty } from '@db/entities';

export interface IUserEditProfile {
  avatar: string;
  username: string;
  email: string;
  description: string;
  socialNetworks: string[];
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
  socialNetworks: string[];
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
