import { Card, Dropdown, Label, Button} from "@heroui/react";
import {Pencil} from '@gravity-ui/icons';
import {Ellipsis} from '@gravity-ui/icons';

type CardNoteProps = {
    id: string;
    fecha: Date;
    titulo:string;
    contenido: string;
};

export default function CardNote({ fecha, titulo, contenido }: CardNoteProps) {
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
                        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                        <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
                            <Label>Eliminar nota</Label>
                        </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
            </div>
            </Card.Header>
            <Card.Content>
            <p className="text-sm">{contenido}</p>
            </Card.Content>
            <div className="relative">
                <div className="bg-accent w-8 h-8 rounded-full flex items-center justify-center absolute bottom-2 right-2 cursor-pointer">
                    <Pencil color="white"/>
                </div>
            </div>
        </Card>
    );
}