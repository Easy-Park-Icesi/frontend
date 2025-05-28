import React, { useEffect, useState } from 'react';
import EdificiosImage from '../assets/icons/Edificios.svg';
import BannerPublicidad from '../assets/icons/banner-publicidad.png';
import Carrera122Image from '../assets/icons/carrera-122.png';
import CanasGordasImage from '../assets/icons/cañasgordas.png'; 
import FlechaHorizontal from '../assets/icons/Arrow-2-horizontal.png' ;
import FlechaVertical from '../assets/icons/Arrow-1-vertical.png' ;
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
    a: { top: '250px', left: '67px', width: '145px', height: '161px' },
    b: { top: '250px', left: '245px', width: '261px', height: '82px' },
    c: { top: '180px', left: '810px', width: '189px', height: '146px' },
    d: { top: '10px', left: '810px', width: '189px', height: '150px' },
    e: { top: '810px', left: '880px', width: '290px', height: '180px' },
    f: { top: '790px', left: '720px', width: '140px', height: '198px' },
    g: { top: '870px', left: '220px', width: '384px', height: '116px' },
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
          left: 40,
          height: '90vh',
          width: '85px',
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

          <img
            src={FlechaHorizontal}
            alt="Flecha"
            style={{
              position: 'absolute',
              top: '413px',     // Cambia esto según la posición que necesites
              left: '90px',    // Cambia esto también
              width: '40px',    // Tamaño de la flecha
              transform: 'rotate(360deg)', // Gírala si quieres que apunte en otra dirección
              zIndex: 900
            }}
          />
          <img
            src={FlechaVertical}
            alt="Flecha"
            style={{
              position: 'absolute',
              top: '920px',     // Cambia esto según la posición que necesites
              left: '608px',    // Cambia esto también
              width: '40px',    // Tamaño de la flecha
              transform: 'rotate(360deg)', // Gírala si quieres que apunte en otra dirección
              zIndex: 900
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
       {/* Tarjetas paginadas estilo oscuro */}
          <div
            style={{
              width: '30vw',
              height: '100vh',           // altura fija
              padding: '20px',
              backgroundColor: '#121212',
              overflowY: 'auto'          // scroll vertical si se necesita
            }}
          >

          <h2 
  style={{ 
    color: '#fff', 
    marginBottom: '16px', 
    fontSize: '40px',    // más grande
    textAlign: 'center', // centrado
    fontFamily: "'Arial Black', Arial, sans-serif",  // tipografía diferente, por ejemplo Arial Black
    fontWeight: '700',   // más negrita
  }}
>
  Zonas
</h2>

         {zonasPaginadas.map((zona) => {
  const disponibles = zona.total_de_parqueaderos - zona.parqueaderos_ocupados;

  return (
    <div
      key={zona.id}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '12px',
        padding: '16px 24px',
        marginBottom: '16px',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Zona ID grande a la izquierda */}
      <div
        style={{
          fontSize: '48px',
          fontWeight: '700',
          color: 'white',
        }}
      >
         <h3 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '50px' }}>
                  Zona {zona.id.toUpperCase()}
                </h3>
      </div>

      {/* Info disponibles y total */}
      <div style={{ textAlign: 'right' }}>
        <p style={{ margin: 0, fontSize: '30px', color: '#ccc' }}>
          Disponibles:
          <span style={{ color: '#7BEE5F', fontWeight: 'bold', marginLeft: '8px' }}>
            {disponibles}
          </span>
        </p>
        <p style={{ margin: 0, fontSize: '30px', color: '#ccc' }}>
          Parqueaderos:
          <span style={{ color: '#FF4C4C', fontWeight: 'bold', marginLeft: '8px' }}>
            {zona.total_de_parqueaderos}
          </span>
        </p>
      </div>
    </div>
  );
})}

        </div>
      </div>

      {/* Imagen de Cañasgordas  */}
      {
      <div
        style={{
          position: 'fixed',
          width: '45%',
          bottom: '95px',
          left: '30%',
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
      }

      {/* Valla publicitaria */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '70%',
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
