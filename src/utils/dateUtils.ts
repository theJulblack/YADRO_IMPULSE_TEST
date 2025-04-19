import { format, isToday, isThisWeek, isThisMonth, isBefore } from 'date-fns';
import { DateFilter } from '../core/models/filter';

export const formatDate = (date: Date): string => format(date, 'dd.MM.yyyy');

export const checkDateFilter = (date: Date | undefined, filter: DateFilter): boolean => {
  if (!date) return false;
  
  const now = new Date();
  
  switch (filter) {
    case 'today':
      return isToday(date);
    case 'week':
      return isThisWeek(date);
    case 'month':
      return isThisMonth(date);
    case 'overdue':
      return isBefore(date, now);
    default:
      return true;
  }
};