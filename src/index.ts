// src/index.ts
import { server } from './mocks/server';

// Inicia MSW para interceptar solicitudes
server.listen();

console.log('Mock Service Worker está interceptando solicitudes');

// Función de ejemplo que realiza una solicitud POST a la API simulada
async function registerUser() {
  const response = await fetch(import.meta.env.VITE_SIGNUP_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'usuario_prueba', password: '123456' }),
  });

  const result = await response.json();
  console.log(result); // Debería imprimir: { message: 'Registro exitoso' }
}

registerUser();
