import React from "react";
import { AccountInfo, Navbar } from "../../components";

function AccountManagement() {
  // 사용자 별 계좌 목록 가져오는 api 호출 코드 구현

  return (
    <section>
      <div>
        <Navbar option={true} logo={false} title="내 계좌관리" path="/" />
        {/* map으로 AccountInfo 생성해주기 */}
        <div className="flex justify-center items-center">
          <AccountInfo />
        </div>
      </div>
    </section>
  );
}

export default AccountManagement;
