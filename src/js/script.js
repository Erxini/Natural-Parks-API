document.addEventListener('DOMContentLoaded', () => {
  // Referencias a los elementos del DOM
  const searchContainer = document.getElementById('search-container');
  const resultContainer = document.getElementById('result-container');
  const plantNameInput = document.getElementById('plant-name');
  const searchBtn = document.getElementById('search-btn');

  // Acción al hacer clic en el botón "Buscar"
  searchBtn.addEventListener('click', () => {
    const plantName = plantNameInput.value.trim();
    
    if (!plantName) {
      alert('Por favor, introduce el nombre de una planta.');
      return;
    }
    
    // Mostrar un mensaje de carga
    searchContainer.innerHTML = `<p class="text-blue-500 text-center">Buscando información sobre ${plantName}...</p>`;
    
    // Fetch a la API de plantas
    fetch(`https://trefle.io/api/v1/plants?token=9E6fKxhuuJMJ2F27La6KB8P85jdGY0iIdX_m42ghELY&filter[common_name]=${plantName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          // Ocultar el contenedor de búsqueda
          searchContainer.classList.add('hidden');
          
          // Mostrar el contenedor de resultados y aplicar las clases de grid
          resultContainer.classList.remove('hidden');
          resultContainer.classList.add('md:grid', 'md:grid-cols-2', 'md:gap-4');
          
          // Crear un fragmento para agregar los resultados de manera eficiente
          const fragment = document.createDocumentFragment();
          const plant = data.data[0]; // Usamos el primer resultado

          // Crear los elementos dinámicamente
          const plantDetails = document.createElement('div');
          plantDetails.classList.add('plant-details', 'flex', 'flex-col', 'items-center', 'md:flex-row','md:justify-center','md:gap-2');
          
          // Imagen de la planta
          const imgElement = document.createElement('img');
          imgElement.src = plant.image_url || 'https://via.placeholder.com/150';
          imgElement.alt = plant.common_name || plant.scientific_name;
          imgElement.classList.add('rounded', 'w-full', 'md:w-1/2', 'max-w-xs');
          plantDetails.appendChild(imgElement);

          // Información de la planta
          const infoElement = document.createElement('div');
          infoElement.classList.add('plant-info', 'mt-4', 'md:mt-0', 'md:ml-4');
          
          const nameElement = document.createElement('h2');
          nameElement.classList.add('text-2xl', 'font-bold');
          nameElement.textContent = plant.common_name || plant.scientific_name;
          infoElement.appendChild(nameElement);

          const scientificName = document.createElement('p');
          scientificName.innerHTML = `<strong>Nombre Científico:</strong> ${plant.scientific_name}`;
          infoElement.appendChild(scientificName);

          const origin = document.createElement('p');
          origin.innerHTML = `<strong>Origen:</strong> ${plant.native_region || 'Desconocido'}`;
          infoElement.appendChild(origin);

          const leafType = document.createElement('p');
          leafType.innerHTML = `<strong>Tipo de Hoja:</strong> ${plant.leaf_type || 'Desconocido'}`;
          infoElement.appendChild(leafType);

          // Agregar la información de la planta al contenedor
          plantDetails.appendChild(infoElement);

          // Añadir la planta al fragmento
          fragment.appendChild(plantDetails);
          
          // Insertar el fragmento en el contenedor de resultados
          resultContainer.innerHTML = ''; // Limpiar resultados previos
          resultContainer.appendChild(fragment);
          
          // Mostrar el contenedor de cuidados
          const cuidadosBtnContainer = document.getElementById('cuidados-btn-container');
          cuidadosBtnContainer.classList.remove('hidden');
          
          // Acción al hacer clic en el botón de "Cuidados"
          const cuidadosBtn = document.getElementById('cuidados-btn');
          cuidadosBtn.addEventListener('click', () => {
            alert('Información sobre los cuidados de la planta: \n\n- Necesita luz indirecta. \n- Regar 1 vez a la semana.');
          });

        } else {
          searchContainer.innerHTML = `<p class="text-red-500 text-center">No se encontró información sobre ${plantName}. Intenta con otro nombre.</p>`;
        }
      })
      .catch(error => {
        console.error('Error al hacer la solicitud:', error);
        searchContainer.innerHTML = `<p class="text-red-500 text-center">Error al buscar la planta. Intenta nuevamente más tarde.</p>`;
      });
  });
});
