import { useState, useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { debounce } from '../utils/debounce';

export const Search = () => {
  const [query, setQuery] = useState('');
  const setSearchQuery = useTaskStore((state) => state.setSearchQuery);

  const handleSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Поиск..."
    />
  );
};
