const formatDate = (date: Date) => {
  const dats = date.toString().split("-");
  const year = dats[0].slice(2);
  const month = dats[1];
  const day = dats[2];
  console.log(`${year}${month}${day}`);
  return `${year}${month}${day}`;
};

export default formatDate;
