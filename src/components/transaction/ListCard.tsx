import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Tag from "../common/Tag";
import ApiClient from "../../apis/apiClient";
import Loading from "../common/Loading";
import { FiMoreHorizontal } from "react-icons/fi";

type ListCardProps = {
  id: string;
};

function ListCard({ id }: ListCardProps) {
  const { accountId } = useParams<{ accountId: string }>(); // accountId
  const navigate = useNavigate();
  const [showAllTags, setShowAllTags] = useState(false);
  const queryClient = useQueryClient();

  const handleCategoryClick = (idx: string) => {
    navigate(`/transaction/${accountId}/detail/${idx}/category`, {
      state: { from: window.location.pathname, transactionId: idx },
    });
  };

  const handleInterestClick = (idx: string) => {
    navigate(`/transaction/${accountId}/detail/${idx}/interest`, {
      state: { from: window.location.pathname, transactionId: idx },
    });
  };

  const {
    data: transactionHistory,
    isLoading,
    error,
  } = useQuery<TransactionType>({
    queryKey: ["transactionHistory", id],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getTransactionHistory(
        Number(id),
      );
      return response;
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["transactionHistory", id] });
  }, [id, queryClient]);

  const toggleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return "Error!";
  }

  const renderTags = () => {
    if (!transactionHistory?.transactionHistoryDetails) return null;

    // 중복된 interest title 제거
    const uniqueDetails = Array.from(
      new Map(
        transactionHistory.transactionHistoryDetails.map((detail) => [
          detail.interest.interestId,
          detail,
        ]),
      ).values(),
    );

    const tags = uniqueDetails.map((detail, index) => (
      <div key={index}>
        <Tag title={detail.interest.title} color={detail.interest.color} />
      </div>
    ));

    if (tags.length > 2 && !showAllTags) {
      return (
        <>
          {tags.slice(0, 2)}
          <button
            type="button"
            className="text-hanaSilver"
            onClick={toggleShowAllTags}
          >
            <FiMoreHorizontal />
          </button>
        </>
      );
    }
    return tags;
  };

  return (
    <div className="flex flex-col items-center">
      {transactionHistory ? (
        <div className="w-[326px] mt-[20px] p-[22px] rounded-[20px] shadow-md text-left bg-white flex flex-col">
          <div className="text-hanaSilver text-[8px] mb-[8px]">
            {new Date(transactionHistory.createdAt).toLocaleString()}
          </div>
          <div>{transactionHistory.description}</div>
          <div className="flex mt-[20px] items-top justify-between">
            <div className="flex flex-raw flex-wrap max-w-48">
              <Tag
                title={transactionHistory.categoryTitle}
                color={transactionHistory.categoryColor}
              />
              {renderTags()}
            </div>
            <p
              className={
                transactionHistory.action === "입금"
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
          <div className="flex flex-row">
            <p>관심사</p>
            <BsPencil
              className="ml-[6px] mt-[3px] text-hanaSilver cursor-pointer"
              onClick={() =>
                handleInterestClick(transactionHistory?.id.toString())
              }
            />
          </div>
          <div className="flex flex-wrap max-w-[200px] justify-end">
            {renderTags()}
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
          {new Date(transactionHistory?.createdAt).toLocaleString()}
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
