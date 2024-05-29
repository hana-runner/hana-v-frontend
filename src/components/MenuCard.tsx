interface MenuCardType {
  color: string;
  title: string;
  description: string;
  clickHandler: () => void;
}

const MenuCard = ({
  color,
  title,
  description,
  clickHandler,
}: MenuCardType) => {
  return (
    <div
      className="h-32 shadow-md rounded-2xl mx-4 my-8 p-8"
      style={{ backgroundColor: color }}
      onClick={clickHandler}
    >
      <div className="flex flex-col items-start gap-2">
        <span className="font-hanaMedium text-left text-white">{title}</span>
        <span className="font-hanaRegular text-xs text-left text-white w-2/3">
          {description}
        </span>
      </div>
    </div>
  );
};

export default MenuCard;
