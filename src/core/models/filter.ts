import { TaskPriority, TaskStatus } from './task';

export enum DateFilter {
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
  OVERDUE = 'overdue',
  ALL = 'all'
}

export interface ITaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  date?: DateFilter;
  search?: string;
  tags?: string[];
}