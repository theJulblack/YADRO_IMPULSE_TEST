import { useState } from 'react';
import { Task } from '../core/task';
import { useTaskStore } from '../store/useTaskStore';
import { formatDate } from '../utils/dateUtils';
import { EditTaskModal } from './EditTaskModal';

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteTask, toggleStatus, editTask } = useTaskStore();

  const priorityColors = {
    high: '#ff6b6b',
    medium: '#ffd166',
    low: '#06d6a0'
  };

  const handleSave = (updatedTask: Partial<Task>) => {
    editTask(task.id, updatedTask);
  };

  return (
    <>
      <div className="task" style={{ borderLeft: `4px solid ${priorityColors[task.priority]}` }}>
        <div className="task-content">
          <div 
            className={`task-title ${task.status === 'done' ? 'completed' : ''}`}
            onClick={() => toggleStatus(task.id)}
          >
            {task.title}
          </div>
          <div className="task-meta">
            <span>Приоритет: {task.priority}</span>
            <span>Выполнить до: {formatDate(task.dueDate)}</span>
            {task.completedAt && (
              <span>Завершено: {formatDate(task.completedAt)}</span>
            )}
          </div>
        </div>
        <div className="task-actions">
          <button onClick={() => toggleStatus(task.id)}>
            {task.status === 'done' ? '❌ Отменить' : '✓ Выполнить'}
          </button>
          <button onClick={() => setIsEditing(true)}>✏️ Редактировать</button>
          <button onClick={() => deleteTask(task.id)}>🗑️ Удалить</button>
        </div>
      </div>

      {isEditing && (
        <EditTaskModal
          task={task}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};