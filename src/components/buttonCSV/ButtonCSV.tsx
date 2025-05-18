import { Button } from "antd";

import React from "react";
import type { ChartData } from "chart.js";

type ExportCSVButtonProps = {
  chartData: ChartData<"line"> | null;
};

export const CSVButton: React.FC<ExportCSVButtonProps> = ({ chartData }) => {
  const handleExportCSV = () => {
    if (!chartData || !chartData.labels || !chartData.datasets) return;

    const labels = chartData.labels as string[];

    let csv =
      "Date," +
      chartData.datasets
        .map((dataset) => `"${dataset.label || "No Label"}"`)
        .join(",") +
      "\n";

    labels.forEach((label, i) => {
      const row = [label];
      chartData.datasets.forEach((dataset) => {
        const value = dataset.data?.[i];
        row.push(value?.toString() ?? "0");
      });
      csv += row.join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chart-data.csv";
    a.click();
  };

  return <Button onClick={handleExportCSV}>CSV</Button>;
};
