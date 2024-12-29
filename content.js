// This function retrieves the saved data and auto-fills the form
function autofillForm() {
    const form = document.querySelector("#modelFrom");
    
    if (form) {
      chrome.storage.local.get("formData", (data) => {
        if (data.formData) {
          const formData = data.formData;
          
          // Fill the form fields with saved data
          form.querySelector('input[name="data[date]"]').value = formData.date || '';
          form.querySelector('input[name="data[fuel_purchased]"]').value = formData.fuel_purchased || '';
          form.querySelector('input[name="data[oil_purchased]"]').value = formData.oil_purchased || '';
          form.querySelector('select[name="data[duty_type]"]').value = formData.duty_type || '';
          form.querySelector('input[name="data[from_mileage]"]').value = formData.from_mileage || '';
          form.querySelector('input[name="data[to_mileage]"]').value = formData.to_mileage || '';
          form.querySelector('input[name="data[utilized_officer]"]').value = formData.utilized_officer || '';
          form.querySelector('textarea[name="data[journey]"]').value = formData.journey || '';
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
        from_mileage: form.querySelector('input[name="data[from_mileage]"]').value,
        to_mileage: form.querySelector('input[name="data[to_mileage]"]').value,
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
  