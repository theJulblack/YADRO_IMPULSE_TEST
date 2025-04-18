import { Task } from '../core/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskList = ({ tasks, onToggleStatus, onEdit, onDelete }: TaskListProps) => {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleStatus={onToggleStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="no-tasks">Нет задач, соответствующих выбранным фильтрам</div>
      )}
    </div>
  );
};