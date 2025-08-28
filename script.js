// Función para iniciar la búsqueda cuando se hace clic en "Buscar"
function startSearch() {
    const searchBox = document.getElementById('search-box');  // Captura el valor del input
    const query = searchBox.value;  // Guarda la búsqueda del usuario

    // Verifica que el campo de búsqueda no esté vacío
    if (!query) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }

    // Inicializa el servicio de Places de Google Maps
    const service = new google.maps.places.PlacesService(document.createElement('div'));  // Crea un div "fantasma" para la API

    // Realiza la búsqueda de lugares en Google Maps
    service.textSearch({
        query: query,  // Lo que el usuario ha buscado
        fields: ['name', 'formatted_address', 'rating', 'user_ratings_total'],  // Solo los campos que necesitas
    }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayResults(results);  // Si la búsqueda es exitosa, llama a la función que muestra los resultados
        } else {
            alert('No se pudieron obtener los resultados. Error: ' + status);  // Si algo falla, muestra el error
        }
    });
}

// Función para mostrar los resultados en el contenedor
function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');  // Donde se van a mostrar los resultados
    resultsContainer.innerHTML = '';  // Limpiar los resultados anteriores

    // Itera sobre los resultados y filtra los que tengan 4.5 estrellas o más y más de 150 reseñas
    results.forEach(result => {
        if (result.rating >= 4.5 && result.user_ratings_total >= 150) {
            const resultElement = document.createElement('div');  // Crea un contenedor para cada resultado
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <h4 class="text-white">${result.name}</h4>
                <p class="text-cyan-200/70 text-sm">${result.formatted_address}</p>
                <p class="text-cyan-200/70 text-sm">Rating: ${result.rating} (${result.user_ratings_total} reseñas)</p>
            `;
            resultsContainer.appendChild(resultElement);  // Agrega el nuevo resultado al contenedor
        }
    });

    // Si no hay resultados que cumplan con los filtros, muestra un mensaje
    if (resultsContainer.children.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron resultados que coincidan con los filtros.</p>';
    }
}
