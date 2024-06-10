import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const InterestGraphFor6Months = ({
  transactionAnalysisFor6,
  color,
}: {
  transactionAnalysisFor6: ApiResponseType<TransactionAnalysisFor6Type>;
  color: string;
}) => {
  const labels = transactionAnalysisFor6?.data.myMonth
    .slice()
    .reverse()
    .map((item) => `${item.month}월`);

  const amount = transactionAnalysisFor6?.data.myMonth
    .slice()
    .reverse()
    .map((item) => item.amount);

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "transparent",
        },
      },
      y: {
        display: false,
        beginAtZero: true,
        grid: {
          color: "transparent",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const amount = context.raw;
            return `${amount.toLocaleString("KR-kr")}원`;
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: amount,
        borderColor: color,
        backgroundColor: color,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      <div>
        <span>한 달에 평균 </span>
        <span>
          {transactionAnalysisFor6?.data.myAverage >= 10000
            ? (
                Math.round(transactionAnalysisFor6?.data.myAverage / 10000) *
                10000
              ).toLocaleString("KR-kr")
            : (
                Math.ceil(transactionAnalysisFor6?.data.myAverage / 1000) * 1000
              ).toLocaleString("KR-kr")}
        </span>
        <span>원을 써요</span>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default InterestGraphFor6Months;
