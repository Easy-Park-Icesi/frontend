import React from 'react';
import EdificiosImage from '../assets/icons/Edificios.svg';
import Zona from '../components/ZoneCard'; // Asegúrate de que este componente exista

function Home() {
  return (
    <div 
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Imagen de fondo */}
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

      {/* Zonas con colores diferentes */}
      <Zona nombre="A" top="250px" left="67px" width="145px" height="181px" color="#7BEE5F" />
      <Zona nombre="B" top="250px" left="245px" width="261px" height="82px" color="#7BEE5F" />
      <Zona nombre="C" top="180px" left="810px" width="189px" height="146px" color="#7BEE5F" />
      <Zona nombre="D" top="30px" left="810px" width="189px" height="150px" color="#7BEE5F" />
      <Zona nombre="E" top="810px" left="880px" width="290px" height="180px" color="#7BEE5F" />
      <Zona nombre="F" top="790px" left="720px" width="140px" height="198px" color="#7BEE5F" />
      <Zona nombre="G" top="870px" left="245px" width="394px" height="116px" color="#7BEE5F" />
      <Zona nombre="H" top="450px" left="67px" width="145px" height="530px" color="#7BEE5F" />
    </div>
  );
}

export default Home;





