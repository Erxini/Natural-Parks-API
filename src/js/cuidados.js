const apiKey = '9E6fKxhuuJMJ2F27La6KB8P85jdGY0iIdX_m42ghELY'; // Reemplaza con tu propia clave de API de Trefle

// Función para obtener información de una planta
const obtenerInfoPlanta = async (nombrePlanta) => {
  const url = `https://trefle.io/api/v1/plants/search?token=${apiKey}&q=${nombrePlanta}`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.data && datos.data.length > 0) {
      const planta = datos.data[0]; // Selecciona la primera planta en los resultados

      const cuidados = planta.cultivation; // Información sobre los cuidados

      console.log('Información de la planta:', planta);
      console.log('Cuidados:', cuidados);
      
      // Mostrar los cuidados en la página
      document.getElementById('cuidados').innerHTML = `
        <h2>Cuidados de ${planta.common_name}</h2>
        <p><strong>Riego:</strong> ${cuidados.water}</p>
        <p><strong>Luz:</strong> ${cuidados.light}</p>
        <p><strong>Temperatura:</strong> ${cuidados.temperature}</p>
        <p><strong>Fertilización:</strong> ${cuidados.fertilizer}</p>
      `;
    } else {
      console.log('Planta no encontrada.');
    }
  } catch (error) {
    console.error('Error al obtener la información:', error);
  }
};

// Función para manejar la búsqueda de una planta
document.getElementById('buscarBtn').addEventListener('click', () => {
  const nombrePlanta = document.getElementById('nombrePlanta').value;
  obtenerInfoPlanta(nombrePlanta);
});
