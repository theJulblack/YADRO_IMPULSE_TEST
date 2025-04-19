import React from 'react';
import { TaskPriority, TaskStatus } from '../../core/models/task';
import { DateFilter, ITaskFilter } from '../../core/models/filter';
import styles from './TaskFilters.module.css';

interface TaskFiltersProps {
  filter: ITaskFilter;
  onChange: (filter: ITaskFilter) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filter, onChange }) => {
  const handleStatusChange = (status?: TaskStatus) => {
    onChange({ ...filter, status });
  };

  const handlePriorityChange = (priority?: TaskPriority) => {
    onChange({ ...filter, priority });
  };

  const handleDateChange = (date?: DateFilter) => {
    onChange({ ...filter, date });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <h4>Статус</h4>
        <button
          className={!filter.status ? `${styles.active} ${styles.statusActive}` : styles.filterButton}
          onClick={() => handleStatusChange(undefined)}
        >
          Все
        </button>
        <button
          className={filter.status === TaskStatus.ACTIVE ? `${styles.active} ${styles.statusActive}` : styles.filterButton}
          onClick={() => handleStatusChange(TaskStatus.ACTIVE)}
        >
          Активные
        </button>
        <button
          className={filter.status === TaskStatus.COMPLETED ? `${styles.active} ${styles.statusActive}` : styles.filterButton}
          onClick={() => handleStatusChange(TaskStatus.COMPLETED)}
        >
          Выполненные
        </button>
      </div>

      <div className={styles.filterGroup}>
        <h4>Приоритет</h4>
        <button
          className={!filter.priority ? `${styles.active} ${styles.priorityActive}` : styles.filterButton}
          onClick={() => handlePriorityChange(undefined)}
        >
          Все
        </button>
        <button
          className={filter.priority === TaskPriority.HIGH ? `${styles.active} ${styles.priorityActive}` : styles.filterButton}
          onClick={() => handlePriorityChange(TaskPriority.HIGH)}
        >
          Высокий
        </button>
        <button
          className={filter.priority === TaskPriority.MEDIUM ? `${styles.active} ${styles.priorityActive}` : styles.filterButton}
          onClick={() => handlePriorityChange(TaskPriority.MEDIUM)}
        >
          Средний
        </button>
        <button
          className={filter.priority === TaskPriority.LOW ? `${styles.active} ${styles.priorityActive}` : styles.filterButton}
          onClick={() => handlePriorityChange(TaskPriority.LOW)}
        >
          Низкий
        </button>
      </div>

      <div className={styles.filterGroup}>
        <h4>Дата выполнения</h4>
        <button
          className={!filter.date ? `${styles.active} ${styles.dateActive}` : styles.filterButton}
          onClick={() => handleDateChange(undefined)}
        >
          Все
        </button>
        <button
          className={filter.date === DateFilter.TODAY ? `${styles.active} ${styles.dateActive}` : styles.filterButton}
          onClick={() => handleDateChange(DateFilter.TODAY)}
        >
          Сегодня
        </button>
        <button
          className={filter.date === DateFilter.WEEK ? `${styles.active} ${styles.dateActive}` : styles.filterButton}
          onClick={() => handleDateChange(DateFilter.WEEK)}
        >
          На этой неделе
        </button>
        <button
          className={filter.date === DateFilter.MONTH ? `${styles.active} ${styles.dateActive}` : styles.filterButton}
          onClick={() => handleDateChange(DateFilter.MONTH)}
        >
          В этом месяце
        </button>
        <button
          className={filter.date === DateFilter.OVERDUE ? `${styles.active} ${styles.dateActive}` : styles.filterButton}
          onClick={() => handleDateChange(DateFilter.OVERDUE)}
        >
          Просроченные
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;