import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import { Navbar } from "../../components";
import ApiClient from "../../apis/apiClient";
// import ApiClient from "../../apis/apiClient";

const Interests = () => {
  const { data: userInterests, isLoading } = useQuery({
    queryKey: ["userInterests"],
    queryFn: () => {
      const response = ApiClient.getInstance().getUserInterests();
      return response;
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageContainerRef = useRef<HTMLUListElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <section>
      <Navbar title="관심사" option={true} />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col justify-center gap-4 my-4 mx-6">
          {/* 관심사 bar */}
          <div className="border-b border-hanaSilver">
            <ul className="flex gap-4 overflow-x-auto scrollbar-hide">
              {userInterests?.map(
                (userInterest: userInterestType, idx: number) => (
                  <div>
                    <li key={idx} ref={(el) => (titleRefs.current[idx] = el)}>
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
                  </div>
                ),
              )}
              <div className="min-w-max mt-1 mr-1 text-hanaSilver cursor-pointer">
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
            {userInterests?.map(
              (userInterest: userInterestType, idx: number) => (
                <li className="relative flex flex-col min-w-full snap-center">
                  <BiPencil
                    className="absolute top-4 right-4 text-white cursor-pointer"
                    size={24}
                  />
                  <img
                    key={idx}
                    className="h-full rounded-3xl cursor-pointer"
                    src={userInterest.imageUrl}
                    alt={`${userInterest.title}`}
                    // onClick={() => handleImageClick(idx)}
                    role="presentation"
                  />
                  <div className="absolute bottom-20 flex flex-col w-full px-4 gap-6 text-left text-white">
                    <div className="flex flex-col gap-1">
                      <div className="font-hanaMedium text-2xl">{`# ${userInterest.title}`}</div>
                      <div className="text-sm">{userInterest.subtitle}</div>
                    </div>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Interests;
