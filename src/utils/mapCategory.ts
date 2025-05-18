import type { CategoryFromApi } from "../model/types/types";

export function mapCategory(arr: CategoryFromApi[]): Record<number, string> {
  const data: Record<number, string> = {};

  arr.forEach((category) => {
    data[category.id] = category.name;
    category.categories?.forEach((item) => {
      data[item.id] = item.name;
    });
  });

  return data;
}
