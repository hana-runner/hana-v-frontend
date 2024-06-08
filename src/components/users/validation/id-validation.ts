const validateId = (id: string) => {
  const pattern = /^[a-zA-Z0-9]+$/;
  return pattern.test(id);
};

export default validateId;
