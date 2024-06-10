/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils/cookie";

interface Prop {
  className?: string;
  text?: string;
}

const Logout = ({ className = "", text = "로그아웃" }: Prop) => {
  const navigate = useNavigate();
  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        removeCookie("x-access-token", { path: "/" });
        removeCookie("x-auth-token", { path: "/" });
        navigate("/home", { replace: true });
      }}
    >
      {text}
    </button>
  );
};

export default Logout;
