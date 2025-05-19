import React, { useEffect, useState } from 'react';
import EdificiosImage from '../assets/icons/Edificios.svg';
import Zona from '../components/ZoneCard';
import { obtenerZonas } from '../services/api';

function Home() {
  const [zonas, setZonas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const datos = await obtenerZonas();
        setZonas(datos);
      } catch (error) {
        console.error('Error al obtener las zonas:', error);
      }
    }
    fetchData();
  }, []);

  const getColorSegunOcupacion = (ocupados, total) => {
    const porcentaje = (ocupados / total) * 100;
    if (porcentaje <= 25) return '#7BEE5F';      // verde
    if (porcentaje <= 50) return '#FFFF66';      // amarillo
    if (porcentaje <= 99) return '#FFA500';    // naranja
    return '#FF4C4C';                            // rojo
  };

  // Posiciones estáticas por zona (para el mapa)
  const posiciones = {
    A: { top: '250px', left: '67px', width: '145px', height: '181px' },
    B: { top: '250px', left: '245px', width: '261px', height: '82px' },
    C: { top: '180px', left: '810px', width: '189px', height: '146px' },
    D: { top: '10px', left: '810px', width: '189px', height: '150px' },
    E: { top: '810px', left: '880px', width: '290px', height: '180px' },
    F: { top: '790px', left: '720px', width: '140px', height: '198px' },
    G: { top: '870px', left: '245px', width: '394px', height: '116px' },
    H: { top: '450px', left: '67px', width: '145px', height: '530px' },
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Mapa */}
      <div 
        style={{
          height: '100vh',
          width: '70vw',
          backgroundColor: 'white',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <img
          src={EdificiosImage}
          alt="Edificios"
          style={{
            position: 'absolute',
            left: '180px',
            top: '70px',
            height: '902.5px',
            width: '986px'
          }}
        />

        {zonas.map((zona) => {
          const { id, parqueaderos_ocupados, total_de_parqueaderos } = zona;
          const pos = posiciones[id];
          if (!pos) return null;

          const color = getColorSegunOcupacion(parqueaderos_ocupados, total_de_parqueaderos);

          return (
            <Zona
              key={id}
              nombre={id}
              top={pos.top}
              left={pos.left}
              width={pos.width}
              height={pos.height}
              color={color}
            />
          );
        })}
      </div>

      {/* Tarjetas al lado */}
      <div style={{ width: '30vw', padding: '20px', overflowY: 'scroll' }}>
        <h2>Zonas</h2>
        {zonas.map((zona) => (
          <div
            key={zona.id}
            style={{
              border: '1px solid gray',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#f5f5f5'
            }}
          >
            <h3>Zona {zona.id}</h3>
            <p>Ocupados: {zona.parqueaderos_ocupados}</p>
            <p>Totales: {zona.total_de_parqueaderos}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


