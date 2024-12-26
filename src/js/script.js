import { Parque } from "./parque.js";

const searchContainer = document.getElementById("search-container");
const resultContainer = document.getElementById("result-container");
const parkSelect = document.getElementById("park-select");
const searchBtn = document.getElementById("search-btn");
const climaBtnContainer = document.getElementById("clima-btn-container");
const climaBtn = document.getElementById("clima-btn");

const apiKey = "g2dw6V8UQDunYwovVvzZEfwyh9HvM0PMczhnlxRr"; // API Key para NPS

// Función para traducir texto usando MyMemory
const traducirTexto = (texto, sourceLang = "en", targetLang = "es") => {
  return fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      texto
    )}&langpair=${sourceLang}|${targetLang}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      }
      throw new Error("Error en la traducción");
    })
    .catch((error) => {
      console.error("Error al traducir:", error);
      return texto; // Si hay error, devuelve el texto original
    });
};

// Cargar la lista de parques desde la API
const cargarParques = () => {
  fetch(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&limit=100`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.data && data.data.length > 0) {
        data.data.forEach((parque) => {
          const option = document.createElement("option");
          option.value = parque.id;
          option.textContent = parque.fullName;
          parkSelect.appendChild(option);
        });
      } else {
        parkSelect.innerHTML =
          "<option value=''>No se encontraron parques.</option>";
      }
    })
    .catch((error) => {
      console.error("Error al cargar los parques:", error);
      parkSelect.innerHTML =
        "<option value=''>Error al cargar los parques.</option>";
    });
};

// Buscar detalles del parque seleccionado y traducir
const buscarParqueTraducido = () => {
  const parqueId = parkSelect.value;
  if (!parqueId) {
    alert("Por favor, selecciona un parque.");
    return;
  }

  fetch(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&id=${parqueId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.data && data.data.length > 0) {
        const parque = data.data[0];
        const parqueObjeto = new Parque(
          parque.id,
          parque.fullName,
          parque.description,
          parque.states,
          parque.images[0] ? parque.images[0].url : "https://via.placeholder.com/150"
        );

        // Traducir nombre y descripción
        Promise.all([
          traducirTexto(parqueObjeto.nombre),
          traducirTexto(parqueObjeto.descripcion),
        ]).then(([nombreTraducido, descripcionTraducida]) => {
          parqueObjeto.nombre = nombreTraducido;
          parqueObjeto.descripcion = descripcionTraducida;

          // Crear elementos usando Fragment
          const fragment = document.createDocumentFragment();

          const img = document.createElement("img");
          img.src = parqueObjeto.imagen;
          img.className = "rounded w-full max-w-md";

          const infoContainer = document.createElement("div");
          infoContainer.className = "flex flex-col mx-0 text-lime-950 justify-start gap-4 text-justify";

          const title = document.createElement("h2");
          title.className = "text-2xl font-bold";
          title.textContent = parqueObjeto.nombre;

          const description = document.createElement("p");
          description.innerHTML = "<strong>Descripción:</strong> " + parqueObjeto.descripcion;

          const states = document.createElement("p");
          states.innerHTML = "<strong>Estado(s):</strong> " + parqueObjeto.estado;

          infoContainer.appendChild(title);
          infoContainer.appendChild(description);
          infoContainer.appendChild(states);

          const container = document.createElement("div");
          container.className = "flex flex-col gap-6 items-center justify-center md:flex-row";
          container.appendChild(img);
          container.appendChild(infoContainer);

          fragment.appendChild(container);

          resultContainer.innerHTML = "";
          resultContainer.appendChild(fragment);

          searchContainer.classList.add("hidden");
          resultContainer.classList.remove("hidden");
          climaBtnContainer.classList.remove("hidden");
        });
      }
    })
    .catch((error) => {
      console.error("Error al buscar el parque:", error);
    });
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  cargarParques();
  searchBtn.addEventListener("click", buscarParqueTraducido);
  climaBtn.addEventListener("click", () => {
    window.location.href = "clima.html";
  });
});
