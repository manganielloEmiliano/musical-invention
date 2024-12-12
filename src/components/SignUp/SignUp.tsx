import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../form/formulario";
import useFetch from "../../hooks/useFetch";
import { Logo } from "../logo/logo";
import "./SignUp.css";

// Rutas absolutas para imágenes directamente en `public`
const UserIcon = "/User.svg";
const EnvelopeIcon = "/Envelope.svg";
const EyeSlashIcon = "/EyeSlash.svg";
const ArrowUpRightIcon = "/ArrowUpRight.svg";
const LogoFlock = "/logo-flock.png";

interface ApiResponse {
  message: string;
}

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const inputFields = [
    { label: "Nombre y Apellido", type: "text", placeholder: "Nombre y Apellido", iconSrc: UserIcon },
    { label: "Email", type: "email", placeholder: "example@example.com", iconSrc: EnvelopeIcon },
    { label: "Contraseña", type: "password", placeholder: "Escribe tu contraseña", iconSrc: EyeSlashIcon },
    { label: "Repetir Contraseña", type: "password", placeholder: "Repite tu contraseña", iconSrc: EyeSlashIcon },
  ];

  const { data, loading, error, fetchData } = useFetch<ApiResponse>({
    method: "POST",
    url: import.meta.env.VITE_SIGNUP_API,
    body: {},
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleFormSubmit = (formData: { [key: string]: string }) => {
    const requestBody = {
      username: formData["Email"],
      name: formData["Nombre y Apellido"],
      password: formData["Contraseña"],
    };
    fetchData(requestBody);
  };

  const handleInputChange = (formData: { [key: string]: string }) => {
    console.log("Estado actualizado del formulario:", formData);
  };

  return (
    <>
      <div className="absolute top-5 left-5">
        <Logo src={LogoFlock} width="222px" height="57px" />
      </div>

      <div className="div-formulario mt-20">
        <h1 className="h1-bienvenido">
          Bienvenido <span className="font-semibold">Flocker!</span>
        </h1>
        <h2 className="h2-crear-Cuenta">Crea una cuenta</h2>

        <Form
          inputFields={inputFields}
          buttonText="Ingresar"
          onSubmit={handleFormSubmit}
          buttonType="submit"
          buttonIconSrc={ArrowUpRightIcon}
          onInputChange={handleInputChange}
        />

        <p className="p-tienesCuenta">
          ¿Ya tienes una cuenta?{" "}
          <span className="cursor-pointer font-bold" onClick={() => navigate("/")}>
            Inicia sesión
          </span>
        </p>

        {loading && <p>Cargando...</p>}
        {error && typeof error === "string" && <p>Error al registrar: {error}</p>}
        {data && <p>Registro exitoso: {data.message}</p>}
      </div>
    </>
  );
};
