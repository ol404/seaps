// Define the categories object with "All" options
const categories = {
  crime: ["all", "murder", "kidnapping", "robbery", "theft"],
  disaster: ["all", "trapped", "fire", "flood", "car-crash"],
  all: [] // Add a property for "all" to avoid the initial undefined access
};

// Make sure these IDs match your HTML elements
const categoryDropdown = document.getElementById("category-dropdown");
const subcategoryDropdown = document.getElementById("subcategory-dropdown");

// Add a DOMContentLoaded event listener if necessary to ensure elements are loaded
document.addEventListener("DOMContentLoaded", function() {

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

});
