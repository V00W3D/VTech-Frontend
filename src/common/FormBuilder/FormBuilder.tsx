import type { AuthFieldBuilderProps, AuthButtonProps } from "./Types";

// 🧱 Campo de entrada (input + textarea)
export const AuthFieldBuilder = ({
  id,
  type = "text",
  value,
  label,
  onChange,
}: AuthFieldBuilderProps) => {
  const isTextarea = type === "textarea";

  return (
    <div
      className={`input-container ${isTextarea ? "textarea-container" : ""}`}
    >
      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          required
          placeholder=" "
          className="textarea-builder"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required
          placeholder=" "
        />
      )}

      <label htmlFor={id}>{label}</label>
    </div>
  );
};

// 🧱 Botón
export const AuthButton = ({
  text,
  onClick,
  type = "button",
  loading = false,
  variant = "primary",
  disabled = false,
}: AuthButtonProps) => {
  if (variant === "link") {
    return (
      <button
        type={type}
        className="auth-link-btn"
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }

  return (
    <button
      type={type}
      className="auth-main-btn"
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? "Cargando..." : text}
    </button>
  );
};
