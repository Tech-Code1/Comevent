import { BaseResponse } from '@types';
import { managerError } from '@utils';
import { ISpecialties } from '../types';

export const DataSpecialtiesAdapter = (
  resp: BaseResponse<ISpecialties[] | undefined>
): BaseResponse<ISpecialties[] | undefined> => {
  const { data, response } = resp;

  if (!response.success) {
    return managerError(resp);
  }

  if (!Array.isArray(data)) {
    throw new Error('Data is not an array of specialties.');
  }

  const specialties = data.map((specialty) => ({
    id: specialty.id,
    name: specialty.name,
  }));

  return {
    data: specialties,
    response: {
      status: response.status,
      message: response.message,
      success: response.success,
      code: response.code,
    },
  };
};
