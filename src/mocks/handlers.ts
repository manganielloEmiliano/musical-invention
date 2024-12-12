
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Interceptar las solicitudes POST de un registro de usuario
  http.post(import.meta.env.VITE_SIGNUP_API, () => {
    return HttpResponse.json({
      message: 'Registro exitoso',
    });
  }),
];
