export const getDateDiff = (dateOne: Date, dateTwo: Date) => {
  const diff = Math.abs(dateOne.getTime() - dateTwo.getTime());

  const diffDays = Math.floor(diff / (1000 * 3600 * 24));

  return diffDays;
};

export const getTimeDiff = (dateOne: Date, dateTwo: Date) => {
  const diff = Math.abs(dateOne.getTime() - dateTwo.getTime());
  const diffDays = Math.floor(diff / (1000 * 3600));
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

export const checkIsAfterDate = (firstDate: Date, secondDate: Date, isOnlyMonth = false) => {
  return (
    firstDate.getFullYear() < secondDate.getFullYear() ||
    (firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() < secondDate.getMonth()) ||
    (!isOnlyMonth &&
      firstDate.getFullYear() === secondDate.getFullYear() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getDate() < secondDate.getDate())
  );
};

export const getDayWithWeek = (year: number, month: number, week: number) => {
  const today = new Date(year, month - 1, 1);
  const day = today.getDate() + (week - 1) * 7;
  const target = new Date(today.setDate(day));

  const startDate = new Date(target.setDate(target.getDate() - target.getDay() + 1));
  const endDate = new Date(today.setDate(target.getDate() + 7 - target.getDay()));
  return {
    startDate,
    endDate,
  };
};
