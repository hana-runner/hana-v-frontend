/* eslint-disable react/react-in-jsx-scope */
interface Prop {
  title: string;
  date: Date;
  content: string;
}
const NotificationCard = ({ title, date, content }: Prop) => {
  return (
    <section className="bg-white rounded-2xl drop-shadow-md px-6 py-2 h-[112px] min-h-[90px] ">
      {/* 상단 알람 제목과 시간 */}
      <div className="flex justify-between items-center pt-3 pb-1 max-h-8">
        <div className="font-bold">{title}</div>
        <div className="text-end text-xs text-hanaSilver">
          {date.toDateString()}
        </div>
      </div>

      {/* content */}
      <div className="text-start text-sm pt-2 pb-5 2">
        <div className="line-clamp-2">{content}</div>
      </div>
    </section>
  );
};

export default NotificationCard;
