import { Button } from "@heroui/react";
import CardNote from "../components/CardNote";
import {Plus} from '@gravity-ui/icons';
import { useEffect, useState } from "react";
import { NoteForm } from "../components/NoteForm";
import { fetchNotes, type Note } from "../api";

export default function NotesPage() {
    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadNotes = () => {
        fetchNotes()
        .then(setNotes)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadNotes();
    }, []);

    if (loading) return <p>Cargando notas...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="m-10">
            <header className="mb-5">
                <h1 className="!text-3xl font-bold">Notas</h1>
            </header>
            <div className="grid grid-cols-4 gap-4">
                {notes.map((note) => (
                     <CardNote
                        key={note.id}
                        id= {note.id}
                        fecha={new Date(note.createdAt)}
                        titulo={note.title}
                        contenido={note.content}
                        onMutate={loadNotes}
                    />
                ))}
            </div>
            {open && (
                <NoteForm onClose={() => setOpen(false)} onCreated={loadNotes} />
            )}
            <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg" variant="primary" size="lg" onClick={() => setOpen(true)}>
                <Plus />
            </Button>
        </div>
    );
}