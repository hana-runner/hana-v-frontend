import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AccountInfo, Navbar } from "../../components";
import ApiClient from "../../apis/apiClient";

function AccountManagement() {
  const navigate = useNavigate();

  // 사용자 별 계좌 목록 가져오기
  const { data: accounts } = useQuery<AccountType[]>({
    queryKey: ["userAccount"],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getAccounts();
      return response.data;
    },
  });
  const handleNavigate = () => {
    navigate("/add_account");
  };

  return (
    <section>
      <div>
        <Navbar option={true} logo={false} title="내 계좌관리" path="/menu" />
        {/* map으로 AccountInfo 생성해주기 */}
        <div className="flex flex-col justify-center items-center over w-max-[540px] overflow-y-scroll scrollbar-hide">
          {accounts &&
            accounts.map((account) => (
              <AccountInfo
                key={account.id}
                accountId={account.id}
                accountTitle={account.accountName}
                accountNumber={account.accountNumber}
                accountBankName={account.bankName}
              />
            ))}
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="w-[346px] h-[51px] mt-[24px] bg-white rounded-[24px] flex justify-center items-center"
            onClick={() => handleNavigate()}
          >
            <AiOutlinePlusCircle className="text-hanaSilver" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AccountManagement;
