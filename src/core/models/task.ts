export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum TaskStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskForm {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string; 
  tags: string[];
}

export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
  dueDate: string; 
}