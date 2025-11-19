// src/components/Admin/features/Modals/Users/BanearModalU.tsx
import { useNavigate, useParams } from "react-router-dom";
import { ModalBuilder } from "@common/ModalBuilder";
import { useAdmin } from "@hooks/private";

export const BanearModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { banearUsuario } = useAdmin.Users.useBanearUsuario();
  const { usuarios } = useAdmin.Users.useFetchUsuarios();

  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) return null;

  const handleConfirm = async () => {
    await banearUsuario(id!);
    navigate(-1);
  };

  const esBaneado = usuario.eliminado;
  const titulo = esBaneado ? "Desbanear usuario" : "Banear usuario";
  const colorClase = esBaneado ? "aceptar" : "rechazar";
  const colorTexto = esBaneado ? "text-success" : "text-danger";
  const emoji = esBaneado ? "✅" : "⛔";

  return (
    <ModalBuilder
      show
      onClose={() => navigate(-1)}
      title={`${emoji} ${titulo}`}
      width="600px"
      actions={
        <>
          <button
            className={`accion-btn ${esBaneado ? "rechazar" : "aceptar"}`}
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          <button
            className={`accion-btn ${colorClase}`}
            onClick={handleConfirm}
          >
            {esBaneado ? "Desbanear" : "Banear"}
          </button>
        </>
      }
    >
      <p>
        Está a punto de{" "}
        <strong className={colorTexto}>
          {esBaneado ? "desbanear" : "banear"}
        </strong>{" "}
        al usuario <strong>{usuario.nombre}</strong> ({usuario.email}).
      </p>

      {!esBaneado ? (
        <p className="mt-2 text-danger">
          ⚠️ Esta acción impedirá que el usuario inicie sesión o acceda al
          sistema hasta que sea desbaneado.
        </p>
      ) : (
        <p className="mt-2 text-success">
          ✅ El usuario podrá volver a acceder al sistema normalmente.
        </p>
      )}

      <p className="mt-3 fw-bold">¿Desea continuar?</p>
    </ModalBuilder>
  );
};
