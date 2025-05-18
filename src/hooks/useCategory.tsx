import { useGetCategoriesQuery } from "../model/store/api";

export const useCategory = ({
  ids,
}: {
  ids: string[];
}): Map<string, string> | null => {
  const { data: categoriesMap, isSuccess } = useGetCategoriesQuery();
  if (!isSuccess || ids.length < 1 || !categoriesMap) {
    return null;
  }
  return new Map(ids.map((id) => [id, categoriesMap[+id]]));
};
