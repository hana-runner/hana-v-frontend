import { IoIosArrowDown } from "react-icons/io";

interface CategorySelectType {
  categories: string[];
  defaultValue?: string;
}

const CategorySelect = ({ categories, defaultValue }: CategorySelectType) => {
  return (
    <div className="relative inline-block w-20">
      <select
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-2 py-2 pr-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-xs"
        defaultValue={defaultValue || ""}
      >
        {defaultValue && (
          <option value="" disabled>
            {defaultValue}
          </option>
        )}
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <IoIosArrowDown className="fill-current h-3 w-3" />
      </div>
    </div>
  );
};
export default CategorySelect;
