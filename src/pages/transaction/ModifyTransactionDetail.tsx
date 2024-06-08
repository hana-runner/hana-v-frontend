import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  CancleBtn,
  Loading,
  ModifyInterest,
  Navbar,
  Tag,
} from "../../components";
import ApiClient from "../../apis/apiClient";

function ModifyTransactionDetail() {
  const location = useLocation();
  const transactionId = location.state?.transactionId;
  const [interestList, setInterestList] = useState<JSX.Element[]>([]);

  function handleSaveClick() {
    return false;
  }

  // 단일 거래내역 가져오기
  const {
    data: transactionHistory,
    isLoading,
    error,
  } = useQuery<TransactionType>({
    queryKey: ["transactionHistory", transactionId], // queryKey 수정
    queryFn: async () => {
      const response = await ApiClient.getInstance().getTransactionHistory(
        Number(transactionId),
      );
      return response;
    },
  });

  console.log(transactionHistory);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return "Error!";
  }

  const addList = () => {
    setInterestList([
      ...interestList,
      <ModifyInterest key={interestList.length} />,
    ]);
  };

  return (
    <section>
      <Navbar title="거래내역수정" option={true} logo={false} path="" />
      <div className="flex flex-col items-center">
        {transactionHistory ? (
          <div className="w-[326px] h-[135px] mt-[20px] p-[22px] rounded-[20px] shadow-md text-left bg-white flex flex-col">
            <div className="text-hanaSilver text-[8px] mb-[8px]">
              {new Date(transactionHistory.createdAt).toLocaleString()}
            </div>
            <div>{transactionHistory.description}</div>
            <div className="flex justify-between mt-[20px] items-center">
              <Tag
                title={transactionHistory.categoryTitle}
                color={transactionHistory.categoryColor}
              />
              <p
                className={
                  transactionHistory.type === "입금"
                    ? "text-hanaGreen"
                    : "text-hanaRed"
                }
              >
                {`${transactionHistory.amount.toLocaleString()}원`}
              </p>
            </div>
          </div>
        ) : (
          <div>No transaction found</div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="max-h-[360px] overflow-y-auto scroll-auto mt-[16px] w-[326px] scrollbar-hide">
          {interestList}
        </div>
        <button
          type="button"
          className="w-[326px] h-[51px] rounded-[20px] mt-[16px] bg-white border-hanaSilver-300 border-2"
          onClick={addList} // 클릭 핸들러를 버튼에 추가
        >
          <div className="flex items-center justify-center">
            <AiOutlinePlusCircle />
          </div>
        </button>
        <div className="fixed bottom-[16px]">
          <CancleBtn />
          <button
            type="button"
            className="w-[144px] h-[48px] rounded-[15px] ml-[12px] text-white bg-hanaGreen"
            onClick={handleSaveClick}
          >
            저장
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModifyTransactionDetail;
