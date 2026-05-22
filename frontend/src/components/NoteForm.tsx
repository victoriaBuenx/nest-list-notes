import { FloppyDisk } from "@gravity-ui/icons";
import { Button, Description, FieldError, Fieldset, Form, Input, Label, TextArea, TextField, toast } from "@heroui/react";
import { Modal } from "@heroui/react/modal";
import { createNote } from "../api";
import { useState } from "react";

type NoteFormProps = {
  onClose: () => void;
  onCreated?: () => void; 
};

export function NoteForm({ onClose, onCreated }: NoteFormProps) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setLoading(true);
      await createNote({
        title: formData.get("title") as string,
        content: formData.get("content") as string,
      });

      toast.success("¡Nota guardada!", {
        description: "La nota se guardó correctamente.",
      });

      onCreated?.();
      onClose();
    } catch (err) {
      toast.danger("Error al guardar", {
        description: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="w-full h-[430px]">
            <Modal.CloseTrigger />
            <Modal.Body>
              <Form onSubmit={onSubmit} id="note-form" className="m-3">
                <Fieldset className="w-full">
                  <Fieldset.Legend className="font-bold text-xl">Nueva Nota</Fieldset.Legend>
                  <Description>Complete los campos para crear una nueva nota.</Description>
                  <Fieldset.Group className="overflow-visible">
                    <TextField isRequired name="title"> 
                      <Label>Titulo</Label>
                      <Input placeholder="Mi nota..." variant="secondary" className="w-full" />
                      <FieldError />
                    </TextField>
                    <TextField isRequired name="content"> 
                      <Label>Descripción</Label>
                      <TextArea placeholder="Escribe aquí..." variant="secondary" className="h-32" />
                      <FieldError />
                    </TextField>
                  </Fieldset.Group>
                </Fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" type="submit" form="note-form" isDisabled={loading}>
                <FloppyDisk />
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}