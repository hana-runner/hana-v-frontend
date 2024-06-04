import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { CancleBtn, CategoryBtn, Navbar } from "../../components";
import { categoryType } from "../../types/category";
import ApiClient from "../../apis/apiClient";

const ModifyCategory: React.FC = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const previousUrl = location.state?.from;
  const transactionId = location.state?.transactionId;

  const { data: categoryList } = useQuery({
    queryKey: ["categoryList"],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getCategories();
      return response;
    },
  });

  const updateCategory = useMutation({
    mutationFn: async () => {
      if (transactionId !== undefined && selectedCategoryId !== null) {
        await ApiClient.getInstance().updateTransactionCategory(transactionId, selectedCategoryId);
      }
    },
    onSuccess: () => {
      navigate(previousUrl);
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

  const handleSaveClick = () => {
    updateCategory.mutate();
  };

  return (
    <section>
      <Navbar title="카테고리" option={true} logo={false} path={previousUrl} />
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
        <button
          type="button"
          className="w-[144px] h-[48px] rounded-[15px] text-white bg-hanaGreen"
          onClick={handleSaveClick}
        >
          수정
        </button>
      </div>
    </section>
  );
};

export default ModifyCategory;
