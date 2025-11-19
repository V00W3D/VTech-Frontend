// src/components/Admin/features/Modals/Services/CrearModalS.tsx

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalBuilder } from "@common/ModalBuilder";
import { AuthFieldBuilder, AuthButton } from "@common/FormBuilder";
import { useAdmin } from "@hooks/private";
import type { ServiceType } from "@services/private";

// 🔥 Targets predefinidos
const ALL_TARGETS: ServiceType.Target[] = [
  {
    name: "PC",
    description: "Computadora de escritorio",
    icon: "/icons/PC.png",
  },
  {
    name: "Notebook",
    description: "Portátiles y laptops",
    icon: "/icons/laptop.png",
  },
  {
    name: "Consola",
    description: "PS4, PS5, Xbox, Nintendo Switch, etc.",
    icon: "/icons/consola.png",
  },
  {
    name: "Teléfono",
    description: "Celulares y smartphones",
    icon: "/icons/telefono.png",
  },
];

export const CrearModalS = () => {
  document.title = "Admin - Creando servicio";
  const navigate = useNavigate();
  const { Services } = useAdmin;
  const { createService, isLoading } = Services.useCreateService();

  /* ---------------------- FORM ---------------------- */
  const [form, setForm] = useState({
    name: "",
    slogan: "",
    shortDescription: "",
    longDescription: "",
    image: "",
    targets: [] as ServiceType.Target[], // ← array de Target
  });

  /* ---------------------- HANDLE CHANGE ---------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  /* ---------------------- CHECKBOX ---------------------- */
  const handleCheckbox = (target: ServiceType.Target) => {
    setForm((prev) => {
      const exists = prev.targets.some((t) => t.name === target.name);

      const updated = exists
        ? prev.targets.filter((t) => t.name !== target.name)
        : [...prev.targets, target];

      return { ...prev, targets: updated };
    });
  };

  /* ---------------------- SUBMIT ---------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createService({
      name: form.name,
      slogan: form.slogan,
      shortDescription: form.shortDescription,
      longDescription: form.longDescription,
      image: form.image || undefined,
      targets: form.targets,
    });

    navigate(-1);
  };

  return (
    <ModalBuilder
      show
      onClose={() => navigate(-1)}
      title="➕ Crear nuevo servicio"
      width="800px"
      actions={null}
    >
      <form onSubmit={handleSubmit} className="crear-servicio-form">
        <div className="fields-grid">
          <AuthFieldBuilder
            id="name"
            label="Nombre del servicio"
            value={form.name}
            onChange={handleChange}
          />

          <AuthFieldBuilder
            id="slogan"
            label="Slogan"
            value={form.slogan}
            onChange={handleChange}
          />

          <AuthFieldBuilder
            id="shortDescription"
            type="textarea"
            label="Descripción corta"
            value={form.shortDescription}
            onChange={handleChange}
          />

          <AuthFieldBuilder
            id="longDescription"
            type="textarea"
            label="Descripción larga"
            value={form.longDescription}
            onChange={handleChange}
          />

          <AuthFieldBuilder
            id="image"
            label="URL de imagen"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        {/* ---------------------- TARGETS ---------------------- */}
        <h3 className="mt-4 mb-2">Targets del servicio</h3>

        <div className="targets-checkbox-grid">
          {ALL_TARGETS.map((t) => (
            <label key={t.name} className="target-checkbox">
              <input
                type="checkbox"
                checked={form.targets.some((ft) => ft.name === t.name)}
                onChange={() => handleCheckbox(t)}
              />
              <span>{t.name}</span>
            </label>
          ))}
        </div>

        {/* ---------------------- BOTONES ---------------------- */}
        <div className="modal-actions mt-5 flex justify-end gap-3">
          <AuthButton
            text="Cancelar"
            onClick={() => navigate(-1)}
            variant="link"
          />

          <AuthButton
            text="Crear servicio"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </form>
    </ModalBuilder>
  );
};
