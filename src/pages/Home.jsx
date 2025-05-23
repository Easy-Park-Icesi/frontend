import React, { useEffect, useState } from 'react';
import EdificiosImage from '../assets/icons/Edificios.svg';
import BannerPublicidad from '../assets/icons/banner-publicidad.png';
import Carrera122Image from '../assets/icons/carrera-122.png';
// import CanasGordasImage from '../assets/icons/cañasgordas.png'; // Comentado temporalmente
import Zona from '../components/ZoneCard';
import { obtenerZonas } from '../services/api';

function Home() {
  const [zonas, setZonas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const ITEMS_POR_PAGINA = 6;

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

    const intervaloDatos = setInterval(fetchData, 3000);
    return () => clearInterval(intervaloDatos);
  }, []);

  useEffect(() => {
    if (zonas.length === 0) return;

    const intervaloPagina = setInterval(() => {
      setPagina((prev) => (prev + 1) % Math.ceil(zonas.length / ITEMS_POR_PAGINA));
    }, 3000);

    return () => clearInterval(intervaloPagina);
  }, [zonas]);

  const getColorSegunOcupacion = (ocupados, total) => {
    const porcentaje = (ocupados / total) * 100;
    if (porcentaje <= 25) return '#7BEE5F';
    if (porcentaje <= 50) return '#FFFF66';
    if (porcentaje <= 99) return '#FFA500';
    return '#FF4C4C';
  };

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

  const startIndex = pagina * ITEMS_POR_PAGINA;
  const zonasPaginadas = zonas.slice(startIndex, startIndex + ITEMS_POR_PAGINA);

  return (
    <>
      {/* Imagen fija izquierda (Carrera 122) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '80px',
          backgroundColor: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1100,
        }}
      >
        <img
          src={Carrera122Image}
          alt="Carrera 122"
          style={{
            maxHeight: '90%',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Contenedor principal con margen izquierdo ajustado */}
      <div style={{ marginLeft: '120px', display: 'flex' }}>
        {/* Mapa */}
        <div
          style={{
            height: '100vh',
            width: '70vw',
            backgroundColor: 'black',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            position: 'relative',
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
              width: '986px',
            }}
          />

          {zonas.map((zona) => {
            const { id, parqueaderos_ocupados, total_de_parqueaderos } = zona;
            const pos = posiciones[id.toLowerCase()];
            if (!pos) return null;

            const color = getColorSegunOcupacion(parqueaderos_ocupados, total_de_parqueaderos);

            return (
              <Zona
                key={id}
                nombre={id.toUpperCase()}
                top={pos.top}
                left={pos.left}
                width={pos.width}
                height={pos.height}
                color={color}
              />
            );
          })}
        </div>

        {/* Tarjetas paginadas estilo oscuro */}
        <div style={{ width: '30vw', padding: '20px', backgroundColor: '#121212' }}>
          <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '28px' }}>Zonas</h2>
          {zonasPaginadas.map((zona) => {
            const disponibles = zona.total_de_parqueaderos - zona.parqueaderos_ocupados;

            return (
              <div
                key={zona.id}
                style={{
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  backgroundColor: '#1e1e1e',
                  color: '#fff',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                }}
              >
                <h3 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '12px' }}>
                  Zona {zona.id}
                </h3>
                <p style={{ color: '#ccc', fontSize: '20px', margin: 0 }}>
                  Disponibles:{' '}
                  <span style={{ color: '#7BEE5F', fontWeight: 'bold', fontSize: '20px' }}>
                    {disponibles}
                  </span>
                </p>
                <p style={{ color: '#ccc', fontSize: '24px', margin: 0, textAlign: 'right' }}>
                  Parqueaderos:{' '}
                  <span style={{ color: '#FF4C4C', fontWeight: 'bold', fontSize: '24px' }}>
                    {zona.total_de_parqueaderos}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Imagen de Cañasgordas comentada temporalmente */}
      {/*
      <div
        style={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1001,
        }}
      >
        <img
          src={CanasGordasImage}
          alt="Cañasgordas"
          style={{
            maxHeight: '60px',
            objectFit: 'contain',
          }}
        />
      </div>
      */}

      {/* Valla publicitaria */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#000',
          display: 'flex',
          justifyContent: 'center',
          padding: '10px 0',
          zIndex: 1000,
        }}
      >
        <img
          src={BannerPublicidad}
          alt="Publicidad"
          style={{
            height: '80px',
            width: '90%',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </div>
    </>
  );
}

export default Home;
