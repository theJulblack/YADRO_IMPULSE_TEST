import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Priority, Task } from '../core/task';

interface EditTaskModalProps {
  task: Task;
  onSave: (updatedTask: Partial<Task>) => void;
  onClose: () => void;
}

export const EditTaskModal = ({ task, onSave, onClose }: EditTaskModalProps) => {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [dueDate, setDueDate] = useState<Date>(new Date(task.dueDate));
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) {
      setError('Дата выполнения не может быть раньше сегодняшнего дня');
      return;
    }
    
    setError('');
    setDueDate(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Название задачи не может быть пустым');
      return;
    }
    if (error) return;
    
    onSave({
      title,
      priority,
      dueDate
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Редактирование задачи</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task-title">Название задачи:</label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-priority">Приоритет:</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="form-input"
            >
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="task-date">Дата выполнения:</label>
            <DatePicker
              id="task-date"
              selected={dueDate}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="dd.MM.yyyy"
              className="form-input"
              placeholderText="Выберите дату"
              popperPlacement="bottom-start"
              showTimeSelect={false}
            />
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="cancel-btn"
            >
              Отмена
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={!!error}
            >
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};