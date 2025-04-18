import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Priority } from '../core/task';
import { useTaskStore } from '../store/useTaskStore';

export const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [error, setError] = useState('');

  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Название задачи не может быть пустым');
      return;
    }
    
    if (!dueDate) {
      setError('Укажите дату выполнения');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueDate < today) {
      setError('Дата выполнения не может быть в прошлом');
      return;
    }

    setError('');
    addTask({ 
      title, 
      priority, 
      dueDate,
      status: 'todo'
    });
    
    setTitle('');
    setPriority('medium');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setDueDate(tomorrow);
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label>Название задачи:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название задачи"
          minLength={1}
          required
        />
      </div>

      <div className="form-group">
        <label>Приоритет:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>

      <div className="form-group">
        <label>Дата выполнения:</label>
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          minDate={new Date()}
          dateFormat="dd.MM.yyyy"
          placeholderText="Выберите дату"
          className="date-picker-input"
          showTimeSelect={false}
          todayButton="Сегодня"
        />
      </div>

      <button type="submit" className="submit-btn">
        Добавить задачу
      </button>
    </form>
  );
};