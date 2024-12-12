import { FC } from "react";
import "./button.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  buttonIconSrc?: string; 
  disabled?: boolean; // Propiedad opcional para deshabilitar el botón
  
}

const Button: FC<ButtonProps> = ({ text, onClick, type = "button", buttonIconSrc, disabled=false }) => {
  return (
    <div className="button-container">
      <button
        type={type}
        onClick={onClick}
        className={`custom-button ${disabled ? "button-disabled" : ""}`} // Estilo para botón deshabilitado
        disabled={disabled} // Atributo HTML para deshabilitar
      >
        {buttonIconSrc && <img src={buttonIconSrc} alt="Button Icon" className="button-icon" />}
        {text}
      </button>
    </div>
  );
};

export default Button;
