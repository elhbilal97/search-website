// Función para iniciar la búsqueda cuando se hace clic en "Buscar"
function startSearch() {
    const searchBox = document.getElementById('search-box');
    const query = searchBox.value;

    // Verifica que el campo de búsqueda no esté vacío
    if (!query) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }

    // Inicializa el servicio de Places de Google Maps
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    // Realiza la búsqueda de lugares en Google Maps
    service.textSearch({
        query: query,
        fields: ['name', 'formatted_address', 'rating', 'user_ratings_total'], // Campos necesarios
    }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayResults(results); // Llama a la función para mostrar los resultados
        } else {
            alert('No se pudieron obtener los resultados. Error: ' + status);
        }
    });
}

// Función para mostrar los resultados en el contenedor
function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';  // Limpiar los resultados anteriores

    // Itera sobre los resultados y filtra los que tengan 4.5 estrellas o más y más de 150 reseñas
    results.forEach(result => {
        if (result.rating >= 4.5 && result.user_ratings_total >= 150) {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <h4 class="text-white">${result.name}</h4>
                <p class="text-cyan-200/70 text-sm">${result.formatted_address}</p>
                <p class="text-cyan-200/70 text-sm">Rating: ${result.rating} (${result.user_ratings_total} reseñas)</p>
            `;
            resultsContainer.appendChild(resultElement);
        }
    });

    // Si no hay resultados que cumplan con los criterios
    if (resultsContainer.children.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron resultados que coincidan con los filtros.</p>';
    }
}

