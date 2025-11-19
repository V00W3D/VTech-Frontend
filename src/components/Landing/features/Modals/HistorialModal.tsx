import { useNavigate } from "react-router-dom";
import { ModalBuilder } from "@common/ModalBuilder";
import { HistorialTable } from "../Tables/HistorialTable";
import { useLanding } from "@hooks/public";
import { useEffect } from "react";

export const HistorialModal = () => {
  document.title = "V Tech - Historial de solicitudes";
  const navigate = useNavigate();

  const { historial, fetchHistorial, isLoading, isError } =
    useLanding.useFetchHistorial();

  useEffect(() => {
    fetchHistorial(true);
  }, []);

  return (
    <ModalBuilder
      show
      title="Historial de solicitudes"
      onClose={() => navigate(-1)}
      width="1200px"
      actions={
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Cerrar
        </button>
      }
    >
      <HistorialTable
        historial={historial}
        isLoading={isLoading}
        isError={isError}
        fetchHistorial={fetchHistorial}
      />
    </ModalBuilder>
  );
};
