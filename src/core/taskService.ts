import { Task, Priority, Status } from './task';

export const createTask = (
  title: string, 
  priority: Priority = 'medium',
  dueDate: Date
): Task => {
  const now = new Date();
  return {
    id: Date.now().toString(),
    title,
    priority,
    status: 'todo',
    dueDate,
    createdAt: now,
    updatedAt: now
  };
};