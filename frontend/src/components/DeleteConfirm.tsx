import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  noteTitle: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}

export default function DeleteConfirm({ open, noteTitle, onConfirm, onCancel }: Props) {
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  async function handleConfirm() {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
        aria-describedby="delete-confirm-desc"
        style={{ maxWidth: 400 }}
      >
        <div className="modal-panel__header">
          <h2 id="delete-confirm-title" className="modal-panel__title">
            Eliminar nota
          </h2>
          <button className="modal-panel__close" onClick={onCancel} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="modal-panel__body delete-modal__body">
          <div className="delete-modal__icon">🗑️</div>
          <p id="delete-confirm-desc" className="delete-modal__text">
            ¿Estás segura de que quieres eliminar{" "}
            <span className="delete-modal__note-title">"{noteTitle}"</span>?
            <br />
            Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="modal-panel__footer" style={{ justifyContent: "center" }}>
          <button className="btn btn--ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn--danger" onClick={handleConfirm} disabled={deleting}>
            {deleting ? "Eliminando..." : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
