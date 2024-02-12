document.addEventListener ('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  const yearFilter = document.getElementById('year-filter');
  const monthFilter = document.getElementById('month-filter');
  const dateFilter = document.getElementById('date-filter');

  // Populate year dropdown with options from "currentYear - 5" to "currentYear + 5"
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    option.selected = i === currentYear; // Set current year as selected
    yearFilter.appendChild(option);
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
    monthFilter.appendChild(option);
  }

  // Dynamically populate date dropdown based on selected year and month
  function updateDateFilter() {
    const selectedYear = parseInt(yearFilter.value);
    const selectedMonth = parseInt(monthFilter.value) - 1; // Months are 0-indexed

    dateFilter.innerHTML = ''; // Clear existing options

    // Create and append the "All" option
    const optionAll = document.createElement('option');
    optionAll.value = 'all';
    optionAll.text = 'All';
    dateFilter.appendChild(optionAll); // Ensure it's added first

    // Calculate days in month and populate other options
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      dateFilter.appendChild(option);
    }

    // Select the current date or "All" by default
    const selectedDate = new Date().getDate();
    if (selectedYear === currentYear && selectedMonth === new Date().getMonth()) {
      dateFilter.value = selectedDate;
    } else {
      dateFilter.value = 'all';
    }
  }

  updateDateFilter(); // Call initially to populate date dropdown

});
