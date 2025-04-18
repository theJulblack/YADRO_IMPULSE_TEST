import { AddTaskForm } from './ui/AddTaskForm';
import { Filters } from './ui/Filters';
import { Search } from './ui/Search';
import './index.css';

export default function App() {  // Добавлен export default
  return (
    <div className="app">
      <h1>Менеджер задач</h1>
      <AddTaskForm />
      <Search />
      <Filters />
    </div>
  );
}