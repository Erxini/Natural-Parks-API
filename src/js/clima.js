const weatherApiKey = '8ab098ac9cc24452a42114725242612';
const parkData = JSON.parse(localStorage.getItem('parqueSeleccionado'));

const cargarDatosParque = () => {
  if (parkData) {
    const parkName = document.getElementById('park-name');
    const weatherInfo = document.getElementById('weather-info');
    const parkImage = document.getElementById('park-image');

    parkName.textContent = parkData._nombre || "Nombre del Parque";
    parkImage.src = parkData._imagen || 'https://via.placeholder.com/150';
     // Obtener coordenadas
     const lat = parkData._lat;
     const lng = parkData._lng;
 
     if (!lat || !lng) {
       weatherInfo.textContent = 'No se encontraron las coordenadas del parque para obtener el clima.';
       return;
     }

    // Verificar si el estado está definido
    const estado = parkData._estado?.trim();

    if (!estado) {
      weatherInfo.textContent = 'No se pudo obtener el estado del parque.';
      return;
    }

    // Obtener clima
    // fetch(`http://api.weatherapi.com/v1/current.json?key=8ab098ac9cc24452a42114725242612&q=${estado}`)
    // fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${estado}`)
    fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lng}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener datos de WeatherAPI');
        }
        return response.json();
      })
      .then(data => {
        const { temp_c, condition } = data.current;
        const fechaActual = new Date().toLocaleDateString();

        const fragment = document.createDocumentFragment();

        const tempElement = document.createElement('p');
        tempElement.classList.add('text-2xl');
        tempElement.textContent = 'Temperatura: ' + temp_c + '°C';

        const iconElement = document.createElement('img');
        iconElement.src = condition.icon;
        iconElement.alt = condition.text;
        iconElement.classList.add('mx-auto');

        const fechaElement = document.createElement('p');
        fechaElement.classList.add('text-xl');
        fechaElement.textContent = 'Fecha: ' + fechaActual;

        fragment.appendChild(tempElement);
        fragment.appendChild(iconElement);
        fragment.appendChild(fechaElement);

        weatherInfo.innerHTML = '';
        weatherInfo.appendChild(fragment);
      })
      .catch(error => {
        console.error('Error al obtener el clima:', error);
        weatherInfo.textContent = 'No se pudo obtener el clima del parque.';
      });
  } else {
    alert('No se encontró información del parque seleccionado.');
    window.location.href = 'index.html';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  cargarDatosParque();
  document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
