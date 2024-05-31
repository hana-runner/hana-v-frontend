import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface Prop {
  hasNav: boolean;
  children: ReactNode;
  title?: string;
  option?: boolean;
}

const UserWrapper = ({
  hasNav,
  children,
  title = "",
  option = false,
}: Prop) => {
  return (
    <section className="flex flex-col justify-between items-center h-[100vh]">
      {hasNav && <Navbar title={title || ""} option={option || false} />}
      <div className="flex flex-col justify-between h-full w-80 py-10">
        {children}
      </div>
    </section>
  );
};

export default UserWrapper;
