const searchContainer = document.getElementById('search-container');
const resultContainer = document.getElementById('result-container');
const plantSelect = document.getElementById('plant-select');
const searchBtn = document.getElementById('search-btn');

const loadPlants = () => {
  fetch('https://trefle.io/api/v1/plants?token=9E6fKxhuuJMJ2F27La6KB8P85jdGY0iIdX_m42ghELY')
    .then(response => response.json())
    .then(data => {
      if (data && data.data && data.data.length > 0) {
        data.data.forEach(plant => {
          const option = document.createElement('option');
          option.value = plant.common_name || plant.scientific_name;
          option.textContent = plant.common_name || plant.scientific_name;
          plantSelect.appendChild(option);
        });
      } else {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No se encontraron plantas';
        plantSelect.appendChild(option);
      }
    })
    .catch(error => {
      console.error('Error al cargar las plantas:', error);
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'Error al cargar las plantas';
      plantSelect.appendChild(option);
    });
};

const searchPlant = () => {
  const plantName = plantSelect.value;
  if (!plantName) {
    alert('Por favor, selecciona una planta.');
    return;
  }

  fetch(`https://trefle.io/api/v1/plants?token=9E6fKxhuuJMJ2F27La6KB8P85jdGY0iIdX_m42ghELY&filter[common_name]=${plantName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.data && data.data.length > 0) {
        searchContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        resultContainer.classList.add('flex', 'flex-col', 'items-center', 'md:flex-row', 'md:justify-center', 'md:gap-4');

        const fragment = document.createDocumentFragment();
        const plant = data.data[0];

        const plantDetails = document.createElement('div');
        plantDetails.classList.add('plant-details', 'flex', 'flex-col', 'items-center', 'md:flex-row', 'md:items-center');

        const imgElement = document.createElement('img');
        imgElement.src = plant.image_url || 'https://via.placeholder.com/150';
        imgElement.classList.add('rounded', 'w-full', 'md:w-1/2', 'max-w-xs');
        plantDetails.appendChild(imgElement);

        const infoElement = document.createElement('div');
        infoElement.classList.add('plant-info', 'mt-4', 'md:mt-0', 'md:ml-4');

        const nameElement = document.createElement('h2');
        nameElement.classList.add('text-2xl', 'font-bold');
        nameElement.textContent = plant.common_name || plant.scientific_name;
        infoElement.appendChild(nameElement);

        const scientificName = document.createElement('p');
        scientificName.innerHTML = `<strong>Nombre Científico:</strong> ${plant.scientific_name}`;
        infoElement.appendChild(scientificName);

        const genus = document.createElement('p');
        genus.innerHTML = `<strong>Género:</strong> ${plant.genus || 'Desconocido'}`;
        infoElement.appendChild(genus);

        const family = document.createElement('p');
        family.innerHTML = `<strong>Familia:</strong> ${plant.family || 'Desconocido'}`;
        infoElement.appendChild(family);

        plantDetails.appendChild(infoElement);
        fragment.appendChild(plantDetails);

        resultContainer.innerHTML = '';
        resultContainer.appendChild(fragment);

        // Guardar información en localStorage
        localStorage.setItem('selectedPlant', JSON.stringify({
          name: plantName,
          scientificName: plant.scientific_name,
          genus: plant.genus,
          family: plant.family
        }));

        const cuidadosBtnContainer = document.getElementById('cuidados-btn-container');
        cuidadosBtnContainer.classList.remove('hidden');

        const cuidadosBtn = document.getElementById('cuidados-btn');
        cuidadosBtn.addEventListener('click', () => {
          window.location.href = 'cuidados.html';
        });
      }
    })
};

document.addEventListener('DOMContentLoaded', () => {
  loadPlants();
  searchBtn.addEventListener('click', searchPlant);
});