const validateId = (id: string) => {
  const pattern = /^[a-zA-Z]+$/;
  return pattern.test(id);
};

export default validateId;
