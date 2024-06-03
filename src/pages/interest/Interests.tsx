import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import ApiClient from "../../apis/apiClient";
import { Loading, Navbar } from "../../components";
import { setCookie } from "../../utils/cookie";
import { CiMenuKebab } from "react-icons/ci";

const Interests = () => {
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [clickedMenu, setClickedMenu] = useState(false);
  const imageContainerRef = useRef<HTMLUListElement>(null);
  const titleRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { isLoading, data: userInterests } = useQuery<
    BasicResultApiType<UserInterestType[]>
  >({
    queryKey: ["userInterests"],
    queryFn: () => {
      const response = ApiClient.getInstance().getUserInterests();
      return response;
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
  const handleImageClick = (interestId: number, interestTitle: string) => {
    navigate(`/interests/analysis/${interestId}`);
    setCookie("interestTitle", interestTitle);
  };

  // 이미지를 스크롤하면 해당하는 관심사 제목으로 이동
  const handleImageScroll = useCallback(() => {
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
  }, []);

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
        <div className="border-b border-hanaSilver">
          <ul className="flex gap-4 overflow-x-auto scrollbar-hide">
            {userInterests?.data.map(
              (userInterest: UserInterestType, idx: number) => (
                <li
                  key={userInterest.interestId}
                  ref={(el) => (titleRefs.current[idx] = el)}
                >
                  <div
                    id={userInterest.title}
                    className={`min-w-max cursor-pointer ${selectedIndex === idx ? "text-hanaGreen" : "text-hanaSilver"}`}
                    onClick={() => handleTitleClick(idx)}
                    role="presentation"
                  >
                    {userInterest.title}
                  </div>
                  <div
                    className={`w-14 h-1 rounded-t-md ${selectedIndex === idx ? "bg-hanaGreen " : ""}`}
                  />
                </li>
              ),
            )}
            <div
              className="min-w-max mt-1 mr-1 text-hanaSilver cursor-pointer"
              onClick={() => navigate("/interest/add")}
            >
              <FaPlus />
            </div>
          </ul>
        </div>

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
                  <div className="px-2 pt-2 pb-1 border-b border-white">
                    수정
                  </div>
                  <div className="px-2 pt-1 pb-2">삭제</div>
                </div>
              </div>
              <img
                key={userInterest.interestId}
                className="h-[550px] rounded-3xl cursor-pointer"
                src={userInterest.imageUrl}
                alt={`${userInterest.title}`}
                onClick={() =>
                  handleImageClick(userInterest.interestId, userInterest.title)
                }
                role="presentation"
              />
              <div className="absolute bottom-20 flex flex-col w-full px-4 gap-6 text-left text-white">
                <div className="flex flex-col gap-1">
                  <div className="font-hanaMedium text-2xl">{`# ${userInterest.title}`}</div>
                  <div className="text-sm">{userInterest.subtitle}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Interests;
