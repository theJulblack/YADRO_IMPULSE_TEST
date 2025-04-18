import { Task } from '../core/task';

const DB_NAME = 'TaskManagerDB';
const STORE_NAME = 'tasks';

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveTasksToIndexedDB = async (tasks: Task[]) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  tasks.forEach(task => store.put(task));
  return new Promise<void>((resolve) => {
    tx.oncomplete = () => resolve();
  });
};