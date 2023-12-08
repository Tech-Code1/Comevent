import { BaseResponse } from '@types';
import { managerError } from '@utils';
import { IEditProfile } from '../types';

export const DataUpdateProfileAdapter = (
  resp: BaseResponse<IEditProfile | undefined>
): BaseResponse<IEditProfile | undefined> => {
  const { data, response } = resp;

  const { code, message, status, success } = response;

  if (!success) {
    return managerError(resp);
  }

  const {
    username,
    avatar,
    description,
    socialNetworks,
    age,
    areaOfExpertise,
    areaOfInteres,
    bornDate,
    country,
    currentPassword,
    email,
    firstName,
    gender,
    lastName,
    password,
    specialty,
  } = data as IEditProfile;

  return {
    data: {
      username,
      avatar,
      description,
      socialNetworks,
      age,
      areaOfExpertise,
      areaOfInteres,
      bornDate,
      country,
      currentPassword,
      email,
      firstName,
      gender,
      lastName,
      password,
      specialty,
    },
    response: {
      status,
      success,
      code,
      message,
    },
  };
};
