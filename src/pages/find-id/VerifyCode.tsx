import React, { ChangeEvent, useEffect, useRef, useState } from "react";

type Value = {
  value: string;
  index: number;
};

type Action = {
  type: "email" | "code";
};

type Prop = {
  dispatch: React.Dispatch<Action>;
};

const VerifyCode = ({ dispatch }: Prop) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [values, setValues] = useState<Value[]>(
    Array(6)
      .fill(null)
      .map((_, index) => ({
        value: "",
        index,
      })),
  );

  const moveToNext = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newValue = e.target.value;
    if (!/^[0-9]$/.test(newValue)) {
      return;
    }

    if (newValue.length > 1) return;

    const updatedValues = values.map((item, i) => {
      if (i === index) {
        return { ...item, value: newValue };
      }
      return item;
    });

    setValues(updatedValues);

    if (newValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleRemove = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.click();
      values[index] = { ...values[index], value: "" };
    }
  };

  const onCodeSubmit = () => {
    dispatch({ type: "code" });
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
    inputRefs.current[0]?.click();
  }, []);

  return (
    <section>
      <div className="flex gap-2">
        {values.map((item, index) => (
          <input
            className="focus:outline-1 focus:outline-hanaGreen bg-hanaSilver w-10 h-10 rounded-lg px-2 text-center"
            key={item.index}
            type="text"
            value={item.value}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={(e) => moveToNext(e, index)}
            onKeyDown={(e) => handleRemove(e, index)}
            maxLength={1}
          />
        ))}
      </div>
      <button
        type="button"
        className="bg-white border border-hanaSilver rounded-lg text-hanaSilver w-80 py-2 under"
        onClick={() => onCodeSubmit()}
      >
        다음
      </button>
    </section>
  );
};

export default VerifyCode;
