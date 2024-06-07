import moment from "moment";

const calculateDate = {
  monthAgo: (endDate: Date, months: number): Date => {
    return moment(endDate).subtract(months, "months").toDate();
  },

  addMonth: (date: Date) => {
    return moment(date).add(1, "months").format("YYYY-MM-DD");
  },

  subtractMonth: (date: Date) => {
    return moment(date).subtract(1, "months").format("YYYY-MM-DD");
  },
};

export default calculateDate;
