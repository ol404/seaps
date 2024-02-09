// This script should be placed outside the form tag in your HTML

const categories = {
    crime: ["All", "murder", "kidnapping", "robbery", "theft"],
    disaster: ["All", "trapped", "fire", "flood", "car-crash"],
  };
  
  const categoryDropdown = document.getElementById("category-dropdown");
  const subcategoryDropdown = document.getElementById("subcategory-dropdown");
  
  // Populate the category dropdown with all options
  Object.keys(categories).forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    categoryDropdown.appendChild(option);
  });

  categoryDropdown.value = "all";// set emergency type = all as default 

  // Function to update the subcategory dropdown based on selected category
  function updateSubcategories() {
    const selectedCategory = categoryDropdown.value;
    subcategoryDropdown.innerHTML = ""; // Clear existing options
  
    if (selectedCategory) {
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
  
  // Initially set the subcategories to "All" and call updateSubcategories
  subcategoryDropdown.innerHTML = "<option value='all'>All</option>";
  updateSubcategories();
  



// const dateFilter = document.getElementById('dateFilter');
// const typeFilter = document.getElementById('typeFilter');
// const applyFilterButton = document.getElementById('applyFilter');

// applyFilterButton.addEventListener('click', () => {
//   const selectedDate = dateFilter.value;
//   const selectedType = typeFilter.value;

//   // Assuming you have an array of markers named "markers"
//   const filteredMarkers = markers.filter(marker => {
//     const matchDate = !selectedDate || marker.created_date === selectedDate;
//     const matchType = !selectedType || marker.emergency_type === selectedType;
//     return matchDate && matchType;
//   });

//   // Update the map to show only filtered markers
//   updateMapMarkers(filteredMarkers);
// });
