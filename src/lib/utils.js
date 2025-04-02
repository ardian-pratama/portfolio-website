import { clsx } from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import relativeTime from 'dayjs/plugin/relativeTime';
import { twMerge } from 'tailwind-merge';

dayjs.extend(relativeTime);
dayjs.locale('id');

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const formatTimestamp = (timestamp) => {
  return dayjs(new Date(timestamp)).fromNow();
};
