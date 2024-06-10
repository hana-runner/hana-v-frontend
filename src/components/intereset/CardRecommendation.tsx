import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../apis/apiClient";

const CardRecommendation = () => {
  const { interestId } = useParams();

  const { data: cardRecommendation } = useQuery<ApiResponseType<CardType[]>>({
    queryKey: ["cardRecommendation"],
    queryFn: () => {
      const response = ApiClient.getInstance().getCardInfo(Number(interestId));
      return response;
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="text-left">
        <div>카드 추천</div>
        <div className="text-xs text-hanaSilver">관심사에 맞는 카드입니다</div>
      </div>
      <ul>
        {cardRecommendation?.data.map((card) => (
          <li key={card.id} className="flex items-center w-full gap-4">
            <img
              src={card.image}
              className="w-2/5 h-20"
              alt={String(card.id)}
            />
            <div className="w-3/5">
              <div className="text-left border-b border-hanaSilver pb-1">
                {card.name}
              </div>
              <ul className="pt-2">
                {card.cardBenefits.map((benefit, idx) => (
                  <li key={idx} className="w-full text-xs text-left">
                    <span className="w-1/2">{benefit.title} </span>
                    <span className="w-1/2">{benefit.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardRecommendation;
