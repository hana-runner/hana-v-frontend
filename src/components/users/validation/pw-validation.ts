const validatePw = (pw: string) => {
  const pattern =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  return pattern.test(pw);
};

export default validatePw;
