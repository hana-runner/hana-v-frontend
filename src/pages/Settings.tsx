import React from "react";
import { Navbar } from "../components";
import ToggleBtn from "../components/common/ToggleBtn";

function Settings() {
  return (
    <section>
      <Navbar title="설정" option={true} logo={false} path="/menu" />
      <div className="mx-[32px] mt-[22px]">
        <p className="font-hanaBold text-[17px] text-left">알림 설정</p>
        <div className="flex justify-between mt-[26px]">
          <p>앱 알림</p>
          <ToggleBtn />
        </div>
        <div className="flex justify-between mt-[26px]">
          <p>이메일 알림</p>
          <ToggleBtn />
        </div>
      </div>
    </section>
  );
}

export default Settings;
