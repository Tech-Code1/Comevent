import { BaseResponse } from '@types';
import { managerError } from '@utils';
import { ICountries } from '../types';

export const DataCountriesAdapter = (
  resp: BaseResponse<ICountries[] | undefined>
): BaseResponse<ICountries[] | undefined> => {
  const { data, response } = resp;

  if (!response.success) {
    return managerError(resp);
  }

  if (!Array.isArray(data)) {
    throw new Error('Data is not an array of countries.');
  }

  const countries = data.map((country) => ({
    id: country.id,
    name: country.name,
  }));

  return {
    data: countries,
    response: {
      status: response.status,
      message: response.message,
      success: response.success,
      code: response.code,
    },
  };
};
