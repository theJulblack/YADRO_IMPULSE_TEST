import React, { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { selectFilteredTasks } from './core/reducers/taskSlice';
import { addTask, setFilter, setGroupBy } from './core/reducers/taskSlice';
import { ITaskForm } from './core/models/task';
import { ITaskFilter } from './core/models/filter';
import TaskList from './ui/tasks/TaskList';
import TaskForm from './ui/forms/TaskForm';
import TaskFilters from './ui/filters/TaskFilters';
import TaskSearch from './ui/filters/TaskSearch';
import styles from './App.module.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const groupBy = useAppSelector(state => state.tasks.groupBy);
  const filteredTasks = useAppSelector(selectFilteredTasks);
  const [showForm, setShowForm] = useState(false);

  const handleFilterChange = useCallback((newFilter: ITaskFilter) => {
    dispatch(setFilter(newFilter));
  }, [dispatch]);

  const handleGroupChange = useCallback((group: 'priority' | 'none') => {
    dispatch(setGroupBy(group));
  }, [dispatch]);

  const handleAddTask = useCallback((formData: ITaskForm) => {
    dispatch(addTask({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate,
      tags: []
    }));
    setShowForm(false);
  }, [dispatch]);

  const handleSearch = useCallback((query: string) => {
    dispatch(setFilter({ search: query }));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Система управления задачами</h1>
      </header>
  
      <main className={styles.main}>
        <div className={styles.controls}>
          <button 
            className={styles.addButton}
            onClick={() => setShowForm(true)}
          >
            + Добавить задачу
          </button>
          <TaskSearch onSearch={handleSearch} />
        </div>
  
        <TaskFilters 
          filter={useAppSelector(state => state.tasks.filter)}
          onChange={handleFilterChange}
        />
  
        {showForm && (
          <TaskForm 
            onSubmit={handleAddTask}
            onCancel={() => setShowForm(false)}
          />
        )}
  
        <TaskList 
          tasks={filteredTasks}
          // groupBy={groupBy === 'tags' ? 'none' : groupBy}
        />
      </main>
    </div>
  );
};

export default App;