document.addEventListener('DOMContentLoaded', () => {
    const slider175 = document.getElementById('slider_175');
    const tooltip175 = document.getElementById('tooltip-175');  // Tooltip container for slider_175
    const slider = document.getElementById('spending-slider');
    const spendingVar = document.getElementById('spending-var');
    const noteContainer = document.getElementById('note-container');
    const propTaxVar = document.getElementById('prop-tax-var');
    const propTaxPercVar = document.getElementById('prop-tax-perc-var');
    const otherTaxPercVar = document.getElementById('other-tax-perc-var');

    // Slider 175 tooltip functionality
    slider175.addEventListener('input', (e) => {
        const value175 = parseFloat(slider175.value); // Get value of slider_175
        tooltip175.textContent = value175.toFixed(1); // Set tooltip text
        const sliderRect = slider175.getBoundingClientRect(); // Get position of the slider
        const tooltipWidth = tooltip175.offsetWidth; // Get width of the tooltip
        const sliderLeft = sliderRect.left; // Slider's left position
        const sliderWidth = sliderRect.width; // Slider's width

        // Set tooltip position relative to slider's value
        tooltip175.style.left = `${(value175/100 * 1100) -1100 }px`;
        tooltip175.style.top = `${sliderRect.top - 400}px`; // Position tooltip above the slider
        tooltip175.style.display = 'block'; // Show tooltip
    });

    slider175.addEventListener('mouseout', () => {
        tooltip175.style.display = 'none'; // Hide tooltip when not hovering
    });

    // Spending slider functionality
    slider.addEventListener('input', () => {
        const value = parseFloat(slider.value);
        spendingVar.textContent = value.toFixed(1);

        let propTaxValue = value - 1.3;
        propTaxVar.textContent = propTaxValue.toFixed(1);

        let propTaxPercentage = Math.round((propTaxValue / value) * 100);
        propTaxPercVar.textContent = propTaxPercentage;
        otherTaxPercVar.textContent = 100 - propTaxPercentage;

        if (value > 4.6) {
            propTaxVar.style.color = 'red'; // Change property tax value to red
            noteContainer.innerHTML = `
                <a href="https://www.mass.gov/info-details/proposition-2-12-and-tax-rate-process" 
                   target="_blank" 
                   style="color: red; text-decoration: underline;">
                   Click here </a> &nbsp;for more information about how Proposition 2 1/2 limits the property tax levy.
            `;
            noteContainer.style.visibility = 'visible'; // Makes it visible
            noteContainer.style.opacity = '1'; // Fully opaque
        } else {
            propTaxVar.style.color = ''; // Reset to default color
            noteContainer.style.visibility = 'hidden'; // Hides the content
            noteContainer.style.opacity = '0'; // Fully transparent
        }
    });
});

