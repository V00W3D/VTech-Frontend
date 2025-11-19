// src/components/Admin/features/Modals/Services/BlockServiceModal.tsx
import { useNavigate, useParams } from "react-router-dom";
import { ModalBuilder } from "@common/ModalBuilder";
import { useAdmin } from "@hooks/private";
import { useAdminStore } from "@store/useAdminStore";

export const BloquearModal = () => {
  document.title = "Admin - Bloquear servicio?";
  const navigate = useNavigate();
  const { id } = useParams();
  const { blockService } = useAdmin.Services.useBlockService();

  // 🟢 Selección reactiva — se re-renderiza cuando cambian los servicios
  const servicio = useAdminStore((state) =>
    state.servicios.find((s) => s.id === id)
  );

  if (!servicio) return null;

  const estaBloqueado = servicio.deleted;

  const titulo = estaBloqueado ? "Desbloquear servicio" : "Bloquear servicio";
  const colorClase = estaBloqueado ? "aceptar" : "rechazar";
  const colorTexto = estaBloqueado ? "text-success" : "text-danger";
  const emoji = estaBloqueado ? "🔓" : "🔒";

  const handleConfirm = async () => {
    await blockService(id!);
    navigate(-1); // no hace falta timeout ahora
  };

  return (
    <ModalBuilder
      show
      onClose={() => navigate(-1)}
      title={`${emoji} ${titulo}`}
      width="600px"
      actions={
        <>
          <button className="accion-btn rechazar" onClick={() => navigate(-1)}>
            Cancelar
          </button>

          <button
            className={`accion-btn ${colorClase}`}
            onClick={handleConfirm}
          >
            {estaBloqueado ? "Desbloquear" : "Bloquear"}
          </button>
        </>
      }
    >
      <p>
        Está a punto de{" "}
        <strong className={colorTexto}>
          {estaBloqueado ? "desbloquear" : "bloquear"}
        </strong>{" "}
        el servicio <strong>{servicio.name}</strong>.
      </p>

      {!estaBloqueado ? (
        <p className="mt-2 text-danger">
          ⚠️ Este servicio dejará de estar disponible para los usuarios hasta
          que sea desbloqueado.
        </p>
      ) : (
        <p className="mt-2 text-success">
          ✅ El servicio volverá a estar disponible normalmente.
        </p>
      )}

      <p className="mt-3 fw-bold">¿Desea continuar?</p>
    </ModalBuilder>
  );
};
