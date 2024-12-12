import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignUp } from "./SignUp";
import { MemoryRouter } from "react-router-dom";
import { server } from "../../mocks/server"; // Asegúrate de configurar tus mocks

// Arrancar el servidor antes de las pruebas
beforeAll(() => server.listen());

// Restablecer los handlers después de cada prueba
afterEach(() => server.resetHandlers());

// Cerrar el servidor después de todas las pruebas
afterAll(() => server.close());

describe("SignUp component", () => {
  test("Debe permitir el registro cuando todos los datos son válidos", async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: /Ingresar/i });

    // El botón debe estar inicialmente deshabilitado
    expect(submitButton).toBeDisabled();

    const nameInput = screen.getByPlaceholderText(/nombre y apellido/i);
    const emailInput = screen.getByPlaceholderText(/example@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/escribe tu contraseña/i);
    const repeatPasswordInput = screen.getByPlaceholderText(/repite tu contraseña/i);

    // Completar los campos del formulario con datos válidos
    fireEvent.change(nameInput, { target: { value: "Mi Nombre" } });
    fireEvent.change(emailInput, { target: { value: "example@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password1" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "Password1" } });

    // Ahora el botón debe estar habilitado
    expect(submitButton).not.toBeDisabled();

    // Enviar el formulario
    fireEvent.click(submitButton);

    // Esperar a que aparezca el mensaje de éxito
    await waitFor(() => screen.getByText(/registro exitoso/i));

    // Verificar que el mensaje de éxito se muestra
    expect(screen.getByText(/registro exitoso/i)).toBeInTheDocument();
  });

  test("No puede realizar el registro si no se ingresan todos los datos", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: /Ingresar/i });
    expect(submitButton).toBeDisabled();

    const nameInput = screen.getByPlaceholderText(/nombre y apellido/i);
    const emailInput = screen.getByPlaceholderText(/example@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/escribe tu contraseña/i);

    // Completar solo un campo
    fireEvent.change(nameInput, { target: { value: "Mi Nombre" } });

    // Botón debe seguir deshabilitado
    expect(submitButton).toBeDisabled();

    // Completar más campos pero no todos
    fireEvent.change(emailInput, { target: { value: "example@example.com" } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: "Password1" } });

    // Sin repetir contraseña, sigue deshabilitado
    expect(submitButton).toBeDisabled();
  });

  test("Muestra errores si algún campo tiene datos inválidos", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: /Ingresar/i });
    const emailInput = screen.getByPlaceholderText(/example@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/escribe tu contraseña/i);

    // Completar con un email inválido
    fireEvent.change(emailInput, { target: { value: "email-invalido" } });

    // Completar con una contraseña inválida
    fireEvent.change(passwordInput, { target: { value: "short" } });

    // Verificar mensajes de error
    expect(screen.getByText(/El correo no es válido/i)).toBeInTheDocument();
    expect(
      screen.getByText(/La contraseña debe tener al menos 8 caracteres, una mayúscula y un número/i)
    ).toBeInTheDocument();

    // El botón sigue deshabilitado
    expect(submitButton).toBeDisabled();
  });

  test("No puede enviar el formulario con errores visibles", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: /Ingresar/i });
    const passwordInput = screen.getByPlaceholderText(/escribe tu contraseña/i);
    const repeatPasswordInput = screen.getByPlaceholderText(/repite tu contraseña/i);

    // Contraseña no coincide con "Repetir Contraseña"
    fireEvent.change(passwordInput, { target: { value: "Password1" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "WrongPassword" } });

    // Verificar mensaje de error
    expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();

    // El botón sigue deshabilitado
    expect(submitButton).toBeDisabled();
  });
});
