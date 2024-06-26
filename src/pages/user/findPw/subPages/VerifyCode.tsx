import React, { useEffect, useRef, useState } from "react";
import { ActionProp, FindPwAction } from "../../../../types/users/actions";
import { VERIFICATION } from "../../../../types/users/enums";
import { Modal } from "../../../../components";
import ApiClient from "../../../../apis/apiClient";
import { useUserInfo } from "../../../../context/register-context/register-context";

interface Value {
  value: string;
  index: number;
}

const VerifyCode = ({ dispatch }: ActionProp<FindPwAction>) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [values, setValues] = useState<Value[]>([]);
  const { userInfo } = useUserInfo();

  const openModal = (msg: string) => {
    setMessage(msg);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    inputRefs.current[values.length]?.focus();
    inputRefs.current[values.length]?.click();
  };

  const onSubmitCode = async () => {
    try {
      const code = values.map((v) => v.value).join("");
      const response = await ApiClient.getInstance().emailVerificationCode(
        userInfo.userEmail,
        code,
      );
      if (response.data !== "인증 번호가 틀렸습니다.") {
        dispatch({ type: VERIFICATION.CODE });
      }
    } catch (err) {
      openModal("인증 코드가 틀렸습니다");
      setValues([]);
    }
  };

  const onNext = () => {
    if (values.length < 6) {
      openModal("인증코드는 6자리입니다");
      return;
    }
    onSubmitCode();
  };

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
    }
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

  useEffect(() => {
    if (values.length === 6) {
      onSubmitCode();
    }
  }, [values, dispatch]);

  return (
    <section className="flex flex-col h-full justify-between py-10">
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
                value={values[index]?.value || ""}
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
        onClick={() => onNext()}
      >
        다음
      </button>
      {modalOpened && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Modal message={message} option={false} modalToggle={closeModal} />
        </div>
      )}
    </section>
  );
};

export default VerifyCode;
