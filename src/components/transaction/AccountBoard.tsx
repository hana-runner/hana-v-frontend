import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../apis/apiClient";
import accountInfoType from "../../types/account";

const AccountBoard: React.FC = () => {
  const [account, setAccount] = useState<accountInfoType>();
  const { data: userAccount } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getAccounts();
      return response;
    },
  });

  useEffect(() => {
    if (userAccount && Array.isArray(userAccount.accounts)) {
      setAccount(userAccount.accounts[0]); // account id별 정보 가져오기
    }
  }, [account, userAccount]);

  const formattedBalance = account?.balance.toLocaleString();

  return (
    <div className="w-[326px] h-[145px] m-[20px] p-[18px] text-left shadow-md rounded-[20px] bg-white">
      <div>
        <div className="flex items-center">
          <img src="/img/logo3.png" alt="logo3" className="w-[32px] h-[32px]" />
          <p className="ml-[4px] text-[20px]">{account?.account_name}</p>
        </div>
        <p className="mt-[4px] ml-[4px] text-[12px] text-hanaSilver">
          <span className="mr-[8px]">{account?.account_type}</span>
          {account?.account_number}
        </p>
      </div>

      <div className="text-right text-[20px] mt-[24px]">
        <div>
          <span>{formattedBalance}</span>
          원
        </div>
      </div>
    </div>
  );
};

export default AccountBoard;
