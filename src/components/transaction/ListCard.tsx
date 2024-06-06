import React from "react";
import { BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Tag from "../common/Tag";
import ApiClient from "../../apis/apiClient";
import Loading from "../common/Loading";

type ListCardProps = {
  id: string;
};

function ListCard({ id }: ListCardProps) {
  const navigate = useNavigate();
  const handleCategoryClick = (idx: string) => {
    navigate(`/transaction/detail/${idx}/category`, {
      state: { from: window.location.pathname, transactionId: idx },
    });
  };

  // 단일 거래내역 가져오기
  const {
    data: transactionHistory,
    isLoading,
    error,
  } = useQuery<TransactionType>({
    queryKey: ["transactionHistory", id], // queryKey 수정
    queryFn: async () => {
      const response = await ApiClient.getInstance().getTransactionHistory(
        Number(id),
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

  return (
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
      <div className="bg-white rounded-[20px] shadow-md px-[16px] py-[28px] mt-[24px] w-[326px] h-[298px] flex flex-col">
        <div className="flex justify-between my-[8px]">
          <div className="flex">
            <p>카테고리</p>
            <BsPencil
              className="ml-[6px] mt-[3px] text-hanaSilver cursor-pointer"
              onClick={() =>
                handleCategoryClick(transactionHistory?.id.toString())
              }
            />
          </div>
          <Tag
            title={transactionHistory?.categoryTitle}
            color={transactionHistory?.categoryColor}
          />
        </div>
        <div className="flex justify-between my-[8px]">
          <div className="flex">
            <p>관심사</p>
            <BsPencil
              className="ml-[6px] mt-[3px] text-hanaSilver cursor-pointer"
              onClick={handleInterestClick()}
            />
          </div>
          <div className="flex flex-row">
            {transactionHistory?.transactionHistoryDetails.map(
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
        </div>
        <div className="flex justify-between my-[8px]">
          <p>승인번호</p>
          {transactionHistory?.approvalNumber}
        </div>
        <div className="flex justify-between my-[8px]">
          <p>거래유형</p>
          {transactionHistory?.action}
        </div>
        <div className="flex justify-between my-[8px]">
          <p>일시</p>
          {transactionHistory?.createdAt.toLocaleString()}
        </div>
        <div className="flex justify-between my-[8px]">
          <p>거래 후 잔액</p>
          {transactionHistory?.balance.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default ListCard;
