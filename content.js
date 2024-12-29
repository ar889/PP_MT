// This function retrieves the saved data and auto-fills the form
function autofillForm() {
    const form = document.querySelector("#modelFrom");
    
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
          form.querySelector('input[name="data[fuel_purchased]"]').value = formData.fuel_purchased || '';
          form.querySelector('input[name="data[oil_purchased]"]').value = formData.oil_purchased || '';
          form.querySelector('select[name="data[duty_type]"]').value = formData.duty_type || '';
          form.querySelector('input[name="data[utilized_officer]"]').value = formData.utilized_officer || '';
          form.querySelector('textarea[name="data[journey]"]').value = formData.journey || '';
  
          // Auto-focus on the "to_mileage" field and pre-select its value
          const toMileageInput = form.querySelector('input[name="data[to_mileage]"]');
          if (toMileageInput) {
            toMileageInput.value = formData.to_mileage || '';
            toMileageInput.select(); // Pre-select the value to allow direct typing
            toMileageInput.focus();  // Focus on the field
          }
        }
      });
    }
  }
  
  // This function saves form data to chrome storage when form is submitted
  function saveFormData() {
    const form = document.querySelector("#modelFrom");
    if (form) {
      const formData = {
        date: form.querySelector('input[name="data[date]"]').value,
        fuel_purchased: form.querySelector('input[name="data[fuel_purchased]"]').value,
        oil_purchased: form.querySelector('input[name="data[oil_purchased]"]').value,
        duty_type: form.querySelector('select[name="data[duty_type]"]').value,
        from_mileage: form.querySelector('input[name="data[from_mileage]"]').value, // Skip saving this field
        to_mileage: form.querySelector('input[name="data[to_mileage]"]').value, // Skip saving this field
        utilized_officer: form.querySelector('input[name="data[utilized_officer]"]').value,
        journey: form.querySelector('textarea[name="data[journey]"]').value
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
  