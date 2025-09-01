// Función para iniciar la búsqueda cuando se hace clic en "Buscar"
function startSearch(query = '') {
    // Si no se pasa un query, toma el valor del input de búsqueda
    if (!query) {
        query = document.getElementById('search-box').value;
    }

    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

    if (query.length > 0) {
        // URL de tu Webhook en n8n
        const webhookUrl = 'https://tu-servidor-n8n/webhook/search';  // Reemplaza esto con la URL de tu Webhook de n8n

        // Enviar el texto de búsqueda a n8n a través de POST
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })  // Enviar el query en formato JSON
        })
        .then(response => response.json())
        .then(data => {
            // Cuando n8n devuelva los resultados, los mostramos
            displayResults(data.results); // Aquí, asumimos que n8n devuelve los resultados en 'results'
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error al obtener los resultados.");
        });
    }
}

// Función para mostrar los resultados en el contenedor
function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';  // Limpiar los resultados anteriores

    // Si no hay resultados, mostrar un mensaje
    if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron resultados que coincidan con los filtros.</p>';
        return;
    }

    // Itera sobre los resultados y muestra aquellos que cumplen con los filtros
    results.forEach(result => {
        if (result.rating >= 4.5 && result.user_ratings_total >= 150) {  // Filtrar por rating y cantidad de reseñas
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <h4 class="text-white">${result.name}</h4>
                <p class="text-cyan-200/70 text-sm">${result.formatted_address}</p>
                <p class="text-cyan-200/70 text-sm">Rating: ${result.rating} (${result.user_ratings_total} reseñas)</p>
            `;
            resultsContainer.appendChild(resultElement);  // Agrega el nuevo resultado al contenedor
        }
    });

    // Si no hay resultados que cumplen con los filtros, mostrar un mensaje
    if (resultsContainer.children.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron resultados que coincidan con los filtros.</p>';
    }
}
