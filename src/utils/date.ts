import dayjs from 'dayjs';

export const formatDate = (date: dayjs.ConfigType, format = 'DD.MM.YYYY') => {
  return dayjs(date).format(format);
};

export const formatDateWithTime = (date: dayjs.ConfigType) => {
  return formatDate(date, 'DD.MM.YYYY HH:mm');
};
