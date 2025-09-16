import React, { useCallback } from 'react';

export default function TaskList({ tasks, onToggle, onDelete }) {
  const handleClick = useCallback((e) => {
    const action = e.target.getAttribute('data-action');
    const id = e.target.getAttribute('data-id');
    if (!id) return;
    if (action === 'toggle') onToggle(id);
    if (action === 'delete') onDelete(id);
  }, [onToggle, onDelete]);

  const handleChange = useCallback((e) => {
    const id = e.target.getAttribute('data-id');
    if (id) onToggle(id);
  }, [onToggle]);

  return (
    <ul className="list" onClick={handleClick} onChange={handleChange}>
      {tasks.map((t) => (
        <li key={t.id} className={`item ${t.completed ? 'done' : ''}`}>
          <input type="checkbox" className="check" data-id={t.id} checked={t.completed} readOnly />
          <span className="title">{t.title}</span>
          <button className="icon danger" data-action="delete" data-id={t.id} aria-label={`Eliminar ${t.title}`}>✖</button>
          <button className="icon primary" data-action="toggle" data-id={t.id} aria-label={`Completar ${t.title}`}>✓</button>
        </li>
      ))}
    </ul>
  );
}