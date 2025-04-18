import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';  // Изменено с import { App } на import App
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);