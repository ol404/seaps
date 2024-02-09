function initMap() {
    // Map options
    const options = {
      zoom: 15,
      center: { lat: 10.296806, lng: 123.906604 },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    // Create the map
    const map = new google.maps.Map(document.querySelector("#map"), options);
  
    // Create the infoWindow object outside the loop
    const infoWindow = new google.maps.InfoWindow();
  
    // Define an empty array to store markers
    const locateMarkers = [];
  
    // Retrieve markers data from PHP using AJAX
    fetch('./configs/index.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch markers data');
        }
        return response.json();
      })
      .then(markersData => {
        markersData.forEach(marker => {
          // Create and add markers to the map
          const markerObject = new google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map: map,
            title: `Coordinates: ${marker.lat}, ${marker.lng}\nDate: ${marker.created_date}\nType: ${marker.emergency_type}\nDetails: ${marker.specific_emergency}`,
            clickable: true // Ensure marker is clickable
          });
  
          // Add click listener to each marker using 'infoWindow' object
          markerObject.addListener("click", () => {
            infoWindow.close(); // Close any open infoWindow
            infoWindow.setContent(`
            Type:</b> ${marker.emergency_type}<br>
            <b>Details:</b> ${marker.specific_emergency}<br>
            <b>Coordinates:</b> ${marker.lat}, ${marker.lng}<br>
            <b>Date:</b> ${marker.created_date}
            `); // Set infoWindow content
            infoWindow.open(map, markerObject); // Open infoWindow on marker
          });
  
          // Add the marker to the 'locateMarkers' array
          locateMarkers.push(markerObject);
        });
      })
      .catch(error => {
        console.error('Error fetching markers:', error);
      });
  }
  
  // Ensure the initMap function is called after the Google Maps API is loaded
  window.onload = initMap;
  