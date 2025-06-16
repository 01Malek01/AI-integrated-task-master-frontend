import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDate = (dateString: string | Date, format = 'MMM D, YYYY'): string => {
  return dayjs(dateString).format(format);
};

export const formatRelativeTime = (dateString: string | Date): string => {
  return dayjs(dateString).fromNow();
};

export const formatNoteDate = (dateString: string | Date): string => {
  const date = dayjs(dateString);
  const now = dayjs();
  
  // If the date is today, show time
  if (date.isSame(now, 'day')) {
    return `Today at ${date.format('h:mm A')}`;
  }
  
  // If the date is yesterday
  if (date.isSame(now.subtract(1, 'day'), 'day')) {
    return `Yesterday at ${date.format('h:mm A')}`;
  }
  
  // If the date is within the last 7 days, show day name
  if (date.isAfter(now.subtract(7, 'day'))) {
    return date.format('dddd [at] h:mm A');
  }
  
  // Otherwise, show the full date
  return date.format('MMM D, YYYY [at] h:mm A');
};
