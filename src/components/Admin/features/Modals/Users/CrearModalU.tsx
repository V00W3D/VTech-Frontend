// src/components/Admin/features/Modals/Users/CrearModalU.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalBuilder } from "@common/ModalBuilder";
import { useAdmin } from "@hooks/private";
import { AuthFieldBuilder, AuthButton } from "@common/FormBuilder";

export const CrearModalU = () => {
  document.title = "Admin - Creando Usuario";
  const navigate = useNavigate();
  const { crearUsuario, isLoading } = useAdmin.Users.useCrearUsuario();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    userImg: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearUsuario(form);
    navigate(-1);
  };

  return (
    <ModalBuilder
      show
      onClose={() => navigate(-1)}
      title="➕ Crear nuevo usuario"
      width="600px"
      actions={null}
    >
      <form onSubmit={handleSubmit} className="crear-usuario-form">
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
            id="password"
            type="password"
            label="Contraseña"
            value={form.password}
            onChange={handleChange}
          />
          <AuthFieldBuilder
            id="userImg"
            label="URL de imagen de perfil (opcional)"
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
            text="Crear usuario"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </form>
    </ModalBuilder>
  );
};
