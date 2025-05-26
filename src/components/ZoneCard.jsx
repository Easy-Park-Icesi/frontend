import React from 'react';

function Zona({ nombre, top, left, width, height, color }) {
  return (
    <div style={{
      position: 'absolute',
      top,
      left,
      width,
      height,
      backgroundColor: color, // Usar el color pasado como prop
      color: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      border: '5px solid black',
      borderRadius: '4px'
      

    }}>
      {nombre}
    </div>
  );
}

export default Zona;
