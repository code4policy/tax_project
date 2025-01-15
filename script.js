document.addEventListener("DOMContentLoaded", () => {
  // Get references to the slider and the green buttons
  const slider = document.getElementById('slider_175');
  const greenButton_res = document.getElementById('greenButton_res');
  const greenButton_com = document.getElementById('greenButton_com');

  // Ensure elements are found
  if (!slider || !greenButton_res || !greenButton_com) {
    console.error("Slider or one of the green buttons not found in the DOM.");
    return;
  }

  // Function to update the button text based on the slider value
  function updateButtonValue(value) {
    // Calculation for the residential taxes (greenButton_res)
    const adjustedValue_res = 100 - (((60.8/(60.8 + 143))*value)).toFixed(1); // Replace with the correct formula
    greenButton_res.textContent = `${adjustedValue_res}% of Total Property Taxes`;

    // Calculation for the commercial taxes (greenButton_com)
    const adjustedValue_com = ((60.8/(60.8 + 143))*value).toFixed(1); // Replace with the correct formula
    greenButton_com.textContent = `${adjustedValue_com}%  of Total Property Taxes`;
  }

  // Initial update to set default value
  updateButtonValue(slider.value);

  // Update button values whenever the slider changes
  slider.addEventListener('input', () => {
    updateButtonValue(slider.value);
  });
});
