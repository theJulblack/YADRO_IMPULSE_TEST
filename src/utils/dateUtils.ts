import { format, isToday, isThisWeek, isThisMonth, isAfter } from 'date-fns';
import { Task } from '../core/task';

export const formatDate = (date?: Date | string | number): string => {
  if (!date) return 'Не указано';
  try {
    const dateObj = new Date(date);
    return isNaN(dateObj.getTime()) ? 'Неверная дата' : format(dateObj, 'dd.MM.yyyy');
  } catch {
    return 'Неверная дата';
  }
};

export const isDueToday = (date: Date): boolean => {
  return isToday(new Date(date));
};

export const isDueThisWeek = (date: Date): boolean => {
  return isThisWeek(new Date(date));
};

export const isDueThisMonth = (date: Date): boolean => {
  return isThisMonth(new Date(date));
};

export const isOverdue = (date: Date, status: string): boolean => {
  return isAfter(new Date(), new Date(date)) && status !== 'done';
};

export const filterTasksByDate = (
  tasks: Task[],
  period: 'today' | 'week' | 'month' | 'overdue'
): Task[] => {
  return tasks.filter(task => {
    if (!task.dueDate) return false;
    
    switch (period) {
      case 'today':
        return isToday(new Date(task.dueDate));
      case 'week':
        return isThisWeek(new Date(task.dueDate));
      case 'month':
        return isThisMonth(new Date(task.dueDate));
      case 'overdue':
        return isAfter(new Date(), new Date(task.dueDate)) && task.status !== 'done';
      default:
        return true;
    }
  });
};