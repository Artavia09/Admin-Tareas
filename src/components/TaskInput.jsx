import React, { useCallback, useEffect, useRef } from 'react';
import { MESSAGES } from '../constants.js';
import { sfxAdd, sfxError } from '../sound.js';

export default function TaskInput({ onAdd }) {
  const inputRef = useRef(null);
  const btnRef = useRef(null);

  const handleAdd = useCallback(() => {
    const value = inputRef.current.value.trim();
    if (!value) {
      alert(MESSAGES.EMPTY_INPUT);
      sfxError();
      return;
    }
    onAdd(value);
    sfxAdd();
    inputRef.current.value = '';
    inputRef.current.focus();
  }, [onAdd]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Enter') handleAdd();
    }
    const el = inputRef.current;
    el && el.addEventListener('keydown', onKey);
    return () => el && el.removeEventListener('keydown', onKey);
  }, [handleAdd]);

  return (
    <div className="panel portal-card">
      <input ref={inputRef} className="input" placeholder="Nueva tarea..." aria-label="Nueva tarea" />
      <button ref={btnRef} className="btn" data-action="add" onClick={handleAdd}>
        Agregar
      </button>
    </div>
  );
}