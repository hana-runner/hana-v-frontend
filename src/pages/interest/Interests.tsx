import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiMenuKebab } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import ApiClient from "../../apis/apiClient";
import { useInterests } from "../../context/interest/InterestContext";
import { useModal } from "../../context/ModalContext";
import { ImageCard, InterestMenu, Loading, Navbar } from "../../components";

const Interests = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [clickedMenu, setClickedMenu] = useState(false);

  const imageContainerRef = useRef<HTMLUListElement>(null);
  const titleRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { isLoading, userInterests } = useInterests();
  const { openModal } = useModal();

  const deleteInterest = useMutation({
    mutationFn: async (interestId: number) => {
      const response = await ApiClient.getInstance().deleteUserInterest(
        Number(interestId),
      );
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

  // 관심사 제목을 클릭하면 해당하는 이미지로 이동
  const handleTitleClick = (idx: number) => {
    setSelectedIndex(idx);
    const imageElement = imageContainerRef.current;
    if (imageElement !== null) {
      imageElement.scrollTo({
        left: idx * imageElement.clientWidth,
        behavior: "smooth",
      });
    }
  };

  // 이미지를 클릭하면 관심사 분석 페이지로 이동
  const handleImageClick = (interestTitle: string, interestId: number) => {
    navigate(`/interests/analysis/${interestTitle}/${interestId}/detail`);
  };

  // 이미지를 스크롤하면 해당하는 관심사 제목으로 이동
  const handleImageScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const { scrollLeft } = imageContainerRef.current!;
      const index = Math.round(
        scrollLeft / imageContainerRef.current!.clientWidth,
      );
      setSelectedIndex(index);
    }, 200);
  };

  const handleDelete = (interestId: number) => {
    openModal(
      `전체 거래 내역이 삭제됩니다. 삭제하시겠습니까?`,
      () => {
        deleteInterest.mutate(interestId);
      },
      true,
    );
  };

  // 인덱스가 변경될 때 마다 관심사 제목이 화면에 노출
  useEffect(() => {
    if (titleRefs.current[selectedIndex]) {
      titleRefs.current[selectedIndex]!.scrollIntoView({
        inline: "center",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <Navbar title="관심사" option={true} path="/home" logo={false} />

      <div className="flex flex-col justify-center gap-6 my-4 mx-6">
        {/* 관심사 bar */}
        <InterestMenu
          items={userInterests?.data || []}
          selectedIndex={selectedIndex}
          onTitleClick={handleTitleClick}
        >
          <div
            className="min-w-max mt-1 mr-1 text-hanaSilver cursor-pointer"
            onClick={() => navigate("/interest/add")}
          >
            <FaPlus />
          </div>
        </InterestMenu>

        {/* 관심사 이미지 */}
        <ul
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          ref={imageContainerRef}
          onScroll={handleImageScroll}
        >
          {userInterests?.data.map((userInterest: UserInterestType) => (
            <li
              key={userInterest.interestId}
              className="relative flex flex-col min-w-full snap-center"
            >
              <div className="absolute top-4 right-4 flex flex-col items-end gap-2 cursor-pointer">
                <CiMenuKebab
                  className="text-white"
                  size={24}
                  onClick={() => setClickedMenu(!clickedMenu)}
                />
                <div
                  className={`${clickedMenu ? "block" : "hidden"} text-xs text-white border border-white rounded-xl`}
                >
                  <div
                    className="px-2 pt-2 pb-1 border-b border-white"
                    onClick={() =>
                      navigate(`/interest/modify/${userInterest.interestId}`)
                    }
                  >
                    수정
                  </div>
                  <div
                    className="px-2 pt-1 pb-2"
                    onClick={() => handleDelete(userInterest.interestId)}
                  >
                    삭제
                  </div>
                </div>
              </div>
              <ImageCard
                userInterest={userInterest}
                onImageClick={handleImageClick}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Interests;
