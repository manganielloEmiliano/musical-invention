import { FC } from "react";
import "./input.css";

interface InputFieldProps {
  label: string; // Etiqueta del campo
  type: string; // Tipo de input (text, email, etc.)
  placeholder: string; // Placeholder dentro del input
  iconSrc?: string; // Fuente del icono opcional
  onChange: (value: string) => void; // Función para manejar cambios
}

export const InputField: FC<InputFieldProps> = ({ label, type, placeholder, iconSrc, onChange }) => {
  return (
    <div className="input-field">

      <label className="input-label">{label}</label>

      <div className="input-wrapper-container mb-2" >
        <div className="input-wrapper">

          {iconSrc && <img src={iconSrc} alt={`${label} icon`} className="input-icon" />}
          

          <input
            type={type}
            placeholder={placeholder}
            className="input-field"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
