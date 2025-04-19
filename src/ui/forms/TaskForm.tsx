import React, { useState } from 'react';
import { ITask, ITaskForm, TaskPriority } from '../../core/models/task';
import { format } from 'date-fns';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  task?: ITask;
  onSubmit: (formData: ITaskForm) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ITaskForm>({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || TaskPriority.MEDIUM,
    dueDate: task?.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
    tags: task?.tags || []
  });

  const [errors, setErrors] = useState({
    title: '',
    dueDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    let valid = true;
    const newErrors = { title: '', dueDate: '' };

    if (formData.title.trim().length < 3) {
      newErrors.title = 'Название должно содержать минимум 3 символа';
      valid = false;
    }

    if (formData.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.dueDate);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dueDate = 'Дата не может быть раньше сегодняшнего дня';
        valid = false;
      }
    }

    setErrors(newErrors);

    if (valid) {
      onSubmit({
        ...formData,
        dueDate: formData.dueDate || undefined
      });
    }
  };

  return (
    <div className={styles.formOverlay} onClick={onCancel}>
      <div className={styles.form} onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Название задачи*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dueDate">Дата исполнения</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.dueDate && <span className={styles.error}>{errors.dueDate}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="priority">Приоритет</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value={TaskPriority.LOW}>Низкий</option>
              <option value={TaskPriority.MEDIUM}>Средний</option>
              <option value={TaskPriority.HIGH}>Высокий</option>
            </select>
          </div>

          <div className={styles.buttons}>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Отмена
            </button>
            <button type="submit" className={styles.submitButton}>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;