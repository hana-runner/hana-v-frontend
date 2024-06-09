import { LuPencil } from "react-icons/lu";
import {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { EMAIL_DOMAIN } from "../../types/users/enums";
import {
  EmailType,
  PersonalInfoRefHandler,
} from "../../types/users/users-type";
import formatDate from "../../utils/formDate";
import firstDigitSSN from "../../utils/firstDigitSSN";
import BlindedInput from "./BlindedInput";

/* eslint-disable react/react-in-jsx-scope */

interface Prop {
  email: EmailType | undefined;
  name: string | undefined;
  birthday: Date | undefined;
  gender: 0 | 1 | undefined;
  onEdit: () => void;
}

const PersonalInformationCard = forwardRef(
  (
    { email, name, birthday, gender, onEdit }: Prop,
    ref: ForwardedRef<PersonalInfoRefHandler>,
  ) => {
    const [readOnly, setReadOnly] = useState<boolean>(false);
    const emailIdRef = useRef<HTMLInputElement | null>(null);
    const domainRef = useRef<HTMLSelectElement | null>(null);

    const handler: PersonalInfoRefHandler = {
      domainRef,
      emailIdRef,
      edit: () => setReadOnly((pre) => !pre),
    };

    useImperativeHandle(ref, () => handler);

    return (
      <section className="grid grid-rows-12 bg-white rounded-2xl drop-shadow-md px-5 h-[180px]">
        <div className=" row-span-4 ">
          <div className="flex justify-between pt-5 text-start border-b-[1px] border-b-hanaSilver pb-1">
            제목
            <LuPencil
              onClick={() => {
                handler.edit();
                onEdit();
              }}
            />
          </div>
        </div>
        <div className="row-span-8 flex flex-col gap-2 pt-2 pb-5 text-start text-sm">
          <div className="flex justify-between">
            <div className="text-hanaSilver">이름</div>
            <div>{name}</div>
          </div>
          <div className="grid grid-cols-12 justify-between">
            <div className="col-span-3 text-hanaSilver">email</div>
            <div className="col-span-9 flex">
              <input
                ref={emailIdRef}
                readOnly={!readOnly}
                defaultValue={email?.emailId}
                className="col-span-4 w-full text-end focus:outline-none"
              />
              <span className="col-span-1">@</span>
              {!readOnly ? (
                <span>{email?.domain}</span>
              ) : (
                <select ref={domainRef} className="col-span-4">
                  <option value={EMAIL_DOMAIN.NAVER} defaultChecked>
                    naver.com
                  </option>
                  <option value={EMAIL_DOMAIN.GOOGLE}>gmail.com</option>
                </select>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-hanaSilver">주민등록번호</div>
            <div className="flex items-center">
              <span>{birthday && formatDate(birthday)}</span>
              <span>-</span>
              <span>
                {birthday && gender && firstDigitSSN(birthday, gender)}
              </span>
              <div className="flex">
                <BlindedInput length={6} character="*" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

export default PersonalInformationCard;
