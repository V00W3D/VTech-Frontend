import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ModalBuilder } from "@common/ModalBuilder";
import { AuthFieldBuilder, AuthButton } from "@common/FormBuilder";
import { useAdminStore } from "@store/useAdminStore";
import { useEditService } from "@hooks/private/AdminHooks/Services/editService";
import type { ServiceType } from "@services/private";

// 🔥 Targets fijos sin ID, coinciden con tu backend
const ALL_TARGETS: ServiceType.Target[] = [
  { name: "PC" },
  { name: "Notebook" },
  { name: "Consolas" },
  { name: "Teléfonos" },
];

export const EditarModalS = () => {
  document.title = "Admin - Editando servicio";
  const navigate = useNavigate();
  const { id } = useParams();

  const { servicios } = useAdminStore();
  const { editService, isLoading } = useEditService();

  const servicio = servicios.find((s) => s.id === id);

  /* ---------------------- FORM STATE ---------------------- */
  const [form, setForm] = useState({
    name: "",
    slogan: "",
    shortDescription: "",
    longDescription: "",
    image: "",
    targets: [] as ServiceType.Target[], // ← ahora objetos completos
  });

  /* ---------------------- HANDLE CHANGE ---------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  /* ---------------------- LOAD INITIAL DATA ---------------------- */
  useEffect(() => {
    if (servicio) {
      setForm({
        name: servicio.name ?? "",
        slogan: servicio.slogan ?? "",
        shortDescription: servicio.shortDescription ?? "",
        longDescription: servicio.longDescription ?? "",
        image: servicio.image ?? "",
        targets: servicio.targets, // ← vienen objetos desde el backend
      });

      console.log("▶ Targets cargados:", servicio.targets);
    }
  }, [servicio]);

  /* ---------------------- CHECKBOX HANDLER ---------------------- */
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
    if (!id) return;

    console.log("▶ FORM ENVIADO AL BACK:", {
      ...form,
      id,
    });

    await editService({
      id,
      name: form.name,
      slogan: form.slogan,
      shortDescription: form.shortDescription,
      longDescription: form.longDescription,
      image: form.image,
      targets: form.targets, // ← Target[] como requiere tu backend
    });

    navigate(-1);
  };

  /* ---------------------- LOADING PREVIO ---------------------- */
  if (!servicio)
    return (
      <ModalBuilder
        show
        onClose={() => navigate(-1)}
        title="Cargando..."
        actions={null}
        width="800px"
      >
        <p className="text-muted text-center p-3">Cargando datos...</p>
      </ModalBuilder>
    );

  /* ---------------------- UI PRINCIPAL ---------------------- */
  return (
    <ModalBuilder
      show
      onClose={() => navigate(-1)}
      title="✏️ Editar servicio"
      width="800px"
      actions={null}
    >
      <form onSubmit={handleSubmit} className="editar-servicio-form">
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
            label="Descripción corta"
            value={form.shortDescription}
            type="textarea"
            onChange={handleChange}
          />

          <AuthFieldBuilder
            id="longDescription"
            label="Descripción larga"
            value={form.longDescription}
            type="textarea"
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
