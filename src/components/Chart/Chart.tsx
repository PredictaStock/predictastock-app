import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import CurrentPriceService from "../../services/CurrentPriceService";

interface LineChartProps {
  stockName?: string; // Make stockName optional
}

function LineChart({ stockName = "" }: LineChartProps) { // Provide a default value for stockName
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const prices = new CurrentPriceService();

  useEffect(() => {
    async function getData() {
      if (!stockName) return; // Return if stockName is falsy
      const values = await prices.execute(stockName); // Use the passed stockName

      // Get the last nine days, including today
      const currentDate = new Date();
      const lastNineDays = Array.from({ length: 9 }, (_, index) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - index);
        return date.toLocaleDateString(); // Convert date to a string representation
      }).reverse(); // Reverse the array to display the dates in ascending order

      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
          new Chart(ctx, {
            type: "line",
            data: {
              labels: lastNineDays, // Use the last nine days as labels
              datasets: [
                {
                  label: "Price",
                  data: values.slice(-9),
                  fill: false,
                  borderColor: "#008ECC",
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  type: "category",
                },
                y: {
                  beginAtZero: false,
                },
              },
            },
          });
        }
      }
    }
    getData();
  }, [stockName]); // Re-run effect when stockName changes

  return <canvas ref={chartRef} />;
}

export default LineChart;
