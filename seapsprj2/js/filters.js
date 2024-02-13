import { markersArray as getMarkersPromise } from './map.js';
// Ensure DOM readiness before accessing elements
document.addEventListener('DOMContentLoaded', () => {
  // Populate year, month, and date dropdowns
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    option.selected = i === currentYear; // Set current year as selected
    document.getElementById('year-filter').appendChild(option); // Ensure correct ID
  }

  // Populate month dropdown with options from 1 to 12
  for (let i = 0; i <= 12; i++) { // Start with 0 for "All"
    const option = document.createElement('option');
    option.value = i;

    if (i === 0) {
      option.text = 'All'; // "All" for the first option
    } else {
      option.text = new Date(0, i - 1).toLocaleString('en-US', { month: 'long' }); // Full month names for others
    }
    option.selected = i === new Date().getMonth() + 1; // Set current month as selected (excluding "All")
    document.getElementById('month-filter').appendChild(option); // Ensure correct ID
  }

  // Dynamically populate date dropdown based on selected year and month
  function updateDateFilter() {
    const selectedYear = parseInt(document.getElementById('year-filter').value); // Ensure correct ID
    const selectedMonth = parseInt(document.getElementById('month-filter').value) - 1; // Months are 0-indexed

    document.getElementById('date-filter').innerHTML = ''; // Clear existing options

    // Create and append the "All" option
    const optionAll = document.createElement('option');
    optionAll.value = 'all';
    optionAll.text = 'All';
    document.getElementById('date-filter').appendChild(optionAll); // Ensure correct ID

    // Calculate days in month and populate other options
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      document.getElementById('date-filter').appendChild(option); // Ensure correct ID
    }

    // Select the current date or "All" by default
    const selectedDate = new Date().getDate();
    if (selectedYear === currentYear && selectedMonth === new Date().getMonth()) {
      document.getElementById('date-filter').value = selectedDate;
    } else {
      document.getElementById('date-filter').value = 'all';
    }
  }

  updateDateFilter(); // Call initially to populate date dropdown

  // Define categories object with "All" options
  const categories = {
    crime: ["all", "murder", "kidnapping", "robbery", "theft"],
    disaster: ["all", "trapped", "fire", "flood", "car-crash"],
    all: [] // Add a property for "all" to avoid undefined access
  };

  // Populate category and subcategory dropdowns
  const categoryDropdown = document.getElementById("category-dropdown");
  const subcategoryDropdown = document.getElementById("subcategory-dropdown");

  // Populate the category dropdown with all options, including "All"
  Object.keys(categories).forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    categoryDropdown.appendChild(option);
  });

  // Function to update the subcategory dropdown based on selected category
  function updateSubcategories() {
    const selectedCategory = categoryDropdown.value;
    subcategoryDropdown.innerHTML = ""; // Clear existing options

    if (selectedCategory === "all") {
      // If "All", show only the "All" option in subcategories
      subcategoryDropdown.innerHTML = "<option value='all'>all</option>";
    } else {
      // If not "All", populate with subcategories
      categories[selectedCategory].forEach(subcategory => {
        const option = document.createElement("option");
        option.value = subcategory;
        option.text = subcategory;
        subcategoryDropdown.appendChild(option);
      });
    }
    
  }

  // Add event listener to the category dropdown to trigger subcategory update
  categoryDropdown.addEventListener("change", updateSubcategories);

  // Set "All" as the default selected option for the category dropdown
  categoryDropdown.value = "all";
  // Call updateSubcategories initially to set the default "All" options
  updateSubcategories();

  // Get references to elements after DOM is ready

  const applyFilterButton = document.getElementById('applyFilter');
  const yearFilter = document.getElementById('year-filter');
  const monthFilter = document.getElementById('month-filter');
  const dateFilter = document.getElementById('date-filter');
  const typeFilter = document.getElementById('category-dropdown');
  const specificFilter = document.getElementById('subcategory-dropdown');
  
  // Check if elements exist before using them
  if (applyFilterButton && yearFilter && monthFilter && dateFilter && typeFilter && specificFilter) {

    // Add the applyFilter function here:
    async function applyFilter() {
      try {
        const markers = await getMarkersPromise();
          const matchYear = !selectedYear || marker.created_date.getFullYear() === selectedYear;
          const matchMonth = !selectedMonth || marker.created_date.getMonth() === selectedMonth;
          const matchDate = !selectedDate || marker.created_date.getDate() === selectedDate;
          const matchType = !selectedType || marker.emergency_type === selectedType;
          const matchSpecific = !selectedSpecific || marker.specific_emergency === selectedSpecific;
          return matchYear && matchMonth && matchDate && matchType && matchSpecific;
      } catch (error) {
        console.error('Error fetching markers:', error);
        // Handle the error appropriately
      }
    }

    applyFilterButton.addEventListener('click', async () => {
      const selectedYear = parseInt(yearFilter.value);
      const selectedMonth = parseInt(monthFilter.value) - 1; // Months are 0-indexed
      const selectedDate = dateFilter.value;
      const selectedType = typeFilter.value;
      const selectedSpecific = specificFilter.value || "all"; // Default to "all"

        // Filter markers based on selected criteria
      const filteredMarkers = markers.filter(marker => {
        const matchYear = !selectedYear || marker.created_date.getFullYear() === selectedYear;
        const matchMonth = !selectedMonth || marker.created_date.getMonth() === selectedMonth;
        const matchDate = !selectedDate || marker.created_date.getDate() === selectedDate;
        const matchType = !selectedType || marker.emergency_type === selectedType;
        const matchSpecific = !selectedSpecific || marker.specific_emergency === selectedSpecific;
        return matchYear && matchMonth && matchDate && matchType && matchSpecific;
      });
   

      // Update map markers with filtered data
      updateMapMarkers(filteredMarkers);
    });
    
  } else {
    console.error('One or more filter elements not found. Please check IDs and loading order.');
  }

});