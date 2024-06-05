import React from "react";
import { BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Tag from "../common/Tag";
import { categoryType } from "../../types/category";

type ListCardProps = {
  id: string;
  data: TransactionType;
  category: categoryType;
};

function ListCard({ id, data, category }: ListCardProps) {
  // const [list, setList] = useState<transactionType | null>(null);
  const navigate = useNavigate();

  // // 거래 내역
  // const {
  //   data: userTransaction,
  //   isLoading: isTransactionLoading,
  //   error: transactionError,
  // } = useQuery({
  //   queryKey: ["transaction"],
  //   queryFn: async () => {
  //     const response = await ApiClient.getInstance()
  //       .getTransactions(accountId, option, sort, start, end);
  //     return response.data.transactionHistory
  //       .find((t: transactionType) => t.id === parseInt(id, 10));
  //   },
  // });

  // // 카테고리 가져오기
  // const { data: categories, isLoading: isCategoryLoading, error: categoryError } = useQuery({
  //   queryKey: ["category"],
  //   queryFn: async () => {
  //     const response = await ApiClient.getInstance().getCategories();
  //     return response;
  //   },
  // });

  // useEffect(() => {
  //   if (userTransaction && Array.isArray(userTransaction.data.transactionHistory)) {
  //     const transaction = userTransaction.data.transactionHistory
  //       .find((t: transactionType) => t.id === parseInt(id, 10));
  //     setList(transaction || null);
  //   }
  // }, [userTransaction, id]);

  // if (isTransactionLoading || isCategoryLoading) {
  //   return <Loading />;
  // }

  // if (transactionError || categoryError) {
  //   return <div>Error fetching data</div>;
  // }

  // const category = categories?.categories.find(
  //   (c: categoryType) => c.id === list?.category_id,
  // );

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
            {new Date(data.created_at).toLocaleString()}
          </div>
          <div>{data.description}</div>
          <div className="flex justify-between mt-[20px] items-center">
            <Tag title={category?.title || ""} color={category?.color || ""} />
            <p>{`${data.amount.toLocaleString()}원`}</p>
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
          {data?.num}
        </div>
        <div className="flex justify-between my-[8px]">
          <p>거래유형</p>
          {data?.action}
        </div>
        <div className="flex justify-between my-[8px]">
          <p>일시</p>
          {data?.created_at.toLocaleString()}
        </div>
        <div className="flex justify-between my-[8px]">
          <p>거래 후 잔액</p>
          {data?.balance.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default ListCard;
