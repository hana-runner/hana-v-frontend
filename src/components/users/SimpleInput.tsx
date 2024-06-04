import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SimpleInputRefHandler } from "../../types/users/users-type";

const SimpleInput = forwardRef(
  (_, ref: ForwardedRef<SimpleInputRefHandler>) => {
    const [message, setMessage] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handler: SimpleInputRefHandler = {
      setMessage: (msg: string) => setMessage(msg),
      inputRef,
    };

    useImperativeHandle(ref, () => handler);

    return (
      <section>
        <div className="grid grid-cols-10 border-b-2 border-hanaGreen w-full ">
          <input
            className=" col-span-9 px-2 py-1 bg-transparent focus:outline-none"
            placeholder="이름"
            type="string"
            ref={inputRef}
          />
          <div className="col-span-1">x</div>
        </div>
        <div className="text-start text-hanaRed  text-sm pt-1">{message}</div>
      </section>
    );
  },
);

export default SimpleInput;
