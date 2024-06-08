import React, { useEffect, useState } from "react";
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

interface InterestDetail {
  id: number;
  amount: number;
  description: string;
}

function ModifyTransactionDetail() {
  const location = useLocation();
  const transactionId = location.state?.transactionId;
  const [interestList, setInterestList] = useState<InterestDetail[]>([]);
  const [currAmount, setCurrAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const previousUrl = location.state?.from;

  function handleSaveClick() {
    if (!errorMessage) {
      // Save logic goes here
      console.log("Transaction saved");
    }
  }

  // 단일 거래내역 가져오기
  const {
    data: transactionHistory,
    isLoading,
    error,
  } = useQuery<TransactionType>({
    queryKey: ["transactionHistory", transactionId],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getTransactionHistory(
        Number(transactionId),
      );
      return response;
    },
  });

  const handleAmountChange = (id: number, newAmount: number) => {
    const newInterestList = interestList.map((detail) =>
      detail.id === id ? { ...detail, amount: newAmount } : detail,
    );

    const totalAmount = newInterestList.reduce(
      (sum, detail) => sum + detail.amount,
      0,
    );

    if (transactionHistory && totalAmount > transactionHistory.amount) {
      setErrorMessage("입력한 금액을 확인해주세요");
    } else if (transactionHistory) {
      setErrorMessage("");
      setCurrAmount(transactionHistory.amount - totalAmount);
      setInterestList(newInterestList);
    }
  };

  useEffect(() => {
    if (transactionHistory) {
      setCurrAmount(transactionHistory.amount);
      const details = transactionHistory.transactionHistoryDetails.map(
        (detail) => ({
          id: detail.index,
          amount: detail.amount,
          description: detail.description,
        }),
      );
      setInterestList(details);
    }
  }, [transactionHistory]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return "Error!";
  }

  const addList = () => {
    if (currAmount <= 0) {
      setErrorMessage("더 이상 목록을 추가하실 수 없습니다.");
      return;
    }
    const newInterest = {
      id: interestList.length,
      amount: 0,
      description: "",
    };
    setInterestList([...interestList, newInterest]);
  };

  return (
    <section>
      <Navbar
        title="거래내역수정"
        option={true}
        logo={false}
        path={previousUrl}
      />
      <div className="flex flex-col items-center">
        {transactionHistory ? (
          <div className="w-[326px] h-[135px] mt-[20px] p-[22px] rounded-[20px] shadow-md text-left bg-white flex flex-col">
            <div className="text-hanaSilver text-[8px] mb-[8px]">
              {new Date(transactionHistory.createdAt).toLocaleString()}
            </div>
            <div>{transactionHistory.description}</div>
            <div className="flex justify-between mt-[20px] items-center">
              <div className="flex flex-row">
                <Tag
                  title={transactionHistory.categoryTitle}
                  color={transactionHistory.categoryColor}
                />
                {transactionHistory.transactionHistoryDetails.map(
                  (detail, index) => (
                    <div key={index}>
                      <Tag
                        title={detail.interest.title}
                        color={detail.interest.color}
                      />
                    </div>
                  ),
                )}
              </div>
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
        <div className="max-h-[330px] overflow-y-auto scroll-auto mt-[16px] w-[326px] scrollbar-hide">
          {interestList.map((detail) => (
            <ModifyInterest
              key={detail.id}
              amount={detail.amount}
              description={detail.description}
              onAmountChange={(amount) => handleAmountChange(detail.id, amount)}
            />
          ))}
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        <button
          type="button"
          className="w-[326px] h-[51px] rounded-[20px] mt-[16px] bg-white border-hanaSilver-300 border-2"
          onClick={addList}
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
            disabled={!!errorMessage}
          >
            저장
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModifyTransactionDetail;
