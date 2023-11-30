import { BaseResponse } from '@types';
import { managerError } from '@utils';
import { ISimplifiedUserEditProfile } from '../types';

export const DataUserEditProfileAdapter = (
  resp: BaseResponse<ISimplifiedUserEditProfile | undefined>
): BaseResponse<ISimplifiedUserEditProfile | undefined> => {
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
    areaOfExpertise,
    areaOfInteres,
    age,
    bornDate,
    country,
    email,
    firstName,
    gender,
    lastName,
    specialty,
  } = data as ISimplifiedUserEditProfile;

  return {
    data: {
      username,
      avatar,
      description,
      socialNetworks,
      areaOfExpertise,
      areaOfInteres,
      age,
      bornDate,
      country,
      email,
      firstName,
      gender,
      lastName,
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
