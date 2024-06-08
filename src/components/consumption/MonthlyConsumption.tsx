import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import LegendElement from "../LegendElement";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MonthlyConsumptionProps {
  expenses: ExpenseType[];
}

interface ChartDataType {
  labels: string[];
  datasets: [
    {
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
      cutout: string;
    },
  ];
}

const MonthlyConsumption: React.FC<MonthlyConsumptionProps> = ({
  expenses,
}) => {
  const navigate = useNavigate();

  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  });

  const [totalConsumption, setTotalConsumption] = useState(0);
  const [legends, setLegends] = useState<LegendType[]>([]);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    const total = expenses.reduce(
      (total, expense) => total + expense.expense,
      0,
    );
    setTotalConsumption(total);

    const labels: string[] = expenses.map((expense) => expense.title);
    const backgroundColor: string[] = expenses.map((expense) => expense.color);
    const data = expenses.map((expense) =>
      total ? Math.round((expense.expense / total) * 100) : 0,
    );

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 0,
          cutout: "70%",
        },
      ],
    });

    const newLegends = labels.map((label, index) => ({
      title: label,
      ratio: data[index],
      color: backgroundColor[index],
      unit: "%",
    }));

    setLegends(newLegends);
  }, [expenses]);

  return (
    <>
      <div className="flex flex-col items-start mx-4 mb-4">
        <span className="font-hanaMedium">월별 소비 분석</span>
        <span className="font-hanaRegular text-xs text-hanaSilver">
          나의 전체 계좌의 소비 패턴을 분석해주는 서비스입니다
        </span>
      </div>
      <div className="bg-white mx-4 mb-8 rounded-3xl shadow-md py-4">
        <div className="flex justify-between items-center mx-8">
          <span className="font-hanaMedium">이번 달 소비 내역</span>
          <IoIosArrowForward
            className="text-hanaSilver"
            onClick={() => navigate("/consumption")}
          />
        </div>
        {/* 도넛차트 */}
        <div className="my-4 flex justify-center items-center">
          <div className="w-56 h-56 relative">
            <Doughnut data={chartData} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-hanaRegular">총 지출</span>
              <span className="font-hanaRegular">
                {totalConsumption.toLocaleString()} 원
              </span>
            </div>
          </div>
        </div>
        {/* 범례 */}
        <div className="mx-8">
          {legends.map((legend, index) => (
            <LegendElement
              key={index}
              title={legend.title}
              ratio={legend.ratio}
              color={legend.color}
              unit={legend.unit}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MonthlyConsumption;
