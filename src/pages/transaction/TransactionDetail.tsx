import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ListCard, Loading, Navbar } from "../../components";
import ApiClient from "../../apis/apiClient";
import { transactionType } from "../../types/transaction";
import { categoryType } from "../../types/category";

function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const { accountId } = useParams<{ accountId: string }>();
  const [transactionData, setTransactionData] = useState<transactionType[]>([]);

  // 거래 내역
  const {
    data: userTransaction,
    isLoading: isTransactionLoading,
    error: transactionError,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const response = await ApiClient.getInstance()
        .getTransactions(Number(accountId), option, sort, start, end);
      return response.data.transactionHistory
        .find((t: transactionType) => t.id === parseInt(id, 10));
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

  if (isTransactionLoading || isCategoryLoading) {
    return <Loading />;
  }

  if (transactionError || categoryError) {
    return <div>Error fetching data</div>;
  }

  const category = categories?.categories.find(
    (c: categoryType) => c.id === userTransaction?.category_id,
  );

  return (
    <section>
      <Navbar option={true} title="거래내역상세" logo={false} path="/transaction" />
      {transactionData && <ListCard id={id!} data={transactionData} categoy={category} />}
    </section>
  );
}

export default TransactionDetail;
