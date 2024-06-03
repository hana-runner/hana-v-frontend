import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  HiOutlineInformationCircle,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import ApiClient from "../../apis/apiClient";
import ImageApiClient from "../../apis/imageApiClient";
import { Modal, Navbar, SelectBox, Tooltip } from "../../components";

const AddInterest = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [interestInfo, setInterestInfo] = useState({
    id: 0,
    title: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  const { data: interestList } = useQuery<BasicResultApiType<InterestType[]>>({
    queryKey: ["interestList"],
    queryFn: () => {
      const response = ApiClient.getInstance().getInterestList();
      return response;
    },
  });

  const getValue = (values: string) => {
    const [id, title] = values.split(" ");
    setInterestInfo({ ...interestInfo, id: Number(id), title });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      return;
    }

    if (files.length > 0) {
      const file = files[0];
      if (file.size > 1024 * 1024 * 2) {
        setOpenModal(true);
        return;
      }
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    const description = inputRef.current?.value;

    if (name === "cancel") {
      navigate("/interests");
    }

    if (name === "ok") {
      const response = ImageApiClient.getInstance().addUserInterest({
        interestId: interestInfo.id,
        title: interestInfo.title,
        description: description!,
        imageUrl,
      });

      console.log(response);
    }
  };

  return (
    <section>
      {openModal && (
        <Modal
          option={false}
          message="이미지 용량을 초과하였습니다."
          modalToggle={() => setOpenModal(!openModal)}
        />
      )}
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
      <div className="bg-white">
        <div className="mx-6 my-4">
          <div className="flex flex-col gap-4 pt-4 pb-6">
            <div className="flex gap-2">
              <p className="text-left">관심사 설명</p>
              <Tooltip message="무엇을 위한 소비인지에 대한 설명입니다. 예) 에스파를 위한 소비">
                <HiOutlineInformationCircle color="darkgray" />
              </Tooltip>
            </div>
            <input
              ref={inputRef}
              className="border-b border-hanaGreen indent-2"
              placeholder="내 집 마련 가자 !"
            />
          </div>
        </div>
      </div>

      {/* 이미지 */}
      <div className="bg-white">
        <div className="mx-6 my-4">
          <div className="flex flex-col gap-4 pt-4 pb-6">
            <p className="text-left">관심사 이미지</p>
            {imageUrl ? (
              <div className="relative">
                <img
                  className="h-[550px] rounded-2xl"
                  src={imageUrl}
                  alt="interestImage"
                />
                <div className="absolute bottom-20 flex flex-col w-full px-4 gap-6 text-left text-white">
                  <div className="flex flex-col gap-1">
                    <div className="font-hanaMedium text-2xl">{`# ${interestTitle}`}</div>
                    {/* <div className="text-sm">{subtitle}</div> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col justify-center items-center bg-[#d9d9d9] rounded-2xl h-[550px]">
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleChange}
                />
                <label htmlFor="file" className="z-10">
                  이미지를 추가해주세요
                </label>
                <HiOutlinePlusCircle
                  className="absolute opacity-10"
                  size={300}
                  color="darkgray"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 취소 / 확인 버튼 */}
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
          확인
        </button>
      </div>
    </section>
  );
};

export default AddInterest;
