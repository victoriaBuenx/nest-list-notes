import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  TextArea,
  ModalContainer,
  ModalBackdrop,
  ModalDialog,
  ModalHeader,
} from "@heroui/react";

import { useState, useEffect } from "react";
import { updateNote } from "../api";

type UpdateNoteProps = {
  isOpen: boolean;
  onClose: () => void;

  id: string;
  fecha: Date;
  title: string;
  content: string;

  onUpdated?: () => void;
};

export default function UpdateNote({
  isOpen,
  onClose,
  id,
  fecha,
  title,
  content,
  onUpdated,
}: UpdateNoteProps) {

  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  useEffect(() => {
    if (isOpen) {
      setEditTitle(title);
      setEditContent(content);
    }
  }, [isOpen, title, content]);

  const handleUpdate = async () => {
    try {
      await updateNote(id, {
        title: editTitle,
        content: editContent,
      });

      if (onUpdated) {
        onUpdated();
      }

      onClose();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalBackdrop>
            <ModalContainer>
                <ModalDialog className="w-full h-[600px]">
                    <ModalHeader className="text-xl font-bold pb-4 flex flex-col items-start gap-1">
                        Editar Nota
                        <p className="text-gray-400 text-xs font-normal">{fecha.toLocaleDateString()}</p>
                    </ModalHeader>
                    <ModalBody className="flex flex-col gap-4">
                    <TextArea
                        name="title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="text-xl font-bold bg-transparent border-0 focus:ring-0 shadow-none resize-none overflow-y-auto"
                    />
                    <TextArea
                        name="content"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[250px] bg-transparent border-0 focus:ring-0 shadow-none resize-none h-full"
                    />
                    </ModalBody>

                    <ModalFooter className="flex justify-end gap-2 pt-6">
                        <Button
                            variant="ghost"
                            onPress={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            onPress={handleUpdate}
                        >
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalDialog>
            </ModalContainer>
        </ModalBackdrop>
    </Modal>
  );
}