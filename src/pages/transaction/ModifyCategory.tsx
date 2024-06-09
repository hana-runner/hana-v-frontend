import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { CancleBtn, CategoryBtn, Navbar } from "../../components";
import ApiClient from "../../apis/apiClient";

interface CategoryType {
  id: number;
  title: string;
  color: string;
}

const ModifyCategory: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const location = useLocation();
  const navigate = useNavigate();
  const previousUrl = location.state?.from;
  const transactionId = location.state?.transactionId;
  const queryClient = useQueryClient();

  // public의 category 정보 가져오기
  useEffect(() => {
    fetch("/categoriesData.json")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories)) // categories 배열로 접근
      .catch((error) => console.error("Error", error));
  }, []);

  const updateCategory = useMutation({
    mutationFn: async () => {
      if (transactionId !== undefined && selectedCategoryId !== null) {
        const response =
          await ApiClient.getInstance().updateTransactionCategory(
            transactionId,
            selectedCategoryId,
          );
        return response;
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["transactionHistory", transactionId]);
      navigate(previousUrl);
    },
  });

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
        {categories.map((c: CategoryType) => (
          <CategoryBtn
            key={c.id}
            id={c.id}
            text={c.title}
            selected={c.id === selectedCategoryId}
            onClick={() => handleCategoryClick(c.id)}
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
