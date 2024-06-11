import React from "react";

const InterestComparison = ({
  interestComparison,
}: {
  interestComparison: ApiResponseType<InterestComparisonType[]>;
}) => {
  const largestDifference = interestComparison?.data.reduce((max, current) => {
    return current.difference > max.difference ? current : max;
  }, interestComparison.data[0]);

  const formatDifference = (difference: number) => {
    if (difference <= 10000) {
      return "1만원";
    }
    const roundedDifference = Math.round(difference / 5000) * 5000;
    return `${roundedDifference.toLocaleString()}원`;
  };

  return (
    <div>
      <div className="text-left">
        <div className="text-hanaSilver">
          {`또래 ${largestDifference?.gender === "MALE" ? "남자" : "여자"} 평균 대비 `}
        </div>
        <span className="text-hanaGreen font-hanaBold">
          {largestDifference?.categoryTitle}
        </span>
        <span>에 지출이 많은 편이에요</span>
      </div>
      <ul>
        {interestComparison?.data.map((item) => (
          <li
            key={item.categoryId}
            className="flex justify-between items-center my-4"
          >
            <div>{item.categoryTitle}</div>
            <div className="text-right">
              <div>{item.expense.toLocaleString("KR-kr")}원</div>
              <div
                className={`text-xs ${item.difference >= 0 ? "text-hanaRed" : "text-hanaGreen"}`}
              >
                평균보다 {formatDifference(item.difference)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterestComparison;
