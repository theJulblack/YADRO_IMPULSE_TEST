import { useState, useMemo } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { TaskItem } from './TaskItem';
import { Task, Priority } from '../core/task';
import { isToday, isThisWeek, isThisMonth, isAfter } from 'date-fns';

export const Filters = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'todo' | 'done'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month' | 'overdue'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  
  const allTasks = useTaskStore((state) => state.tasks);
  const searchQuery = useTaskStore((state) => state.searchQuery);

  const filteredTasks = useMemo(() => {
    let tasks = searchQuery
      ? allTasks.filter(task => 
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allTasks;

    if (activeFilter !== 'all') {
      tasks = tasks.filter(task => task.status === activeFilter);
    }

    if (dateFilter !== 'all') {
      tasks = tasks.filter(task => {
        if (!task.dueDate) return false;
        switch (dateFilter) {
          case 'today': return isToday(new Date(task.dueDate));
          case 'week': return isThisWeek(new Date(task.dueDate));
          case 'month': return isThisMonth(new Date(task.dueDate));
          case 'overdue': 
            return task.status !== 'done' && 
                   isAfter(new Date(), new Date(task.dueDate));
          default: return true;
        }
      });
    }

    if (priorityFilter !== 'all') {
      tasks = tasks.filter(task => task.priority === priorityFilter);
    }

    return [...tasks].sort((a, b) => 
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }, [allTasks, searchQuery, activeFilter, dateFilter, priorityFilter]);

  return (
    <div className="filters-container">
      <div className="filter-controls">
        <div className="filter-group">
          <span>Статус:</span>
          <button 
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => setActiveFilter('all')}
          >
            Все
          </button>
          <button 
            className={activeFilter === 'todo' ? 'active' : ''}
            onClick={() => setActiveFilter('todo')}
          >
            Активные
          </button>
          <button 
            className={activeFilter === 'done' ? 'active' : ''}
            onClick={() => setActiveFilter('done')}
          >
            Завершенные
          </button>
        </div>

        <div className="filter-group">
          <span>Дата выполнения:</span>
          <button 
            className={dateFilter === 'all' ? 'active' : ''}
            onClick={() => setDateFilter('all')}
          >
            Все
          </button>
          <button 
            className={dateFilter === 'today' ? 'active' : ''}
            onClick={() => setDateFilter('today')}
          >
            Сегодня
          </button>
          <button 
            className={dateFilter === 'week' ? 'active' : ''}
            onClick={() => setDateFilter('week')}
          >
            Эта неделя
          </button>
          <button 
            className={dateFilter === 'month' ? 'active' : ''}
            onClick={() => setDateFilter('month')}
          >
            Этот месяц
          </button>
          <button 
            className={dateFilter === 'overdue' ? 'active' : ''}
            onClick={() => setDateFilter('overdue')}
          >
            Просроченные
          </button>
        </div>

        <div className="filter-group">
          <span>Приоритет:</span>
          <button 
            className={priorityFilter === 'all' ? 'active' : ''}
            onClick={() => setPriorityFilter('all')}
          >
            Все
          </button>
          <button 
            className={priorityFilter === 'high' ? 'active' : ''}
            onClick={() => setPriorityFilter('high')}
          >
            Высокий
          </button>
          <button 
            className={priorityFilter === 'medium' ? 'active' : ''}
            onClick={() => setPriorityFilter('medium')}
          >
            Средний
          </button>
          <button 
            className={priorityFilter === 'low' ? 'active' : ''}
            onClick={() => setPriorityFilter('low')}
          >
            Низкий
          </button>
        </div>
      </div>

      <div className="tasks-list">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};