import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { SimpleInputRefHandler } from "../../types/users/users-type";

interface Prop {
  faded?: boolean;
  placeHolder?: string;
  readOnly?: boolean;
}

const SimpleInput = forwardRef(
  (
    { faded = false, readOnly = false, placeHolder }: Prop,
    ref: ForwardedRef<SimpleInputRefHandler>,
  ) => {
    const [message, setMessage] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handler: SimpleInputRefHandler = {
      setMessage: (msg: string) => setMessage(msg),
      inputRef,
    };

    useImperativeHandle(ref, () => handler);

    return (
      <section>
        <div
          className={clsx(
            "grid grid-cols-10 border-b-2 border-hanaGreen w-full ",
            {
              "border-hanaSilver": faded,
            },
          )}
        >
          <input
            className={clsx(
              "col-span-9 px-2 py-1 bg-transparent focus:outline-none",
              { "text-hanaSilver": faded },
            )}
            placeholder={placeHolder || ""}
            type="string"
            readOnly={readOnly}
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
