export const getDateDiff = (dateOne: Date, dateTwo: Date) => {
  const diff = Math.abs(dateOne.getTime() - dateTwo.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays;
};

export const getTimeDiff = (dateOne: Date, dateTwo: Date) => {
  const diff = Math.abs(dateOne.getTime() - dateTwo.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600));
  return diffDays;
};

export const getWeek = (date: Date) => {
  const currentDate = date.getDate();
  const firstDay = new Date(date.setDate(1)).getDay();

  return Math.ceil((currentDate + firstDay) / 7);
};
