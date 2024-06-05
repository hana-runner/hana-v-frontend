import React from "react";
import { BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Tag from "../common/Tag";

type ListCardProps = {
  id: number;
  data: TransactionType;
};

function ListCard({ id, data }: ListCardProps) {
  const navigate = useNavigate();
  const handleCategoryClick = (idx: string) => {
    navigate(`/transaction/detail/${idx}/category`, {
      state: { from: window.location.pathname, transactionId: idx },
    });
  };
  return (
    <div className="flex flex-col items-center">
      {data ? (
        <div className="w-[326px] h-[135px] mt-[20px] p-[22px] rounded-[20px] shadow-md text-left bg-white flex flex-col">
          <div className="text-hanaSilver text-[8px] mb-[8px]">
            {new Date(data.createdAt).toLocaleString()}
          </div>
          <div>{data.description}</div>
          <div className="flex justify-between mt-[20px] items-center">
            <Tag title={data.categoryTitle} color={data.categoryColor} />
            <p
              className={
                data.type === "입금" ? "text-hanaGreen" : "text-hanaRed"
              }
            >
              {`${data.amount.toLocaleString()}원`}
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
              onClick={() => handleCategoryClick(id)}
            />
          </div>
          <Tag title={data.categoryTitle} color={data.categoryColor} />
        </div>
        <div className="flex justify-between my-[8px]">
          <div className="flex">
            <p>관심사</p>
            <BsPencil className="ml-[6px] mt-[3px] text-hanaSilver cursor-pointer" />
          </div>
          <div className="flex flex-row">
            {data.transactionHistoryDetails.map((detail, index) => (
              <div key={index}>
                <Tag
                  title={detail.interest.title}
                  color={detail.interest.color}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between my-[8px]">
          <p>승인번호</p>
          {data.approvalNumber}
        </div>
        <div className="flex justify-between my-[8px]">
          <p>거래유형</p>
          {data.action}
        </div>
        <div className="flex justify-between my-[8px]">
          <p>일시</p>
          {data.createdAt.toLocaleString()}
        </div>
        <div className="flex justify-between my-[8px]">
          <p>거래 후 잔액</p>
          {data.balance.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default ListCard;
