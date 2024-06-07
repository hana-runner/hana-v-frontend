/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { Navbar } from "../../components";

const Notification = () => {
  useEffect(() => {}, []);
  return (
    <section className="flex flex-col justify-start items-center h-[100vh]">
      <Navbar title="알림" option />
      <div className="flex flex-col itme gap-2 max-h-[91vh] w-full px-5 py-10 overflow-y-scroll">
        <NotificationCard
          title="애국가"
          date={new Date()}
          content="안녕하세요"
        />
        <NotificationCard title="애국가" date={new Date()} content="짱구예요" />
        <NotificationCard title="애국가" date={new Date()} content="짱구예요" />
        <NotificationCard title="애국가" date={new Date()} content="짱구예요" />
        <NotificationCard title="애국가" date={new Date()} content="짱구예요" />
        <NotificationCard title="애국가" date={new Date()} content="짱구예요" />
        <NotificationCard title="애국가" date={new Date()} content="짱구예요" />
        <NotificationCard title="애국가" date={new Date()} content="짱구예요" />
        <NotificationCard title="애국가" date={new Date()} content="짱구예요" />
        <NotificationCard title="애국가" date={new Date()} content="짱구예요" />
      </div>
    </section>
  );
};

export default Notification;
