export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "done" | "overdue";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}