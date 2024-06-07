import React, { RefObject } from "react";

interface InterestMenuType<T> {
  items: T[];
  selectedIndex: number;
  titleRefs?: RefObject<(HTMLLIElement | null)[]>;
  children?: React.ReactNode;
  onTitleClick?: (idx: number) => void;
}

const InterestMenu = ({
  items,
  selectedIndex,
  titleRefs,
  children,
  onTitleClick,
}: InterestMenuType<UserInterestType>) => {
  return (
    <div className="border-b border-hanaSilver">
      <ul className="flex gap-4 overflow-x-auto scrollbar-hide">
        {items.map((item: UserInterestType, idx: number) => (
          <li
            key={item.interestId}
            ref={(el) => {
              if (titleRefs?.current !== undefined) {
                titleRefs.current![idx] = el;
              }
            }}
          >
            <div
              id={item.title}
              className={`min-w-max ${
                onTitleClick ? "cursor-pointer" : "cursor-default"
              } ${selectedIndex === idx ? "text-hanaGreen" : "text-hanaSilver"}`}
              onClick={onTitleClick ? () => onTitleClick(idx) : undefined}
              role="presentation"
            >
              {item.title}
            </div>
            <div
              className={`w-14 h-1 rounded-t-md ${selectedIndex === idx ? "bg-hanaGreen " : ""}`}
            />
          </li>
        ))}
        {children}
      </ul>
    </div>
  );
};

export default InterestMenu;
