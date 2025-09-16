import React, { useEffect, useMemo, useState, useCallback } from 'react';
import TaskInput from './components/TaskInput.jsx';
import TaskList from './components/TaskList.jsx';
import Stats from './components/Stats.jsx';
import { getTasks, createTask, updateTask, deleteTask } from './api.js';
import { MESSAGES } from './constants.js';
import { sfxComplete, sfxDelete } from './sound.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const completed = useMemo(() => tasks.filter(t => t.completed).length, [tasks]);

  const handleAdd = useCallback(async (title) => {
    const created = await createTask(title);
    setTasks((prev) => [...prev, created]);
  }, []);

  const handleToggle = useCallback(async (id) => {
    const current = tasks.find(t => String(t.id) === String(id));
    if (!current) return;
    const updated = await updateTask(id, { completed: !current.completed });
    sfxComplete();
    setTasks((prev) => prev.map(t => String(t.id) === String(id) ? { ...t, ...updated } : t));
  }, [tasks]);

  const handleDelete = useCallback(async (id) => {
    await deleteTask(id);
    sfxDelete();
    setTasks((prev) => prev.filter(t => String(t.id) != String(id)));
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1 className="neon">Admin tareas</h1>
        <p className="subtitle">agrega aqui tu nueva tarea</p>
      </header>

      <TaskInput onAdd={handleAdd} />
      <Stats total={tasks.length} completed={completed} />

      {loading && <p className="muted">Cargando...</p>}
      {!loading && tasks.length === 0 && (
        <div className="empty">{MESSAGES.NO_TASKS}</div>
      )}

      {!loading && tasks.length > 0 && (
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      )}

      <footer className="footer">@ROSYAll.</footer>
    </div>
  );
}