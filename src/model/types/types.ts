export type CountryFromApi = {
  id: number;
  name: string;
  country: string;
  active: boolean;
  icon: string;
  is_top_collected: boolean;
  top_apps: boolean;
  locale: string;
};

export interface DataResponse {
  [categoryId: string]: {
    [subId: string]: {
      [date: string]: number;
    };
  };
}
export interface CategoryFromApi {
  id: number;
  name: string;
  categories?: CategoryFromApi[];
}

export interface ApiResponse<T> {
  status_code: number;
  message: string;
  data: T;
}
