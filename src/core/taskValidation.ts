import { Task } from './task';

export const validateTask = (task: Partial<Task>) => {
  if (task.title && task.title.length < 1) {
    throw new Error('Название задачи должно содержать хотя бы 1 символ');
  }

  if (task.dueDate && new Date(task.dueDate) < new Date()) {
    throw new Error('Дата выполнения не может быть в прошлом');
  }
};