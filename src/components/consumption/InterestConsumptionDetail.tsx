import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import LegendElement from "../LegendElement";

ChartJS.register(ArcElement, Tooltip, Legend);

interface InterestConsumptionDetailProps {
  expenses: InterestExpenseType[];
  category: string;
}

interface PieDataType {
  labels: string[];
  datasets: [
    {
      data: number[];
      backgroundColor: string[];
      hoverBorderColor: string[];
      hoverBorderWidth: number;
      hoverOffset: number;
      radius: string;
    },
  ];
}

const InterestConsumptionDetail: React.FC<InterestConsumptionDetailProps> = ({
  expenses,
  category,
}) => {
  const [pieData, setPieData] = useState<PieDataType>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBorderColor: [],
        hoverBorderWidth: 1,
        hoverOffset: 10,
        radius: "80%",
      },
    ],
  });

  const [legends, setLegends] = useState<LegendType[]>([]);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  useEffect(() => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.categoryTitle === category,
    );

    const labels: string[] = filteredExpenses.map(
      (expense) => expense.interestTitle,
    );

    const backgroundColor: string[] = filteredExpenses.map(
      (expense) => expense.interestColor,
    );
    const hoverBorderColor: string[] = filteredExpenses.map(
      (expense) => expense.interestColor,
    );
    const data = filteredExpenses.map((expense) => expense.expense);

    console.log(category);

    setPieData({
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          hoverBorderColor,
          hoverBorderWidth: 1,
          hoverOffset: 10,
          radius: "80%",
        },
      ],
    });

    const newLegends = labels.map((label, index) => ({
      title: label,
      ratio: data[index],
      color: backgroundColor[index],
      unit: "원",
    }));

    setLegends(newLegends);
  }, [expenses, category]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-60 h-60">
          <Pie data={pieData} options={options} />
        </div>
      </div>
      <div>
        {legends.map((legend, index) => (
          <LegendElement
            key={index}
            title={legend.title}
            color={legend.color}
            ratio={legend.ratio}
            unit={legend.unit}
          />
        ))}
      </div>
    </>
  );
};

export default InterestConsumptionDetail;
