export const getDateDiff = (dateOne: Date, dateTwo: Date) => {
  const diff = Math.abs(dateOne.getTime() - dateTwo.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays;
};
