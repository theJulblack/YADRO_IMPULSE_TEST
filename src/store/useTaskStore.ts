import { create } from 'zustand';
import { Task, Priority, Status } from '../core/task';
import { saveTasks, loadTasks } from '../storage/localStorage';

interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  setSearchQuery: (query: string) => void;
  getFilteredTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => {
  const initialTasks = loadTasks();

  return {
    tasks: initialTasks,
    searchQuery: '',
    
    addTask: (task) => set((state) => {
      const now = new Date();
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      };
      const tasks = [...state.tasks, newTask];
      saveTasks(tasks);
      return { tasks };
    }),

    deleteTask: (id) => set((state) => {
      const tasks = state.tasks.filter((task) => task.id !== id);
      saveTasks(tasks);
      return { tasks };
    }),

    toggleStatus: (id) => set((state) => {
      const tasks = state.tasks.map((task) => {
        if (task.id !== id) return task;
        
        const newStatus: Status = task.status === "todo" ? "done" : "todo";
        return {
          ...task,
          status: newStatus,
          updatedAt: new Date(),
          completedAt: newStatus === 'done' ? new Date() : undefined
        };
      });
      saveTasks(tasks);
      return { tasks };
    }),

    editTask: (id, updates) => set((state) => {
      const tasks = state.tasks.map((task) =>
        task.id === id 
          ? { 
              ...task, 
              ...updates, 
              updatedAt: new Date(),
              dueDate: updates.dueDate ? new Date(updates.dueDate) : task.dueDate
            } 
          : task
      );
      saveTasks(tasks);
      return { tasks };
    }),

    setSearchQuery: (query) => set({ searchQuery: query }),

    getFilteredTasks: () => {
      const { tasks, searchQuery } = get();
      return tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };
});