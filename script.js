let map;
let service;

function initAutocomplete() {
    const input = document.getElementById("search-box");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setFields(["place_id", "name", "geometry"]);
}

function searchRestaurants() {
    const query = document.getElementById("search-box").value;
    if (!query) {
        alert("Please enter a search term!");
        return;
    }

    const request = {
        query: query,
        fields: ["name", "geometry", "place_id", "rating", "formatted_address"],
        location: new google.maps.LatLng(41.3851, 2.1734),  // Coordinates for Barcelona
        radius: 5000,  // Search radius in meters
    };

    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);  // Display the results in console (or trigger n8n here)
        } else {
            alert("No results found");
        }
    });
}
