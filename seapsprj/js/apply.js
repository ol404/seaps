document.addEventListener ('DOMContentLoaded', () => {
  const yearFilter = document.getElementById('year-filter');
  const monthFilter = document.getElementById('month-filter');
  const dateFilter = document.getElementById('date-filter');
  const typeFilter = document.getElementById('category-filter');
  const specificFilter = document.getElementById('specific-filter');
  const applyFilterButton = document.getElementById('applyFilter');

  applyFilterButton.addEventListener('click', () => {
      const selectedYear = parseInt(yearFilter.value);
      const selectedMonth = parseInt(monthFilter.value) - 1; // Months are 0-indexed
      const selectedDate = dateFilter.value;
      const selectedType = typeFilter.value;
      const selectedSpecific = specificFilter.value || "all"; // Default to "all" for specific
    
      const filteredMarkers = markers.filter(marker => {
        const matchYear = !selectedYear || marker.created_date.getFullYear() === selectedYear;
        const matchMonth = !selectedMonth || marker.created_date.getMonth() === selectedMonth;
        const matchDate = !selectedDate || marker.created_date.getDate() === selectedDate;
        const matchType = !selectedType || marker.emergency_type === selectedType;
        const matchSpecific = !selectedSpecific || marker.specific_emergency === selectedSpecific;
        return matchYear && matchMonth && matchDate && matchType && matchSpecific;
      });
    
      updateMapMarkers(filteredMarkers);
  });
  // Function to update map markers based on filtered data
  function updateMapMarkers(filteredMarkers) {
    // Remove existing markers
    locateMarkers.forEach(marker => marker.setMap(null));

    // Add filtered markers to the map
    filteredMarkers.forEach(marker => {
      const markerObject = new google.maps.Marker({
        // ... (marker properties)
      });
      locateMarkers.push(markerObject); // Add to the array for management
    });
  }
}); 