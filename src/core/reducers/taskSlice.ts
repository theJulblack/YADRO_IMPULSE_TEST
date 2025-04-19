import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { ITask, ITaskForm, TaskPriority, TaskStatus } from '../models/task';
import { ITaskFilter, DateFilter } from '../models/filter';
import { tasksStorage } from '../../storage/tasksStorage';
import { isToday, isThisWeek, isThisMonth, isBefore, startOfWeek, endOfWeek } from 'date-fns';

interface TasksState {
  tasks: ITask[];
  filter: ITaskFilter;
  groupBy: 'priority' | 'none';
}

const initialState: TasksState = {
  tasks: tasksStorage.load(),
  filter: {},
  groupBy: 'none'
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<ITaskForm, 'id' | 'status' | 'createdAt' | 'updatedAt'>>) => {
      const newTask: ITask = {
        ...action.payload,
        id: Date.now().toString(),
        status: TaskStatus.ACTIVE,
        dueDate: action.payload.dueDate ? new Date(action.payload.dueDate) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: action.payload.tags || []
      };
      state.tasks.push(newTask);
      tasksStorage.save(state.tasks);
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...action.payload,
          updatedAt: new Date()
        };
        tasksStorage.save(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      tasksStorage.save(state.tasks);
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.status = task.status === TaskStatus.ACTIVE ? TaskStatus.COMPLETED : TaskStatus.ACTIVE;
        task.updatedAt = new Date();
        tasksStorage.save(state.tasks);
      }
    },
    setFilter: (state, action: PayloadAction<ITaskFilter>) => {
      if (JSON.stringify(state.filter) !== JSON.stringify(action.payload)) {
        state.filter = action.payload;
      }
    },
    setGroupBy: (state, action: PayloadAction<'priority' | 'none'>) => {
      state.groupBy = action.payload;
    }
  }
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  setFilter,
  setGroupBy
} = taskSlice.actions;

export const selectFilteredTasks = createSelector(
  [
    (state: { tasks: TasksState }) => state.tasks.tasks,
    (state: { tasks: TasksState }) => state.tasks.filter
  ],
  (tasks, filter) => {
    let filteredTasks = [...tasks];

    // Фильтрация по поиску
    if (filter.search && filter.search.trim() !== '') {
      const searchTerm = filter.search.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description && task.description.toLowerCase().includes(searchTerm)))
    }

    // Фильтрация по статусу
    if (filter.status) {
      filteredTasks = filteredTasks.filter(task => task.status === filter.status);
    }

    // Фильтрация по приоритету
    if (filter.priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
    }

    // Фильтрация по дате
    if (filter.date) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
    
      filteredTasks = filteredTasks.filter(task => {
        if (!task.dueDate) return false;
        
        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);
        
        switch (filter.date) {
          case DateFilter.TODAY:
            return isToday(taskDate);
          case DateFilter.WEEK:
            const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Понедельник
            const weekEnd = endOfWeek(now, { weekStartsOn: 1 });     // Воскресенье
            return taskDate >= weekStart && taskDate <= weekEnd;
          case DateFilter.MONTH:
            return isThisMonth(taskDate);
          case DateFilter.OVERDUE:
            return isBefore(taskDate, now) && task.status !== TaskStatus.COMPLETED;
          default:
            return true;
        }
      });
    }

    // Сортировка по дате выполнения (ближайшие сверху)
    filteredTasks.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

    return filteredTasks;
  }
);

export default taskSlice.reducer;