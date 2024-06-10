import React, { useEffect, useState } from "react";
import {
  ImageUploader,
  InterestSubtitle,
  Modal,
  Navbar,
  SelectBox,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { BsCamera } from "react-icons/bs";
import ImageApiClient from "../../apis/imageApiClient";
import { useInterests } from "../../context/interest/InterestContext";
import { useModal } from "../../context/ModalContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ModifyInterest = () => {
  const { interestId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [interestInfo, setInterestInfo] = useState({
    interestId: 0,
    title: "",
    subtitle: "",
    imageUrl: "",
  });

  const [file, setFile] = useState<File>();
  const [userInterest, setUserInterest] = useState<UserInterestType[]>([]);

  const { isLoading, userInterests } = useInterests();

  const { openModal } = useModal();

  const updateInterest = useMutation({
    mutationFn: async (formData: FormData) => {
      const response =
        await ImageApiClient.getInstance().modifyUserInterest(formData);
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

  const findInterest = userInterests?.data.find(
    (interest: UserInterestType) => interest.interestId === Number(interestId),
  );

  const handlesubtitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInterestInfo((prev) => ({ ...prev, subtitle: value }));
    setUserInterest((prev) =>
      prev.map((interest) =>
        interest.interestId === Number(interestId)
          ? { ...interest, subtitle: value }
          : interest,
      ),
    );
  };

  const handleImageChange = (file: File, url: string) => {
    setFile(file);
    setInterestInfo((prev) => ({ ...prev, imageUrl: url }));
    setUserInterest((prev) =>
      prev.map((interest) =>
        interest.interestId === Number(interestId)
          ? { ...interest, imageUrl: url }
          : interest,
      ),
    );
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
        "관심사를 수정하시겠습니까?",
        () => updateInterest.mutate(formData),
        true,
      );
    }
  };

  useEffect(() => {
    if (findInterest) {
      setInterestInfo(findInterest);
      setUserInterest([findInterest]);
    }
  }, [findInterest]);

  return (
    <section>
      <Navbar
        title="관심사 수정"
        option={true}
        path="/interests"
        logo={false}
      />

      <div className="bg-white">
        <div className="mx-6 my-4">
          <div className="flex flex-col gap-4 pt-4 pb-6">
            <p className="text-left">관심사 지정</p>
            <SelectBox items={userInterest} />
          </div>
        </div>
      </div>

      {userInterest.map((item) => (
        <div key={item.interestId}>
          <InterestSubtitle
            placeholder={item.subtitle}
            onChange={handlesubtitle}
          />

          <div className="flex flex-col text-left px-6 gap-4 bg-white">
            <ImageUploader
              userInterest={item}
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
      ))}

      <div className="flex gap-4 justify-center my-4 w-full">
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
          수정
        </button>
      </div>
    </section>
  );
};

export default ModifyInterest;
