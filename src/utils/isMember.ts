import { getCookie } from "./cookie";

const isMember = () => {
  const token = getCookie("x-auth-token");

  if (token) {
    return true;
  }

  return false;
};

export default isMember;
