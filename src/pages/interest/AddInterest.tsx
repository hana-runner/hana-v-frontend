import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../apis/apiClient";
import ImageApiClient from "../../apis/imageApiClient";
import {
  ImageUploader,
  InterestSubtitle,
  Navbar,
  SelectBox,
} from "../../components";
import { BsCamera } from "react-icons/bs";
import { useModal } from "../../context/ModalContext";

const AddInterest = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [interestInfo, setInterestInfo] = useState({
    interestId: 0,
    title: "",
    subtitle: "",
    imageUrl: "",
  });
  const [file, setFile] = useState<File>();

  const { data: interestList } = useQuery<ApiResponseType<InterestType[]>>({
    queryKey: ["interestList"],
    queryFn: () => {
      const response = ApiClient.getInstance().getInterestList();
      return response;
    },
  });

  const addInterest = useMutation({
    mutationFn: async (formData: FormData) => {
      const response =
        await ImageApiClient.getInstance().addUserInterest(formData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInterests"] });
      navigate("/interests");
    },
    onError: (error) => {
      openModal(error.message);
    },
  });

  const { openModal } = useModal();

  const getValue = (values: string) => {
    const [id, title] = values.split(" ");
    setInterestInfo({ ...interestInfo, interestId: Number(id), title });
  };

  const handlesubtitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInterestInfo({ ...interestInfo, subtitle: value });
  };

  const handleImageChange = (file: File, url: string) => {
    setFile(file);
    setInterestInfo((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    if (name === "cancel") {
      navigate("/interests");
    }

    if (name === "ok") {
      const formData = new FormData();
      formData.append("interestId", interestInfo.interestId.toString());
      formData.append("subtitle", interestInfo.subtitle);
      if (file) {
        formData.append("image", file);
      } else {
        formData.append("image", new Blob());
      }

      openModal(
        "관심사를 추가하시겠습니까?",
        () => addInterest.mutate(formData),
        true,
      );
    }
  };

  return (
    <section>
      <Navbar title="관심사 추가" path="/interests" option />

      {/* 관심사 지정 */}
      <div className="bg-white">
        <div className="mx-6 my-4">
          <div className="flex flex-col gap-4 pt-4 pb-6">
            <p className="text-left">관심사 지정</p>
            <SelectBox
              items={interestList?.data || []}
              placeholder="관심사를 선택해주세요"
              getValue={getValue}
            />
          </div>
        </div>
      </div>

      {/* 관심사 부연 설명 */}
      <InterestSubtitle
        placeholder="내 집 마련 가자 !"
        onChange={handlesubtitle}
      />

      {/* 이미지 */}
      <div className="bg-white">
        <div className="mx-6 my-4">
          <ImageUploader
            userInterest={interestInfo}
            onImageChange={handleImageChange}
          >
            <label
              htmlFor="file"
              className="absolute top-5 left-28 cursor-pointer"
            >
              <BsCamera />
            </label>
          </ImageUploader>
        </div>
      </div>

      {/* 취소 / 추가 버튼 */}
      <div className="flex gap-4 justify-center mb-4 w-full">
        <button
          type="button"
          name="cancel"
          className="btn-cancel w-5/12"
          onClick={handleClick}
        >
          취소
        </button>
        <button
          type="button"
          name="ok"
          className="btn-primary w-5/12"
          onClick={handleClick}
        >
          추가
        </button>
      </div>
    </section>
  );
};

export default AddInterest;
