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
        console.log('Error en la petición GET:', error);
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
    a: { top: '250px', left: '67px', width: '145px', height: '181px' },
    b: { top: '250px', left: '245px', width: '261px', height: '82px' },
    c: { top: '180px', left: '810px', width: '189px', height: '146px' },
    d: { top: '10px', left: '810px', width: '189px', height: '150px' },
    e: { top: '810px', left: '880px', width: '290px', height: '180px' },
    f: { top: '790px', left: '720px', width: '140px', height: '198px' },
    g: { top: '870px', left: '245px', width: '394px', height: '116px' },
    h: { top: '450px', left: '67px', width: '145px', height: '530px' },
    i: { top: '240px', left: '1024px', width: '130px', height: '85px' },
    j: { top: '10px', left: '1024px', width: '130px', height: '120px' },
    z: { top: '10px', left: '1170px', width: '130px', height: '316px' },
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
          const pos = posiciones[id]; // Convertir a minúsculas para coincidir con las claves del objeto posiciones
          // console.log("zona:", id, "posición:", pos);
          console.log("zona:", id, "posición:", pos);
          if (!pos) return null;
           

          const color = getColorSegunOcupacion(parqueaderos_ocupados, total_de_parqueaderos);

          return (
            <Zona
              key={id}
              nombre={id.toUpperCase()} // Convertir a mayúsculas para mostrar
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
      <div style={{ width: '30vw', padding: '10px', overflowY: 'scroll' }}>
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


