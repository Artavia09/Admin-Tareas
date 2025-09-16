import { API_BASE } from './constants.js';

async function safeFetch(url, options = {}) {
  const res = await fetch(url, { 
    headers: { 'Content-Type': 'application/json' }, 
    ...options 
  });
  if (!res.ok) throw new Error('Network error: ' + res.status);
  return await res.json();
}

export async function getTasks() {
  return safeFetch(`${API_BASE}/tasks`);
}

export async function createTask(title) {
  const body = JSON.stringify({ title, completed: false, createdAt: Date.now() });
  return safeFetch(`${API_BASE}/tasks`, { method: 'POST', body });
}

export async function deleteTask(id) {
  return safeFetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
}

export async function updateTask(id, patch) {
  const body = JSON.stringify(patch);
  return safeFetch(`${API_BASE}/tasks/${id}`, { method: 'PATCH', body });
}