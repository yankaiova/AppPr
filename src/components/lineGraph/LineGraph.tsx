import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { forwardRef } from "react";
import type { ChartData } from "chart.js";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

export const LineGraph = forwardRef<
  ChartJS<"line"> | undefined,
  { data: ChartData<"line"> }
>(({ data }, ref) => {
  return (
    <Line
      ref={ref}
      data={data}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        elements: {
          line: {
            tension: 0.5,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
});
