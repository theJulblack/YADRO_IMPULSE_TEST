import React, { useState } from 'react';
import { ITask, ITaskForm, TaskPriority, TaskStatus } from '../../core/models/task';
import styles from './TaskItem.module.css';
import { useAppDispatch } from '../../hooks/redux';
import { deleteTask, toggleTaskStatus, updateTask } from '../../core/reducers/taskSlice';
import TaskForm from '../forms/TaskForm';
import { format } from 'date-fns';

interface TaskItemProps {
  task: ITask;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => dispatch(deleteTask(task.id));
  const handleToggleStatus = () => dispatch(toggleTaskStatus(task.id));

  const handleSubmit = (formData: ITaskForm) => {
    dispatch(updateTask({
      ...task,
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      updatedAt: new Date()
    }));
    setIsEditing(false);
  };

  // Цвета приоритетов
  const priorityColors = {
    [TaskPriority.HIGH]: '#ff6b6b',
    [TaskPriority.MEDIUM]: '#ffd166',
    [TaskPriority.LOW]: '#06d6a0'
  };

  if (isEditing) {
    return <TaskForm 
      task={task}
      onSubmit={handleSubmit}
      onCancel={() => setIsEditing(false)}
    />;
  }

  return (
    <div 
      className={`${styles.task} ${task.status === TaskStatus.COMPLETED ? styles.completed : ''}`}
      style={{ borderLeft: `4px solid ${priorityColors[task.priority]}` }}
    >
      <div className={styles.statusContainer} onClick={handleToggleStatus}>
        <div className={styles.statusToggle}>
          {task.status === TaskStatus.COMPLETED ? (
            <span className={styles.checkmark}>✓</span>
          ) : (
            <span className={styles.checkbox} />
          )}
        </div>
        <span className={styles.statusLabel}>
          {task.status === TaskStatus.COMPLETED ? 'Выполнено' : 'Активно'}
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>{task.title}</h3>
          {task.description && (
            <p className={styles.description}>{task.description}</p>
          )}
        </div>
        {task.dueDate && (
          <span className={styles.dueDate}>
            {format(new Date(task.dueDate), 'dd.MM.yyyy')}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.editButton}
          onClick={() => setIsEditing(true)}
        >
          Редактировать
        </button>
        <button 
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default TaskItem;