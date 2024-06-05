import React from "react";
import { useEffect, useRef, useState } from "react";
import AccountCard from "./AccountCard";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useNavigate } from "react-router";

interface MyAccountProps {
  accounts: AccountType[];
}

const MyAccount: React.FC<MyAccountProps> = ({ accounts }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setCurrentTranslate(0);
      setPrevTranslate(0);
      setCurrentIndex(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition(event.clientX);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const currentPosition = event.clientX;
      const diff = currentPosition - startPosition;
      setCurrentTranslate(prevTranslate + diff);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < accounts.length) {
      setCurrentIndex(currentIndex + 1);
    }

    if (movedBy > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setPrevTranslate(currentIndex * -sliderRef.current!.offsetWidth);
    setCurrentTranslate(currentIndex * -sliderRef.current!.offsetWidth);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.style.transform = `translateX(${currentTranslate}px)`;
    }
  }, [currentTranslate]);

  return (
    <>
      <div className="flex flex-col items-start mx-4 mt-4 mb-4">
        <span className="font-hanaMedium mb-4">나의 계좌</span>
        <div className="w-full max-w-4xl mx-auto overflow-hidden relative">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-300 ease-out"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ transform: `translateX(${currentIndex * -100}%)` }}
          >
            {accounts.map((account: AccountType) => (
              <div key={account.id} className="min-w-full">
                <AccountCard {...account} />
              </div>
            ))}
            <div
              className="min-w-full"
              onClick={() => navigate("/add_account")}
            >
              <div className="bg-white flex flex-col items-center mx-4 mb-4 rounded-3xl shadow-md pl-4 pr-8 py-10">
                <HiOutlinePlusCircle className="text-hanaGreen w-8 h-8 m-1" />
                <span className="text-hanaGreen font-hanaBold m-2 mb-3">
                  계좌 추가
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
