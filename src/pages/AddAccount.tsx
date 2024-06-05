import React, { useState } from "react";
import { Modal, Navbar, SelectBox } from "../components";

const banks = [
  { title: "하나은행" },
  { title: "국민은행" },
  { title: "우리은행" },
  { title: "NH농협은행" },
  { title: "토스뱅크" },
  { title: "카카오뱅크" },
];

const AddAccount = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section>
      {openModal && (
        <Modal
          option={false}
          message="등록되었습니다!"
          modalToggle={() => setOpenModal(!openModal)}
        />
      )}
      <Navbar logo={false} title="계좌 추가" option={true} />
      <div className="h-[90vh] bg-white px-12 py-4 mt-4 flex flex-col justify-between">
        <div className="flex flex-col items-start gap-4">
          <span className="font-hanaMedium">계좌 등록</span>
          <SelectBox items={banks} placeholder="은행을 선택해주세요" />
          <div className="flex flex-col mt-2 gap-1">
            <input
              placeholder="계좌번호를 입력해주세요"
              className="placeholder-hanaSilver w-72 border-b-2 px-4 py-1 border-hanaGreen focus:outline-none"
            />
            <div className="text-hanaSilver font-hanaRegular text-xs text-right">
              *계좌번호는 ‘-’ 없이 숫자로만 입력해주세요
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="btn-primary w-72"
            onClick={() => setOpenModal(true)}
          >
            등록
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddAccount;
