import { apiInstance } from './base';

import type { AxiosPromise, AxiosRequestConfig } from 'axios';
import type { GetListResponse, Person } from './models';

const BASE_URL = '/people';

export type GetPeopleListParams = {
  page?: number;
  search?: string;
};

export const getPeopleList = (
  params?: GetPeopleListParams,
  config?: AxiosRequestConfig,
): AxiosPromise<GetListResponse<Person>> => {
  return apiInstance.get(BASE_URL, { ...config, params });
};

export type GetPersonByIdParams = {
  taskId: number;
};

export const getPersonById = (
  { taskId }: GetPersonByIdParams,
  config?: AxiosRequestConfig,
): AxiosPromise<Person> => {
  return apiInstance.get(`${BASE_URL}/${taskId}`, config);
};
