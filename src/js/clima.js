const apiKey = '2ca9ac81e3e94fca998151926240912';
const parkData = JSON.parse(localStorage.getItem('parqueSeleccionado'));

// Cargar datos del parque seleccionado
document.addEventListener('DOMContentLoaded', () => {
  if (parkData) {
    const parkName = document.getElementById('park-name');
    const weatherInfo = document.getElementById('weather-info');
    const parkImage = document.getElementById('park-image');
    const backBtn = document.getElementById('back-btn');

    parkName.textContent = parkData.nombre;
    parkImage.src = parkData.imagen || 'https://via.placeholder.com/150';

    // Obtener clima
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${parkData.estado}`)
      .then(response => response.json())
      .then(data => {
        const { temp_c, condition } = data.current;

        const tempElement = document.createElement('p');
        tempElement.classList.add('text-2xl');
        tempElement.textContent = `Temperatura: ${temp_c}°C`;

        const iconElement = document.createElement('img');
        iconElement.src = condition.icon;
        iconElement.alt = condition.text;
        iconElement.classList.add('mx-auto');

        weatherInfo.appendChild(tempElement);
        weatherInfo.appendChild(iconElement);
      })
      .catch(error => {
        console.error('Error al obtener el clima:', error);
        weatherInfo.textContent = 'No se pudo obtener el clima del parque.';
      });

    backBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  } else {
    alert('No se encontró información del parque seleccionado.');
    window.location.href = 'index.html';
  }
});
