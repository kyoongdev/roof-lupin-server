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

export const getDayAfter = (date: Date, day: number) => {
  const targetDate = new Date(date.getTime());
  targetDate.setDate(targetDate.getDate() + day);
  return targetDate;
};

export const getDayBefore = (date: Date, day: number) => {
  const targetDate = new Date(date.getTime());
  targetDate.setDate(targetDate.getDate() - day);
  return targetDate;
};

export const checkIsSameDate = (firstDate: Date, secondDate: Date) => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};

export const checkIsAfterDate = (firstDate: Date, secondDate: Date) => {
  console.log(firstDate, secondDate);
  return (
    firstDate.getFullYear() < secondDate.getFullYear() ||
    (firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() < secondDate.getMonth())
  );
};
