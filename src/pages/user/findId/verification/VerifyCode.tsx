import React, { useEffect, useRef, useState } from "react";

interface Value {
  value: string;
  index: number;
}

enum VERIFICATION {
  EMAIL = "email",
  CODE = "code",
}

interface Action {
  type: unknown;
}

interface Prop {
  dispatch: React.Dispatch<Action>;
}

const VerifyCode = ({ dispatch }: Prop) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [values, setValues] = useState<Value[]>([]);

  console.log(values);

  const moveToNext = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newValue = e.target.value;
    if (!/^[0-9]$/.test(newValue)) {
      e.target.value = "";
      return;
    }

    if (newValue.length > 1) return;

    const updatedValues: Value[] = [...values, { value: newValue, index }];

    setValues(updatedValues);

    if (newValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
      return;
    }

    dispatch({ type: VERIFICATION.CODE });
  };

  const handleRemove = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.click();
      inputRefs.current[index] = null;

      const newValues = [...values];
      newValues.splice(newValues.length - 1, 1);
      setValues(newValues);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
    inputRefs.current[0]?.click();
  }, []);

  return (
    <section className="flex flex-col w-80 h-full justify-between py-10">
      <div className="flex flex-col justify-start gap-5 h-full">
        <h1 className="text-start text-xl">
          인증번호 6자리를
          <br />
          입력해주세요
        </h1>
        <div className="flex gap-2 justify-between items-center">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <input
                key={index}
                className="focus:outline-1 focus:outline-hanaGreen bg-hanaSilver w-10 h-10 rounded-lg px-2 text-center"
                type="text"
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onChange={(e) => moveToNext(e, index)}
                onKeyDown={(e) => handleRemove(e, index)}
                maxLength={1}
              />
            ))}
        </div>
      </div>

      <button
        type="button"
        className="btn-primary w-80 py-2"
        ref={buttonRef}
        onClick={() => dispatch({ type: VERIFICATION.CODE })}
      >
        다음
      </button>
    </section>
  );
};

export default VerifyCode;
