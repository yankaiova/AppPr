import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ApiResponse,
  CategoryFromApi,
  CountryFromApi,
  DataResponse,
} from "../types/types";
import { mapCategory } from "../../utils/mapCategory";

type Params = {
  countryId: number;
  dateFrom: string;
  dateTo: string;
};
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.apptica.com/" }),
  endpoints: (build) => ({
    getCountries: build.query<CountryFromApi[], void>({
      query: () =>
        `v1/geo?B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`,
      transformResponse: (
        response: ApiResponse<CountryFromApi[]>
      ): CountryFromApi[] => {
        return response.data;
      },
    }),
    getCategories: build.query<Record<number, string>, void>({
      query: () =>
        `v1/applicationCategory?platform=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`,
      transformResponse: (response: ApiResponse<CategoryFromApi[]>) => {
        return mapCategory(response.data);
      },
    }),
    getData: build.query<DataResponse, Params>({
      query: ({ countryId, dateFrom, dateTo }) =>
        `package/top_history/9379/${countryId}?date_from=${dateFrom}&date_to=${dateTo}&platforms=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`,
      transformResponse: (response: ApiResponse<DataResponse>) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetCountriesQuery, useGetCategoriesQuery, useGetDataQuery } =
  appApi;
