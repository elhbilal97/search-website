// Función para iniciar la búsqueda cuando se hace clic en "Buscar"
function startSearch(query = '') {
    // Si no se pasa un query, toma el valor del input de búsqueda
    if (!query) {
        query = document.getElementById('search-box').value;
    }

    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

    if (query.length > 0) {
        // URL del Webhook de n8n
        const webhookUrl = 'https://<tu-servidor>/webhook/search';  // Asegúrate de reemplazar con tu URL del Webhook de n8n

        // Enviar el texto de búsqueda a n8n a través de POST
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        })
        .then(response => response.json())
        .then(data => {
            // Cuando n8n devuelva los resultados, los mostramos
            displayResults(data.results); // Aquí, asumimos que n8n devuelve los resultados como una propiedad 'results'
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
    resultsContainer.innerHTML = ''; // Limpiar los resultados anteriores

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
