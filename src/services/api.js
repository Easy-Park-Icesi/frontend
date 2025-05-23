//Url&Port.js
import { apiBaseUrl } from '../config/UrlPort.js';

export async function obtenerZonas() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/zonas/resumen`);
    if (!response.ok) throw new Error("Error al obtener zonas");
    return await response.json();
  } catch (error) {
    console.error("Error en la petición GET:", error);
    return [];
  }
}


