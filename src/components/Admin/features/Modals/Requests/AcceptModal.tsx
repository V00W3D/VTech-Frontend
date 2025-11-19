import { useNavigate, useParams } from "react-router-dom";
import { ModalBuilder } from "@common/ModalBuilder";
import { useAdmin } from "@hooks/private";

export const AcceptModal = () => {
  document.title = "Admin - Aceptar solicitud?";

  const navigate = useNavigate();
  const { id } = useParams();
  const { useFetchSolicitudes, useAceptarSolicitud } = useAdmin.Requests;

  const { solicitudes } = useFetchSolicitudes();
  const { aceptarSolicitud, isLoading } = useAceptarSolicitud();

  const solicitud = solicitudes.find((s) => s.id === id);
  if (!solicitud) return null;

  const handleConfirm = async () => {
    await aceptarSolicitud(solicitud);
    navigate(-1);
  };

  return (
    <ModalBuilder
      show
      onClose={() => navigate(-1)}
      title="Confirmar aceptación"
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
            {isLoading ? "Procesando..." : "Aceptar"}
          </button>
        </>
      }
      width="600px"
    >
      <p>
        ¿Desea aceptar la solicitud de{" "}
        <strong>{solicitud.usuario.nombre}</strong>
      </p>
    </ModalBuilder>
  );
};
