import { FC, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { Form } from "../form/formulario";
import useFetch from "../../hooks/useFetch";
import { Logo } from "../logo/logo";

interface ApiResponse {
  access_token?: string;
  token_type?: string;
  user?: string;
}

export const Login: FC = () => {
  const navigate = useNavigate();

  // Manejo de almacenamiento local para autenticación
  const [authToken, setAuthToken, removeAuthToken] = useLocalStorage<string | null>("auth-token", null);
  const [uid, setUid, removeUid] = useLocalStorage<string | null>("uid", null);

  const inputFields = [
    {
      label: "Email",
      type: "email",
      placeholder: "example@example.com",
      iconSrc: "/Envelope.svg",
    },
    {
      label: "Contraseña",
      type: "password",
      placeholder: "************",
      iconSrc: "/EyeSlash.svg",
    },
  ];

  const { data, loading, error, fetchData } = useFetch<ApiResponse>({
    method: "POST",
    url: import.meta.env.VITE_LOGIN_API,
    body: {},
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Manejo de respuesta de la API
  useEffect(() => {
    if (authToken) {
      console.log("Token recuperado del localStorage:", authToken);
      console.log("UID recuperado del localStorage:", uid);
    }

    if (data?.access_token && !authToken) {
      // Guardar el token
      setAuthToken(data.access_token);

      // Guardar el UID si está disponible
      if (data.user) {
        setUid(data.user);
      }

      console.log("Token y datos guardados:", {
        authToken: data.access_token,
        uid: data.user,
      });

      navigate("/home");
    }
  }, [data, authToken, setAuthToken, setUid, navigate]);

  // Manejo del formulario de inicio de sesión
  const handleFormSubmit = (formData: { [key: string]: string }) => {
    const requestBody = {
      username: formData["Email"],
      password: formData["Contraseña"],
    };

    fetchData(requestBody);
  };

  // Manejo del cierre de sesión
  const handleLogout = () => {
    removeAuthToken();
    removeUid();
    console.log("Has cerrado sesión. Token y UID eliminados.");
  };

  return (
    <>
      {/* Logo */}
      <div className="absolute top-5 left-5">
        <Logo src="/logo-flock.png" width="222px" height="57px" />
      </div>

      {/* Contenedor principal */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-[463px] h-[469px] flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-light text-center mb-2">
            Bienvenido <span className="font-semibold">Flocker!</span>
          </h1>
          <h2
            className="text-white text-3xl sm:text-4xl font-light text-center mb-6"
            style={{ fontFamily: "Poppins", fontWeight: 300 }}
          >
            Inicia sesión
          </h2>
          <Form
            inputFields={inputFields}
            buttonText="Ingresar"
            onSubmit={handleFormSubmit}
            buttonType="submit"
            buttonIconSrc="/ArrowUpRight.svg"
          />
          <p className="text-white text-sm font-semibold mt-4">
            ¿Aún no tienes una cuenta?{" "}
            <span
              className="cursor-pointer font-bold"
              onClick={() => navigate("/signup")}
            >
              Regístrate
            </span>
          </p>
          {loading && <p className="text-white mt-4">Cargando...</p>}
          {error && <p className="text-red-400 mt-4">Error al iniciar sesión: {error}</p>}
          {data && data.access_token && (
            <p className="text-green-400 mt-4">
              Inicio de sesión exitoso: {data.user}
            </p>
          )}
          {authToken && (
            <button
              onClick={handleLogout}
              className="mt-6 py-2 px-4 bg-red-500 text-white rounded-full"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </>
  );
};
