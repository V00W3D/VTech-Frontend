import { useNavigate, useParams } from "react-router-dom";
import { ModalBuilder } from "@common/ModalBuilder";
import { useAdmin } from "@hooks/private";

export const RejectModal = () => {
  document.title = "Admin - Cancelar solicitud?";
  const navigate = useNavigate();
  const { id } = useParams();
  const { useFetchSolicitudes, useRechazarSolicitud } = useAdmin.Requests;

  const { solicitudes } = useFetchSolicitudes();
  const { rechazarSolicitud, isLoading } = useRechazarSolicitud();

  const solicitud = solicitudes.find((s) => s.id === id);
  if (!solicitud) return null;

  const handleConfirm = async () => {
    await rechazarSolicitud(solicitud);
    navigate(-1);
  };

  return (
    <ModalBuilder
      show
      onClose={() => navigate(-1)}
      title="Rechazar solicitud"
      actions={
        <>
          <button className="accion-btn rechazar" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button
            className="accion-btn aceptar"
            disabled={isLoading}
            onClick={handleConfirm}
          >
            {isLoading ? "Procesando..." : "Rechazar"}
          </button>
        </>
      }
      width="600px"
    >
      <p>
        Va a <strong>rechazar</strong> la solicitud de{" "}
        <strong>{solicitud.usuario.nombre}</strong>. Esta acción no se puede
        deshacer. ¿Desea continuar?
      </p>
    </ModalBuilder>
  );
};
