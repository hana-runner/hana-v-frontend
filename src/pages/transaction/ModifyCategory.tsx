import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CancleBtn, CategoryBtn, Navbar } from "../../components";
import { categoryType } from "../../types/category";
import ApiClient from "../../apis/apiClient";

const ModifyCategory: React.FC = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const { data: categoryList } = useQuery({
    queryKey: ["categoryList"],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getCategories();
      return response;
    },
  });

  useEffect(() => {
    if (categoryList && Array.isArray(categoryList.categories)) {
      setCategories(categoryList.categories);
    }
  }, [categoryList]);

  const handleCategoryClick = (id: number) => {
    setSelectedCategoryId(id);
  };

  return (
    <section>
      <Navbar title="카테고리" option={true} logo={false} path="/transaction/detail/0" />
      <div className="mt-[20px] pb-[10px] h-[520px] overflow-y-scroll scrollbar-hide">
        {categories.map((c: categoryType) => (
          <CategoryBtn
            key={c.id}
            id={c.id}
            text={c.title}
            selected={c.id === selectedCategoryId}
            onClick={handleCategoryClick}
          />
        ))}
      </div>
      <div className="flex justify-between mx-[45px] mt-[60px]">
        <CancleBtn />
        <button type="button" className="w-[210px] h-[48px] rounded-[15px] text-white bg-hanaGreen shadow-md">
          저장
        </button>
      </div>
    </section>
  );
};

export default ModifyCategory;
