import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { transactionType } from "../../types/transaction";
import ApiClient from "../../apis/apiClient";
import Tag from "../common/Tag";
import { categoryType } from "../../types/category";
import Loading from "../common/Loading";

type ListCardProps = {
  id: string;
};

function ListCard({ id }: ListCardProps) {
  const [list, setList] = useState<transactionType | null>(null);
  const navigate = useNavigate();

  // 거래 내역
  const {
    data: userTransaction,
    isLoading: isTransactionLoading,
    error: transactionError,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getTransactions();
      return response;
    },
  });

  // 카테고리 가져오기
  const { data: categories, isLoading: isCategoryLoading, error: categoryError } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getCategories();
      return response;
    },
  });

  useEffect(() => {
    if (userTransaction && Array.isArray(userTransaction.data.transactionHistory)) {
      const transaction = userTransaction.data.transactionHistory
        .find((t: transactionType) => t.id === parseInt(id, 10));
      setList(transaction || null);
    }
  }, [userTransaction, id]);

  if (isTransactionLoading || isCategoryLoading) {
    return <Loading />;
  }

  if (transactionError || categoryError) {
    return <div>Error fetching data</div>;
  }

  const category = categories?.categories.find(
    (c: categoryType) => c.id === list?.category_id,
  );

  const handleCategoryClick = (idx: string) => {
    navigate(`/transaction/detail/${idx}/category`, {
      state: { from: window.location.pathname, transactionId: idx },
    });
  };

  return (
    <div className="flex flex-col items-center">
      {list ? (
        <div className="w-[326px] h-[135px] mt-[20px] p-[22px] rounded-[20px] shadow-md text-left bg-white flex flex-col">
          <div className="text-hanaSilver text-[8px] mb-[8px]">{new Date(list.created_at).toLocaleString()}</div>
          <div>{list.description}</div>
          <div className="flex justify-between mt-[20px] items-center">
            <Tag title={category?.title || ""} color={category?.color || ""} />
            <p>
              {list.amount.toLocaleString()}
              원
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
              className="ml-[6px] mt-[3px] text-hanaSilver"
              onClick={() => handleCategoryClick(id)}
            />
          </div>
          <Tag title={category?.title || ""} color={category?.color || ""} />
        </div>
        <div className="flex justify-between my-[8px]">
            <div className="flex">
              <p>관심사</p>
              <BsPencil className="ml-[6px] mt-[3px] text-hanaSilver" />
            </div>

        </div>
        <div className="flex justify-between my-[8px]">
            <p>승인번호</p>
            {list?.num}
        </div>
        <div className="flex justify-between my-[8px]">
            <p>거래유형</p>
            {list?.action}
        </div>
        <div className="flex justify-between my-[8px]">
            <p>일시</p>
            {list?.created_at.toLocaleString()}
        </div>
        <div className="flex justify-between my-[8px]">
            <p>거래 후 잔액</p>
            {list?.balance.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default ListCard;
