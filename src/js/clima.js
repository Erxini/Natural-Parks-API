//Obtenemos los datos del localstorage
const parkData = JSON.parse(localStorage.getItem('parqueSeleccionado'));

const cargarDatosParque = () => {
  if (parkData) {
    const parkName = document.getElementById('park-name');
    const weatherInfo = document.getElementById('weather-info');
    const parkImage = document.getElementById('park-image');

    parkName.textContent = parkData._nombre;
    parkImage.src = parkData._imagen || 'https://via.placeholder.com/150';

    // Obtener clima utilizando latitud y longitud
    const lat = parkData._latitude;
    const lon = parkData._longitude;
   
    fetch('http://api.weatherapi.com/v1/current.json?key=8ab098ac9cc24452a42114725242612&q=' + lat + ',' + lon)
      .then(response => {
        if (!lat || !lon) {
          console.error('Latitud o longitud no definidas');
          weatherInfo.textContent = 'No se pudo obtener el clima del parque.';
          return;
        }
        
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => {
        if (!data.current) {
          throw new Error('Datos de clima no disponibles');
        }
        const { temp_c, condition } = data.current;
        const fechaActual = new Date().toLocaleDateString();

        const fragment = document.createDocumentFragment();

        const tempElement = document.createElement('p');
        tempElement.classList.add('text-2xl');
        tempElement.textContent = 'Temperatura Actual: ' + temp_c + '°C';

        const iconElement = document.createElement('img');
        iconElement.src = condition.icon;
        iconElement.alt = condition.text;
        iconElement.classList.add('mx-auto');

        const fechaElement = document.createElement('p');
        fechaElement.classList.add('text-xl');
        fechaElement.textContent = 'Fecha Actual: ' + fechaActual;

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