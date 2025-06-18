const ONE_SECOND_IN_MILLISECONDS = 1000;
const MINUTE_IN_MILLISECONDS = 60 * ONE_SECOND_IN_MILLISECONDS;
const HOUR_IN_MILLISECONDS = 3600 * ONE_SECOND_IN_MILLISECONDS;
const DAY_IN_MILLISECONDS = 24 * HOUR_IN_MILLISECONDS;
const WEEK_IN_MILLISECONDS = 7 * DAY_IN_MILLISECONDS;

export const formatFullDate = (dateString: Date | string) => {
  const date = new Date(dateString);

  return date.toLocaleString('en', { dateStyle: 'medium', timeStyle: 'medium' });
};

export const formatRelativeTime = (dateString: Date | string, showTime?: boolean) => {
  const currentDate = new Date();
  const dateToCompare = new Date(dateString);

  const relativeTimeDifference = dateToCompare.getTime() - currentDate.getTime();
  const absTimeDifference = Math.abs(relativeTimeDifference);

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'always', style: 'long' });

  if (absTimeDifference <= HOUR_IN_MILLISECONDS) {
    return formatter.format(Math.round(relativeTimeDifference / MINUTE_IN_MILLISECONDS), 'minute');
  }

  if (absTimeDifference <= DAY_IN_MILLISECONDS) {
    return formatter.format(Math.round(relativeTimeDifference / HOUR_IN_MILLISECONDS), 'hour');
  }

  if (absTimeDifference <= WEEK_IN_MILLISECONDS) {
    return formatter.format(Math.round(relativeTimeDifference / DAY_IN_MILLISECONDS), 'day');
  }

  const dateFormatter = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    ...(showTime && { timeStyle: 'short' }),
  }).format;

  return dateFormatter(dateToCompare);
};

export const formatChatMessageDate = (dateString: Date | string) => {
  const date = new Date(dateString);

  return date.toLocaleString('en', { timeStyle: 'short' });
};

export const formatChatMessagesGroupDate = (dateString: Date | string) => {
  const currentDate = new Date();
  const dateToCompare = new Date(dateString);

  const isToday = currentDate.toDateString() === dateToCompare.toDateString();
  const isThisYear = currentDate.getFullYear() === dateToCompare.getFullYear();

  if (isToday) {
    return 'Today';
  }

  if (isThisYear) {
    return dateToCompare.toLocaleDateString('en', { day: 'numeric', month: 'long' });
  }

  return dateToCompare.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const getIsSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
