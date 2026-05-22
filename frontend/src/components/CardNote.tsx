import { Card, Dropdown, Label, Button } from "@heroui/react";
import { Pencil } from '@gravity-ui/icons';
import { Ellipsis } from '@gravity-ui/icons';
import { deleteNote } from "../api";
import { useState } from "react";
import UpdateNote from "./UpdateNote";
import DeleteNoteAlert from "./DeleteNoteAlert";

type CardNoteProps = {
    id: string;
    fecha: Date;
    titulo: string;
    contenido: string;
    onMutate?: () => void;
};


export default function CardNote({ id, fecha, titulo, contenido, onMutate }: CardNoteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteNote(id);
            onMutate?.();
            setIsDeleteOpen(false);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Card className="w-full h-[250px] bg-surface" variant="default">
            <Card.Header>
            <p className="text-gray-400 text-xs mb-3">{fecha.toLocaleDateString()}</p>
            <Card.Title className="text-xl font-bold">{titulo}</Card.Title>
            <div className="flex items-center gap-2 absolute top-2 right-1">
                <Dropdown>
                    <Button aria-label="Menu" variant="ghost">
                        <Ellipsis className="cursor-pointer"/>
                    </Button>
                    <Dropdown.Popover>
                        <Dropdown.Menu onAction={(key) => {
                            if (key === "delete") {
                                setIsDeleteOpen(true);
                            }
                        }}>
                        <Dropdown.Item
                            id="delete"
                            textValue="Eliminar nota"
                            variant="danger"
                        >
                            <Label>Eliminar nota</Label>
                        </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
            </div>
            </Card.Header>
            <Card.Content className="overflow-hidden">
            <p className="text-sm line-clamp-3">{contenido}</p>
            </Card.Content>
            <div className="relative">
                <div onClick={() => setIsOpen(true)} className="bg-accent w-8 h-8 rounded-full flex items-center justify-center absolute bottom-2 right-2 cursor-pointer">
                    <Pencil color="white"/>
                </div>
            </div>
            <UpdateNote 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
                id={id} 
                fecha={fecha}
                title={titulo} 
                content={contenido} 
                onUpdated={onMutate}
            />

            <DeleteNoteAlert
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                titulo={titulo}
            />
        </Card>
    );
}