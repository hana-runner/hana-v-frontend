/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { Navbar } from "../../components";
import NotificationCard from "../../components/users/NotificationCard";
import ApiClient from "../../apis/apiClient";

const Notification = () => {
  const [data, setData] = useState<NotificationFetchResType[]>([]);
  const getAlarm = async () => {
    try {
      const res = await ApiClient.getInstance().getAlarms();
      console.log(res);
      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClick = async () => {
    try {
      const res = await ApiClient.getInstance().deleteAlamrs();
      console.log("delete res", res);
      if (res.success) {
        setData([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAlarm();
  }, []);

  return (
    <section className="flex flex-col justify-start items-center h-[100vh]">
      <Navbar title="알림" option path="-1" />
      <button type="button" onClick={() => onClick()}>
        전체 삭제
      </button>
      <div className="flex flex-col itme gap-2 max-h-[91vh] w-full px-5 py-10 overflow-y-scroll">
        {data?.map((item, index) => {
          return (
            <NotificationCard
              title={item.title}
              date={new Date()}
              content={item.message}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Notification;
