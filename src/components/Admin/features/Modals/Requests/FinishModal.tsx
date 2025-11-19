import { useNavigate, useParams } from "react-router-dom";
import { ModalBuilder } from "@common/ModalBuilder";
import { useAdmin } from "@hooks/private";

export const FinishModal = () => {
  document.title = "Admin - Solicitud finalizada?";
  const navigate = useNavigate();
  const { id } = useParams();
  const { useFetchSolicitudes, useFinalizarSolicitud } = useAdmin.Requests;

  const { solicitudes } = useFetchSolicitudes();
  const { finalizarSolicitud, isLoading } = useFinalizarSolicitud();

  const solicitud = solicitudes.find((s) => s.id === id);
  if (!solicitud) return null;

  const handleConfirm = async () => {
    await finalizarSolicitud(solicitud);
    navigate(-1);
  };

  return (
    <ModalBuilder
      show
      onClose={() => navigate(-1)}
      title="Finalizar solicitud"
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
            {isLoading ? "Procesando..." : "Finalizar"}
          </button>
        </>
      }
      width="600px"
    >
      <p>
        ¿Confirma que la solicitud de{" "}
        <strong>{solicitud.usuario.nombre}</strong> ha sido completada con
        éxito?
      </p>
    </ModalBuilder>
  );
};
