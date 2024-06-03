import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { transactionType } from "../../types/transaction";
import ApiClient from "../../apis/apiClient";
import Tag from "../common/Tag";
import { categoryType } from "../../types/category";

type ListCardProps = {
  id: string;
};

function ListCard({ id }: ListCardProps) {
  const [list, setList] = useState<transactionType | null>(null);

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
    if (userTransaction && Array.isArray(userTransaction.transactionHistory)) {
      const transaction = userTransaction.transactionHistory
        .find((t: transactionType) => t.id === parseInt(id, 10));
      setList(transaction || null);
    }
  }, [userTransaction, id]);

  if (isTransactionLoading || isCategoryLoading) {
    return <div>Loading...</div>;
  }

  if (transactionError || categoryError) {
    return <div>Error fetching data</div>;
  }

  const category = categories?.categories.find(
    (c: categoryType) => c.id === list?.category_id,
  );

  return (
    <div className="flex justify-center">
      {list ? (
        <div className="w-[326px] h-[135px] mt-[20px] p-[22px] rounded-[20px] shadow-md text-left bg-white flex flex-col">
          <div className="text-hanaSilver text-[8px] mb-[8px]">{new Date(list.created_at).toLocaleString()}</div>
          <div>{list.description}</div>
          <div className="flex justify-between mt-[20px] items-center">
            <Tag title={category?.title || ""} color={category?.color || ""} />
            <p>
              {list.amount}
              원
            </p>
          </div>
        </div>
      ) : (
        <div>No transaction found</div>
      )}
    </div>
  );
}

export default ListCard;
