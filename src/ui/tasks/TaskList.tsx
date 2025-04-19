import React from 'react';
import { ITask } from '../../core/models/task';
import { ITaskFilter } from '../../core/models/filter'; // Добавьте этот импорт
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: ITask[];
  filter?: ITaskFilter;
  groupBy?: 'priority' | 'tags' | 'none';
}

const TaskList: React.FC<TaskListProps> = ({ tasks, filter, groupBy }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;