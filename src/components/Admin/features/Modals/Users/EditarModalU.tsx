import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ModalBuilder } from "@common/ModalBuilder";
import { useAdmin } from "@hooks/private";
import { AuthFieldBuilder, AuthButton } from "@common/FormBuilder";
import { useAdminStore } from "@store/useAdminStore";

export const EditarModalU = () => {
  document.title = "Admin - Editando Usuario";
  const navigate = useNavigate();
  const { id } = useParams();
  const { usuarios } = useAdminStore();
  const { editarUsuario, isLoading } = useAdmin.Users.useEditarUsuario();

  const usuario = usuarios.find((u) => u.id === id);

  // ✅ El hook useState debe ejecutarse SIEMPRE, sin condicionales
  const [form, setForm] = useState({
    name: usuario?.nombre ?? "",
    email: usuario?.email ?? "",
    phone: usuario?.telefono ?? "",
    userImg: usuario?.imagen ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await editarUsuario({ id, data: { ...form } });
    navigate(-1);
  };

  // ✅ Solo renderizá el contenido si usuario existe
  if (!usuario)
    return (
      <ModalBuilder
        show
        onClose={() => navigate(-1)}
        title="Cargando usuario..."
        actions={null}
        width="600px"
      >
        <p className="text-muted text-center p-3">
          Cargando datos del usuario...
        </p>
      </ModalBuilder>
    );

  return (
    <ModalBuilder
      show
      onClose={() => navigate(-1)}
      title="✏️ Editar usuario"
      width="600px"
      actions={null}
    >
      <form onSubmit={handleSubmit} className="editar-usuario-form">
        <div className="fields-grid">
          <AuthFieldBuilder
            id="name"
            label="Nombre completo"
            value={form.name}
            onChange={handleChange}
          />
          <AuthFieldBuilder
            id="email"
            type="email"
            label="Correo electrónico"
            value={form.email}
            onChange={handleChange}
          />
          <AuthFieldBuilder
            id="phone"
            type="tel"
            label="Teléfono"
            value={form.phone}
            onChange={handleChange}
          />
          <AuthFieldBuilder
            id="userImg"
            label="URL de imagen de perfil"
            value={form.userImg}
            onChange={handleChange}
          />
        </div>

        <div className="modal-actions mt-4 flex justify-end gap-3">
          <AuthButton
            text="Cancelar"
            onClick={() => navigate(-1)}
            variant="link"
          />
          <AuthButton
            text="Guardar cambios"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </form>
    </ModalBuilder>
  );
};
