import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '../../utils/debounce';
import styles from './TaskSearch.module.css';

interface TaskSearchProps {
  onSearch: (query: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Мемоизируем обработчик поиска
  const handleSearch = useCallback((query: string) => {
    onSearch(query);
  }, [onSearch]);

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      handleSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, handleSearch]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Поиск задач..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default TaskSearch;