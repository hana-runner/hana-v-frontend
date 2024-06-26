import React, { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { Modal } from "../../../../components";
import { VERIFICATION } from "../../../../types/users/enums";
import { RegisterAction, ActionProp } from "../../../../types/users/actions";
import BlindedInput from "../../../../components/users/BlindedInput";
import { useUserInfo } from "../../../../context/register-context/register-context";

interface Value {
  value: string;
  index: number;
}

const RegisterSSN = ({ dispatch }: ActionProp<RegisterAction>) => {
  const { setUserSSN, userInfo } = useUserInfo();
  const [modalOpened, setModalOpened] = useState(false);
  const [message, setMessage] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [values, setValues] = useState<Value[]>([]);

  const openModal = () => {
    if (message) setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    inputRefs.current[values.length]?.focus();
    inputRefs.current[values.length]?.click();
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

    if (newValue && index < 6) {
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

  const makeUserSSN = () => {
    if (values.length === 0) return "";
    const value: string[] = values.map((item) => {
      return item.value;
    });

    const ssn = value.reduce((a, curr) => {
      return a + curr;
    });

    return ssn;
  };

  const onNext = () => {
    const ssn = makeUserSSN();

    if (!ssn || ssn.length < 7) {
      setMessage("주민번호를 입력해주세요");
      openModal();
      return;
    }

    setUserSSN(ssn);
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
    inputRefs.current[0]?.click();
  }, []);

  useEffect(() => {
    if (userInfo.userSSN) {
      dispatch({ type: VERIFICATION.USER_SSN });
    }
  }, [userInfo.userSSN, dispatch]);

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          주민번호를
          <br />
          입력해주세요
        </h1>
        <div className="grid grid-cols-12 w-full">
          {/* 주민번호 앞자리 입력 */}
          <span className="col-span-6 flex justify-between border-b-2 px-1 py-1 border-b-hanaGreen ">
            {Array(6)
              .fill(null)
              .map((_, index) => {
                return (
                  <input
                    key={index}
                    className=" w-5 rounded-lg text-center text-hanaBlack bg-transparent focus:outline-none"
                    type="text"
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    onChange={(e) => moveToNext(e, index)}
                    onKeyDown={(e) => handleRemove(e, index)}
                    maxLength={1}
                  />
                );
              })}
          </span>
          <span className="col-span-1 text-hanaGreen">-</span>
          {/* 주민번호 뒷자리 입력 */}
          <span className="col-span-1 border-b-2 py-1 px-1 border-b-hanaGreen ">
            <input
              className=" w-6 bg-transparent text-center focus:outline-none"
              ref={(el) => {
                inputRefs.current[6] = el;
              }}
              onChange={(e) => moveToNext(e, 6)}
              onKeyDown={(e) => handleRemove(e, 6)}
              maxLength={1}
            />
          </span>
          <span className="col-span-4 flex justify-between items-center py-1 px-1">
            <BlindedInput character={<FaCircle />} length={6} />
          </span>
        </div>
        <div className="border-b-2 border-b-hanaSilver px-2 py-1 text-start text-hanaSilver font-extralight">
          {/* 회원 이름 */}
          {userInfo.name}
        </div>
        <div className="border-b-2 border-b-hanaSilver px-2 py-1 text-start text-hanaSilver font-extralight">
          {/* 비밀번호 */}
          <BlindedInput character="*" length={userInfo.userPw.length} />
        </div>
        <div className="border-b-2 border-b-hanaSilver px-2 py-1 text-start text-hanaSilver font-extralight">
          {/* 아이디 */}
          {userInfo.username}
        </div>
      </div>

      <button
        type="button"
        className="btn-primary w-full"
        onClick={() => onNext()}
      >
        다음
      </button>

      {modalOpened && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Modal
            message={message}
            option={false}
            modalToggle={() => closeModal()}
          />
        </div>
      )}
    </section>
  );
};

export default RegisterSSN;
