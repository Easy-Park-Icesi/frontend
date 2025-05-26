import React from 'react';
import PropTypes from 'prop-types';

function Zona({ nombre, top, left, width, height, color }) {
  const getTextColor = (bgColor) => {
    if (['#FFFF66', '#7BEE5F'].includes(bgColor)) return 'black'; 
    return 'white';
  };

  return (
    <div style={{
      position: 'absolute',
      top,
      left,
      width,
      height,
      backgroundColor: color,
      color: getTextColor(color),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: '700',
      border: '5px solid black',
<<<<<<< HEAD
      borderRadius: '16px',           // borde mucho más redondeado
      fontSize: '2.5rem',             // letra más grande
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`, // fuente agradable
      textShadow: '1px 1px 3px rgba(0,0,0,0.7)', // sombra más suave para mejor legibilidad
      userSelect: 'none',
      padding: '0 8px',               // un poco de padding para que la letra no quede tan pegada
      boxSizing: 'border-box',
=======
      borderRadius: '4px'
      

>>>>>>> 68d87d356c3e9efeab7e9b3c3176aaf52ec5f6f9
    }}>
      {nombre}
    </div>
  );
}

Zona.propTypes = {
  nombre: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Zona;
