import {
  getCountry,
  getDateFrom,
  getDateTo,
} from "../../model/store/selectors";
import { useSelector } from "react-redux";
import { LineGraph } from "../lineGraph/LineGraph";
import { ButtonPNG } from "../buttonPNG/ButtonPNG";
import { CSVButton } from "../buttonCSV/ButtonCSV";
import { useGetDataQuery } from "../../model/store/api";
import { getRandomColor } from "../../utils/getRandomColor";
import { useRef, useMemo } from "react";
import { useCategory } from "../../hooks/useCategory";
import { Chart as ChartJS } from "chart.js/auto";
import type { ChartData } from "chart.js";
import { Button } from "antd";
import { SUB_CATEGORY } from "../../utils/constants";

import style from "./DashBoard.module.css";

export const DashBoard = () => {
  const dateTo = useSelector(getDateTo);
  const dateFrom = useSelector(getDateFrom);
  const country = useSelector(getCountry);

  const chartRef = useRef<ChartJS<"line"> | undefined>(null);

  const { data, isSuccess, isLoading } = useGetDataQuery({
    countryId: Number(country),
    dateFrom,
    dateTo,
  });

  const categoryIds = useMemo(() => (data ? Object.keys(data) : []), [data]);
  const categoriesMap = useCategory({ ids: categoryIds });

  const dataForLine: ChartData<"line"> | null = useMemo(() => {
    if (!data || !categoriesMap) return null;

    const dateSet = new Set<string>();
    const datasets: ChartData<"line">["datasets"] = [];

    for (const categoryId in data) {
      const subcategories = data[categoryId];

      for (const subId in subcategories) {
        const dates = subcategories[subId];

        Object.keys(dates).forEach((date) => dateSet.add(date));
      }
    }

    const labels = Array.from(dateSet).sort();

    for (const categoryId in data) {
      const subcategories = data[categoryId];

      for (const subId in subcategories) {
        const dates = subcategories[subId];

        const dataPoints = labels.map((date) => dates[date] || 0);

        datasets.push({
          label: `${categoriesMap.get(categoryId)} - ${SUB_CATEGORY.get(subId)}`,
          data: dataPoints,
          fill: false,
          borderColor: getRandomColor(),
          tension: 0.1,
        });
      }
    }

    return {
      labels,
      datasets,
    };
  }, [country, dateFrom, dateTo, categoryIds]);

  if (isLoading)
    return <Button type="primary" loading iconPosition={"start"} />;

  if (!dateTo || !dateFrom || !country) return <div>Выберите опции</div>;
  if (!data) return <div>Нет данных</div>;
  if (!isSuccess || !dataForLine) return null;

  return (
    <div className={style.dashboard}>
      <LineGraph data={dataForLine} ref={chartRef} />
      <div className={style.buttons}>
        <ButtonPNG chartRef={chartRef} />
        <CSVButton chartData={dataForLine} />
      </div>
    </div>
  );
};
