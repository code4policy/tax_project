document.addEventListener("DOMContentLoaded", () => {
  // Get references to the slider and the blue button
  const slider = document.getElementById('slider_175');
  const blueButton = document.getElementById('blue-button');

  // Ensure elements are found
  if (!slider || !blueButton) {
    console.error("Slider or blue button not found in the DOM.");
    return;
  }

  // Function to update the button text based on the slider value
  function updateButtonValue(value) {
    const adjustedValue = (value / 175 * 4.6).toFixed(2); // Adjust calculation as needed
    blueButton.textContent = `$${adjustedValue} Billion`;
  }

  // Initial update to set default value
  updateButtonValue(slider.value);

  // Update button value whenever the slider changes
  slider.addEventListener('input', () => {
    updateButtonValue(slider.value);
  });
});