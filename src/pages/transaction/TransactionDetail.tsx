import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ListCard, Loading, Navbar } from "../../components";
import ApiClient from "../../apis/apiClient";

function TransactionDetail() {
  const { id } = useParams<{ id: string }>(); // transactionHistoryId

  // 단일 거래내역 가져오기
  const {
    data: transactionHistory,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactionHisotry", id],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getTransactionHistory(
        Number(id),
      );
      return response;
    },
  });

  const historyData = transactionHistory || [];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return "Error!";
  }

  return (
    <section>
      <Navbar
        option={true}
        title="거래내역상세"
        logo={false}
        path="/transaction"
      />
      {transactionHistory && <ListCard id={Number(id)} data={historyData} />}
    </section>
  );
}

export default TransactionDetail;
