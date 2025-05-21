// src/services/api.js
/*
  Este archivo contiene funciones para interactuar con la API.
  Puedes agregar más funciones según sea necesario.

export async function obtenerZonas() {
  try {
    const response = await fetch("http://localhost:8080/zonas"); // o el endpoint que te dieron en Postman
    if (!response.ok) throw new Error("Error al obtener zonas");
    return await response.json();
  } catch (error) {
    console.error("Error en la petición GET:", error);
    return [];
  }
}
*/

// src/services/api.js
export async function obtenerZonas() {
  const respuesta = await fetch('http://localhost:8080/api/zonas/resumen'); // Cambia la URL según tu configuración
  if (!respuesta.ok) {
    throw new Error('hola');
  }
  const data = await respuesta.json();
  return data;

}

