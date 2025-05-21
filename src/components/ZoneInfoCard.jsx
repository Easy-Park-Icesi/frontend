import React from 'react';

function ZoneInfoCard({ nombre, ocupados, total }) {
  return (
    <div style={{
      backgroundColor: '#f0f0f0',
      border: '2px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '10px',
      width: '200px',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 5px 0' }}>Zona {nombre}</h3>
      <p style={{ margin: '0' }}>Ocupados: {ocupados}</p>
      <p style={{ margin: '0' }}>Totales: {total}</p>
    </div>
  );
}

export default ZoneInfoCard;
