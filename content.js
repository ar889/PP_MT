// Function to prompt the user for input, calculate values, and autofill the form
function handleMileageInput() {
  const form = document.querySelector("#modelFrom");

  if (form) {
    const fromMileageInput = form.querySelector('input[name="data[from_mileage]"]');
    const toMileageInput = form.querySelector('input[name="data[to_mileage]"]');

    if (fromMileageInput && toMileageInput) {
      const currentFromMileage = parseFloat(fromMileageInput.value) || 0;

      // Prompt the user for a value to add to `data[from_mileage]`
      const userInput = prompt("Please enter the value to add to 'From Mileage':");

      if (userInput !== null) {
        const userValue = parseFloat(userInput);

        if (!isNaN(userValue)) {
          // Calculate the new value for `data[to_mileage]`
          const newToMileage = currentFromMileage + userValue;

          // Update the input fields
          fromMileageInput.value = currentFromMileage; // Keep the original value
          toMileageInput.value = newToMileage;         // Set the calculated value

          // Focus on the "to_mileage" field after setting the value
          toMileageInput.select(); // Pre-select the value for easier editing
          toMileageInput.focus();  // Ensure the field is focused
        } else {
          alert("Please enter a valid number.");
        }
      }
    }
  }
}

// Function for greeting
function getGreeting() {
  const hours = new Date().getHours();
  if (hours < 12) {
    return "Good Morning 🌞";
  } else if (hours < 18) {
    return "Good Afternoon ☀️";
  } else {
    return "Good Evening 🌙";
  }
}

// This function retrieves the saved data and auto-fills the form
function autofillForm() {
  const form = document.querySelector("#modelFrom");
  const greeting = getGreeting(); // Get the dynamic greeting

  // Check if "data[utilized_officer]" has a value; if it does, stop auto-filling
  const utilizedOfficer = form.querySelector('input[name="data[utilized_officer]"]');
  if (utilizedOfficer && utilizedOfficer.value) {
    console.log("Form will not auto-fill. For more inqueries contact to developer.");
    return; // Exit the function
  }

  if (form) {
    chrome.storage.local.get("formData", (data) => {
      if (data.formData) {
        const formData = data.formData;

        // Increment the date by 1 day
        const dateInput = form.querySelector('input[name="data[date]"]');
        if (dateInput && formData.date) {
          let date = new Date(formData.date);
          date.setDate(date.getDate() + 1); // Increment by 1 day
          dateInput.value = date.toISOString().split('T')[0]; // Format to yyyy-mm-dd
        }

        // Skip these fields and leave them blank or as is
        // const fuelPurchased = form.querySelector('input[name="data[fuel_purchased]"]');
        // if (fuelPurchased) fuelPurchased.value = formData.fuel_purchased || '';

        // const oilPurchased = form.querySelector('input[name="data[oil_purchased]"]');
        // if (oilPurchased) oilPurchased.value = formData.oil_purchased || '';

        const dutyType = form.querySelector('select[name="data[duty_type]"]');
        if (dutyType) dutyType.value = formData.duty_type || '';

        const utilizedOfficer = form.querySelector('input[name="data[utilized_officer]"]');
        if (utilizedOfficer) {
          utilizedOfficer.value = formData.utilized_officer || '';

          // Show mileage popup only if `data[utilized_officer]` is empty
          const fromMileageInput = form.querySelector('input[name="data[from_mileage]"]');
          const toMileageInput = form.querySelector('input[name="data[to_mileage]"]');

          if (fromMileageInput && toMileageInput) {
            // Check if `from_mileage` already has a value
            const existingFromMileage = parseFloat(fromMileageInput.value) || 0;
            const userInput = prompt(`${greeting}. Enter mileage to proceed.`);
            if (userInput !== null && !isNaN(userInput)) {
              const addedMileage = parseFloat(userInput);
              const newFromMileage = existingFromMileage + addedMileage;

              // Set the calculated values
              toMileageInput.value = newFromMileage;
            }
          }
        }

        const journey = form.querySelector('textarea[name="data[journey]"]');
        if (journey && !journey.value) {
          journey.value = formData.journey || '';
        }

        // Auto-focus on the "to_mileage" field
        const toMileageInput = form.querySelector('input[name="data[to_mileage]"]');
        if (toMileageInput) {
          toMileageInput.select(); // Pre-select the value to allow direct typing
          toMileageInput.focus();  // Focus on the field
        }
      }
    });
  }
}

// Function to save form data to Chrome storage when the form is submitted
function saveFormData() {
  const form = document.querySelector("#modelFrom");
  if (form) {
    const formData = {
      date: form.querySelector('input[name="data[date]"]').value,
      // fuel_purchased: form.querySelector('input[name="data[fuel_purchased]"]').value,
      // oil_purchased: form.querySelector('input[name="data[oil_purchased]"]').value,
      duty_type: form.querySelector('select[name="data[duty_type]"]').value,
      from_mileage: form.querySelector('input[name="data[from_mileage]"]').value,
      to_mileage: form.querySelector('input[name="data[to_mileage]"]').value,
      utilized_officer: form.querySelector('input[name="data[utilized_officer]"]').value,
      journey: form.querySelector('textarea[name="data[journey]"]').value,
    };

    // Save form data to Chrome local storage
    chrome.storage.local.set({ formData });
  }
}

// Listen for form submission to save the data
const form = document.querySelector("#modelFrom");
if (form) {
  form.addEventListener("submit", saveFormData);
}

// Auto-fill the form when the page is loaded
autofillForm();
