import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import LegendElement, { CategoryType } from "../LegendElement";

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthlyConsumption = () => {
  const navigate = useNavigate();
  const data = {
    // labels: 카테고리 배열
    labels: ["식비", "교통비", "통신비", "주거"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#008C8C", "#EF5489", "#FFCC5A", "#B5B5B5"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const totalConsumption = 2000000000;

  const categories: CategoryType[] = [
    { title: "식비", ratio: 40, color: "#008C8C", unit: "%" },
    { title: "교통비", ratio: 30, color: "#EF5489", unit: "%" },
    { title: "통신비", ratio: 20, color: "#FFCC5A", unit: "%" },
    { title: "주거", ratio: 10, color: "#B5B5B5", unit: "%" },
  ];

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
            <Doughnut data={data} options={options} />
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
          {categories.map((category, index) => (
            <LegendElement
              key={index}
              title={category.title}
              ratio={category.ratio}
              color={category.color}
              unit={category.unit}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MonthlyConsumption;
