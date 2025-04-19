import { ITask } from '../core/models/task';
import { localStorage } from './localStorage';

const TASKS_KEY = 'tasks';

export const tasksStorage = {
  load: (): ITask[] => {
    const tasks = localStorage.get<ITask[]>(TASKS_KEY, []);
    return tasks.map(task => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt)
    }));
  },
  save: (tasks: ITask[]): void => {
    localStorage.set(TASKS_KEY, tasks);
  }
};