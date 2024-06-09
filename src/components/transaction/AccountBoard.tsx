import React from "react";

interface AccountBoardProps {
  data: AccountType[];
  accountId: number;
}

const AccountBoard: React.FC<AccountBoardProps> = ({ data, accountId }) => {
  const accountData = data.find((account) => account.id === accountId);
  const formattedBalance = accountData?.balance.toLocaleString();

  return (
    <div className="w-[326px] h-[145px] m-[20px] p-[18px] text-left shadow-md rounded-[20px] bg-white">
      <div>
        <div className="flex items-center">
          <img src="/img/logo3.png" alt="logo3" className="w-[32px] h-[32px]" />
          <p className="ml-[4px] text-[20px]">{accountData?.accountName}</p>
        </div>
        <p className="mt-[4px] ml-[4px] text-[12px] text-hanaSilver">
          <span className="mr-[8px]">{accountData?.accountType}</span>
          {accountData?.accountNumber}
        </p>
      </div>

      <div className="text-right text-[20px] mt-[24px]">
        <div>
          <span>{`${formattedBalance}원`}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountBoard;
