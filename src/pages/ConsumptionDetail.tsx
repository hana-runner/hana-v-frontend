import React, { useEffect, useState } from "react";
import {
  CategorySelect,
  InterestConsumptionDetail,
  Navbar,
} from "../components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apis/apiClient";

ChartJS.register(ArcElement, Tooltip, Legend);

const ConsumptionDetail = () => {
  const { data } = useQuery<ApiResponseType<InterestExpenseType[]>>({
    queryKey: ["InterestExpense"],
    queryFn: () => {
      const response = ApiClient.getInstance().getExpensePerInterests();
      return response;
    },
  });

  const expenses = data?.data || [];

  const categories: string[] = Array.from(
    new Set(expenses.map((expense) => expense.categoryTitle)),
  );
  const [category, setCategory] = useState<string | undefined>(categories[0]);

  useEffect(() => {
    if (categories.length > 0 && category === undefined) {
      setCategory(categories[0]);
    }
  }, [categories, category]);

  const getValue = (value: string) => {
    setCategory(value);
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
          <CategorySelect
            categories={categories}
            getValue={getValue}
            defaultValue={category}
          />
        </div>
        {category && (
          <InterestConsumptionDetail expenses={expenses} category={category} />
        )}
      </div>
    </section>
  );
};

export default ConsumptionDetail;
