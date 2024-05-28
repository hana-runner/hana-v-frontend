import React, { useRef } from "react";

type Action = {
  type: "email" | "code";
};

type Prop = {
  dispatch: React.Dispatch<Action>;
};

const FindIdEmail = ({ dispatch }: Prop) => {
  const selectedRef = useRef<HTMLSelectElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const onEmailSubmit = () => {
    dispatch({ type: "email" });
  };

  return (
    <section>
      <div className="flex flex-col gap-10 w-80 h-full">
        <div className="text-xl text-start">
          이메일 주소를
          <br />
          입력해주세요
        </div>
        <div className="grid grid-cols-12">
          <span className="col-span-5">
            <input
              className="border-b-2 border-hanaGreen bg-transparent w-full"
              placeholder="이메일주소"
              ref={emailRef}
            />
          </span>
          <span className="col-span-1">@</span>

          <span className="col-span-6">
            <select
              className="border-b-2 border-hanaGreen bg-transparent focus:outline-none w-full"
              ref={selectedRef}
            >
              <option value="naver.com" selected>
                naver.com
              </option>
              <option value="gmail.com">gmail.com</option>
            </select>
          </span>
        </div>
        <button
          type="button"
          className="bg-white border border-hanaSilver rounded-lg text-hanaSilver w-80 py-2 under"
          onClick={() => onEmailSubmit()}
        >
          다음
        </button>
      </div>
    </section>
  );
};

export default FindIdEmail;
