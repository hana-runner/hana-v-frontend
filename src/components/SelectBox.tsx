/* eslint-disable react/react-in-jsx-scope */
import { BiSolidDownArrow } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

interface SelectBoxType {
  items: string[];
  placeholder?: string;
}

const SelectBox = ({ items, placeholder }: SelectBoxType) => {
  return (
    <div className="relative inline-block w-72">
      <select
        className="block appearance-none w-full text-hanaSilver font-hanaRegular bg-[#F6F6F6] border border-hanaGreen hover:border-hanaGreen px-3 py-2 pr-4 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
        defaultValue=""
      >
        <option value="" disabled selected className="text-base">
          {placeholder || "Select an option"}
        </option>
        {items.map((item, index) => (
          <option className="text-hanaBlack text-base" key={index} value={item}>
            {item}
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
