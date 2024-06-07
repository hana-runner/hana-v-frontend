import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";

interface ItemType {
  id?: number;
  title: string;
}
interface SelectBoxType {
  items: ItemType[];
  placeholder: string;
  getValue?: (item: string) => void;
}

const SelectBox = ({ items, placeholder, getValue }: SelectBoxType) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (getValue) {
      getValue(e.target.value);
    }
  };

  return (
    <div className="relative inline-block w-full">
      <select
        className="block appearance-none w-full text-hanaSilver font-hanaRegular bg-[#F6F6F6] border border-hanaGreen hover:border-hanaGreen px-3 py-2 pr-4 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
        defaultValue="1"
        onChange={handleChange}
      >
        <option value="1" disabled className="text-base">
          {placeholder}
        </option>
        {items.map((item) => (
          <option
            className="text-hanaBlack text-base"
            key={item.id}
            value={`${item.id} ${item.title}`}
          >
            {item.title}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <BiSolidDownArrow className="fill-current h-3 w-3 text-hanaGreen" />
      </div>
    </div>
  );
};
export default SelectBox;
