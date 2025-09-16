import React from 'react';

export default function Stats({ total, completed }) {
  return (
    <div className="stats portal-edges">
      <span>Total: {total}</span>
      <span>Completadas: {completed}</span>
    </div>
  );
}