import React from "react";
import { useParams } from "react-router-dom";
import { ListCard, Navbar } from "../components";

function TransactionDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <section>
      <Navbar option={true} title="거래내역상세" logo={false} />
      <ListCard id={id!} />
    </section>
  );
}

export default TransactionDetail;
