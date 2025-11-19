import React, { useState } from "react";
import { ModalBuilder } from "@common/ModalBuilder";
import { useLanding } from "@hooks/public";
import { useAuthStore } from "@store/useAuthStore";
import type { LandingTypes } from "@services/public";

interface RequestModalProps {
  show: boolean;
  onClose: () => void;
  serviceName: string; // 🔹 ahora se usa directamente
  targets: LandingTypes.Target[];
  clientName?: string;
}

const RequestModal: React.FC<RequestModalProps> = ({
  show,
  onClose,
  serviceName,
  targets,
  clientName = "Usuario invitado",
}) => {
  document.title = "V Tech - Solicitando un servicio";
  const { isLogged } = useAuthStore();
  const [selectedTarget, setSelectedTarget] = useState("");
  const [description, setDescription] = useState("");
  const { useCreateRequest } = useLanding;
  const { createRequest, isLoading } = useCreateRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createRequest({
      service: serviceName,
      target: selectedTarget,
      description,
    });

    onClose();
  };

  return (
    <ModalBuilder
      show={show}
      title={`Solicitando ${serviceName}`}
      onClose={onClose}
      width="600px"
      actions={
        <>
          <button
            type="submit"
            form="request-form"
            className="btn btn-primary"
            disabled={isLoading || !isLogged}
          >
            {isLoading
              ? "Enviando..."
              : isLogged
              ? "Enviar solicitud"
              : "Inicie sesión para continuar"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </>
      }
    >
      <form id="request-form" onSubmit={handleSubmit}>
        <div className="modal-section client-info mb-2">
          <p>
            <strong>Cliente:</strong> {clientName}
          </p>
        </div>

        <div className="modal-field mb-3">
          <label htmlFor="target" className="modal-label">
            Tipo de servicio:
          </label>
          <select
            id="target"
            className="modal-select"
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            required
          >
            <option value="">Seleccionar...</option>
            {targets.map((t) => (
              <option key={t._id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-field mb-3">
          <label htmlFor="description" className="modal-label">
            Descripción del problema:
          </label>
          <textarea
            id="description"
            className="modal-textarea"
            placeholder="Describa brevemente el problema..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="modal-disclaimer text-sm text-muted">
          <p>
            ⚠️ <strong>Importante:</strong> El precio será acordado luego de la
            revisión del técnico, con consentimiento del cliente.
          </p>
          <p>
            📱 Será contactado vía <strong>WhatsApp</strong> cuando su solicitud
            sea aprobada.
          </p>
        </div>
      </form>
    </ModalBuilder>
  );
};

export default RequestModal;
