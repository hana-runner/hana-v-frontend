/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import AlarmCard from "../../components/users/alarmCard";
import { Navbar } from "../../components";

const Alarm = () => {
  useEffect(() => {}, []);
  return (
    <section className="flex flex-col justify-start items-center h-[100vh]">
      <Navbar title="알림" option />
      <div className="flex flex-col itme gap-2 max-h-[91vh] w-full px-5 py-10 overflow-y-scroll">
        <AlarmCard title="애국가" date={new Date()} content="안녕하세요" />
        <AlarmCard
          title="애국가"
          date={new Date()}
          content="Usually never cry at all. I would say I'm pretty tough. But they start playing that song I can't help but to think about us"
        />
        <AlarmCard title="애국가" date={new Date()} content="짱구예요" />
        <AlarmCard title="애국가" date={new Date()} content="짱구예요" />
        <AlarmCard title="애국가" date={new Date()} content="짱구예요" />
        <AlarmCard title="애국가" date={new Date()} content="짱구예요" />
        <AlarmCard title="애국가" date={new Date()} content="짱구예요" />
        <AlarmCard title="애국가" date={new Date()} content="짱구예요" />
        <AlarmCard title="애국가" date={new Date()} content="짱구예요" />
        <AlarmCard title="애국가" date={new Date()} content="짱구예요" />
      </div>
    </section>
  );
};

export default Alarm;
