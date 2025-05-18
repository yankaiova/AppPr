import { Button } from "antd";
import { Chart as ChartJS } from "chart.js/auto";

export const ButtonPNG: React.FC<{
  chartRef: React.RefObject<ChartJS<"line"> | null | undefined>;
}> = ({ chartRef }) => {
  const handleExport = () => {
    const chart = chartRef.current;
    if (!chart) return;
    const image = chart.toBase64Image();
    const a = document.createElement("a");
    a.href = image;
    a.download = "chart.png";
    a.click();
  };
  return <Button onClick={handleExport}>PNG</Button>;
};
