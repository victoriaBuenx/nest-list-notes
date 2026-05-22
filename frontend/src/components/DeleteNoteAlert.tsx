import { AlertDialog, Button } from "@heroui/react";

type DeleteNoteAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
};

export default function DeleteNoteAlert({
  isOpen,
  onClose,
  onConfirm,
  titulo,
}: DeleteNoteAlertProps) {
  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onClose}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-surface p-4 shadow-xl outline-none">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header className="flex gap-2 pb-2">
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="">¿Eliminar nota permanentemente?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="pb-4">
              <p>
                Esto eliminará permanentemente la nota <strong>{titulo}</strong>.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex justify-end gap-2">
              <Button onPress={onClose} variant="ghost">
                Cancelar
              </Button>
              <Button
                variant="danger"
                onPress={() => {
                  onConfirm();
                }}
              >
                Eliminar Nota
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
