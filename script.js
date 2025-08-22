// Simulating search results
const mockResults = [
    { title: 'Restaurante El Cielo', description: 'Excelente comida, buen ambiente.' },
    { title: 'Restaurante La Vida', description: 'Comida mediterránea con vistas al mar.' },
    { title: 'Restaurante La Tierra', description: 'Comida local y deliciosa.' }
];

function startSearch() {
    const query = document.getElementById('search-box').value;
    const resultsContainer = document.getElementById('search-results');
    
    // Mock search results based on query (in a real case, you would call an API)
    if (query.length > 0) {
        resultsContainer.innerHTML = '';
        mockResults.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <h4 class="text-white">${result.title}</h4>
                <p class="text-cyan-200/70 text-sm">${result.description}</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }
}

