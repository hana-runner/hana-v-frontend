import React from "react";
import { CategorySelect, LegendElement, Navbar } from "../components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface interestType {
  title: string;
  value: number;
  color: string;
  unit: string;
}

const ConsumptionDetail = () => {
  const categories = ["식비", "교통비", "통신비", "피트니스"];
  const interests: interestType[] = [
    { title: "관심사1", value: 40000, color: "#008C8C", unit: "원" },
    { title: "관심사2", value: 30000, color: "#EF5489", unit: "원" },
    { title: "관심사3", value: 20000, color: "#FFCC5A", unit: "원" },
    { title: "관심사4", value: 10000, color: "#B5B5B5", unit: "원" },
  ];

  const data = {
    labels: ["관심사1", "관심사2", "관심사3", "관심사3"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#008C8C", "#EF5489", "#FFCC5A", "#B5B5B5"],
        hoverBorderColor: ["#008C8C", "#EF5489", "#FFCC5A", "#B5B5B5"],
        hoverBorderWidth: 1,
        hoverOffset: 10,
        radius: "80%",
      },
    ],
  };

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

  return (
    <section>
      <Navbar option={true} title="소비 상세" logo={false} />
      <div className="flex justify-start mx-8 mt-8 mb-4">
        <span className="font-hanaRegular">소비 분석</span>
      </div>
      <div className="bg-white rounded-2xl shadow-md mx-8 p-4">
        {/* 카테고리 선택 옵션 */}
        <div className="flex justify-start">
          <CategorySelect categories={categories} />
        </div>
        {/* 파이 차트 */}
        <div className="flex justify-center items-center">
          <div className="w-60 h-60">
            <Pie data={data} options={options} />
          </div>
        </div>
        {/* 범례 */}
        <div>
          {interests.map((interest, index) => (
            <LegendElement
              key={index}
              title={interest.title}
              color={interest.color}
              ratio={interest.value}
              unit={interest.unit}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsumptionDetail;
