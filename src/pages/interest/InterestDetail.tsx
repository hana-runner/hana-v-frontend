import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../apis/apiClient";
import {
  CardRecommendation,
  InterestComparison,
  InterestGraphFor6Months,
} from "../../components";

const InterestDetail = () => {
  const queryClient = useQueryClient();
  const { interestTitle, interestId } = useParams();

  const { userInterestTransactions, date } = useOutletContext();

  const { data: transactionAnalysisFor6 } = useQuery<
    ApiResponseType<TransactionAnalysisFor6Type>
  >({
    queryKey: ["transactionAnalysisFor6"],
    queryFn: () => {
      const response = ApiClient.getInstance().getTransactionsAnalysisFor6(
        Number(interestId),
        date.year,
        date.month,
      );
      return response;
    },
  });

  const percentageSpent =
    userInterestTransactions?.data?.interestTotalSpent &&
    userInterestTransactions?.data?.totalSpent
      ? (userInterestTransactions.data.interestTotalSpent /
          userInterestTransactions.data.totalSpent) *
        100
      : 0;

  const color =
    userInterestTransactions?.data.color && userInterestTransactions.data.color;

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["transactionAnalysisFor6"] });
  }, [date]);

  return (
    <div className="flex flex-col gap-10">
      {/* 관심사 소비 가로 막대 그래프 */}
      <div className="w-full flex flex-col gap-1">
        <div className="border border-hanaSilver w-full h-7 rounded-3xl z-10 overflow-hidden">
          <div
            className="h-7"
            style={{ width: `${percentageSpent}%`, background: color }}
          />
        </div>

        <div className="flex justify-between mx-3 text-[12px]">
          <span>
            {interestTitle} ({percentageSpent.toFixed(1)}%)
          </span>
          <span>전체</span>
        </div>
      </div>

      {/* 관심사 6개월치 분석 그래프 */}
      <InterestGraphFor6Months
        transactionAnalysisFor6={transactionAnalysisFor6!}
        color={color}
      />

      {/* 또래 비교 분석 */}
      <InterestComparison />

      {/* 카드 추천 */}
      <CardRecommendation />
    </div>
  );
};

export default InterestDetail;
