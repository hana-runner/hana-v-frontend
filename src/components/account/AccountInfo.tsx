import React from "react";
import { BsTrash3 } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import ApiClient from "../../apis/apiClient";

interface AccountInfoProps {
  accountId: number;
  accountTitle: string;
  accountNumber: string;
  accountBankName: string;
}

function AccountInfo({
  accountId,
  accountTitle,
  accountNumber,
  accountBankName,
}: AccountInfoProps) {
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deleteAccount = useMutation({
    mutationFn: async () => {
      const response = ApiClient.getInstance().deleteAccountInfo(accountId);
      console.log(response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userAccount"]);
      navigate("/manage_account");
      console.log("계좌 삭제 성공");
    },
    onError: (error) => {
      console.log("계좌 삭제 실패", error);
    },
  });
  const handleConfirmDelete = () => {
    openModal(
      "등록된 계좌를 삭제하시겠습니까?",
      () => {
        deleteAccount.mutate();
      },
      true,
    );
  };
  return (
    <div className="w-[348px] h-[156px] bg-white rounded-[24px] p-[20px] mt-[24px] border-hanaSilver-300 border-2">
      <div className="flex justify-between border-b-2">
        <p className="text-[18px] font-hanaMedium">{accountTitle}</p>
        <BsTrash3
          className="text-hanaSilver cursor-pointer"
          onClick={() => handleConfirmDelete()}
        />
      </div>
      <p className="mt-[12px] text-left text-[16px]">{accountNumber}</p>
      <p className="text-[17px] text-right mt-[28px]">{accountBankName}</p>
    </div>
  );
}

export default AccountInfo;
