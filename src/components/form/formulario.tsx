import { FC, useState, useEffect } from "react";
import { InputField } from "../input/input";
import Button from "../button/button";

interface FormProps {
  inputFields: { label: string; type: string; placeholder: string; iconSrc?: string }[];
  buttonText: string;
  buttonIconSrc: string;
  buttonType: "button" | "submit" | "reset";
  onSubmit: (formData: { [key: string]: string }) => void;
  onInputChange?: (formData: { [key: string]: string }) => void;
}

export const Form: FC<FormProps> = ({
  inputFields,
  buttonText,
  buttonIconSrc,
  buttonType,
  onSubmit,
  onInputChange,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const initialFormData: { [key: string]: string } = {};
    inputFields.forEach((field) => {
      initialFormData[field.label] = "";
    });
    setFormData(initialFormData);
  }, [inputFields]);

  const validateField = (label: string, value: string) => {
    let error = "";

    if (label === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "El correo no es válido.";
      }
    } else if (label === "Contraseña") {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Al menos 1 mayúscula, 1 número, y mínimo 8 caracteres
      if (!passwordRegex.test(value)) {
        error = "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.";
      }
    } else if (label === "Repetir Contraseña") {
      if (value !== formData["Contraseña"]) {
        error = "Las contraseñas no coinciden.";
      }
    }

    setFormErrors((prev) => ({
      ...prev,
      [label]: error,
    }));

    return error === "";
  };

  const handleInputChange = (label: string, value: string) => {
    const updatedFormData = {
      ...formData,
      [label]: value,
    };

    setFormData(updatedFormData);

    validateField(label, value);

    if (onInputChange) {
      onInputChange(updatedFormData);
    }
  };

  useEffect(() => {
    const allFieldsValid = Object.entries(formData).every(
      ([label, value]) => value !== "" && validateField(label, value)
    );
    setIsFormValid(allFieldsValid);
  }, [formData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormValid) {
      onSubmit(formData);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {inputFields.map((field, index) => (
        <div key={index}>
          <InputField
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            iconSrc={field.iconSrc}
            onChange={(value) => handleInputChange(field.label, value)}
          />
          {formErrors[field.label] && (
            <p className="error-message">{formErrors[field.label]}</p>
          )}
        </div>
      ))}

      <Button
        text={buttonText}
        type={buttonType}
        buttonIconSrc={buttonIconSrc}
        disabled={!isFormValid}
      />
    </form>
  );
};

export default Form;
