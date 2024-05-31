import moment from "moment";

const CalculateDate = (endDate: Date, months: number):Date => {
  return moment(endDate).subtract(months, "months").toDate();
};

export default CalculateDate;
