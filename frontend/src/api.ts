const API_BASE = "http://localhost:3000/notes";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(errorBody || `Error ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : ({} as T);
}

export function fetchNotes(): Promise<Note[]> {
  return request<Note[]>(API_BASE);
}

export function createNote(dto: CreateNoteDto): Promise<Note> {
  return request<Note>(API_BASE, {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export function updateNote(id: string, dto: CreateNoteDto): Promise<Note> {
  return request<Note>(`${API_BASE}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}

export function deleteNote(id: string): Promise<void> {
  return request<void>(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
}
