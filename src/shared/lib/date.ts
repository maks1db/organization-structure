import dayjs from 'dayjs';

export const parseDateHours = (date: Date) => {
  return dayjs(date).format('DD.MM.YYYY HH:MM');
};
