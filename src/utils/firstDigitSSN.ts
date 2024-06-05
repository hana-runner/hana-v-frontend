const firstDigitSSN = (birthday: Date, gender: 0 | 1) => {
  if (birthday < new Date("2000-01-01")) {
    if (gender === 0) {
      return 1;
    }
    return 2;
  }

  if (gender === 0) {
    return 3;
  }

  return 4;
};

export default firstDigitSSN;
