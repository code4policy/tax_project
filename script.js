document.addEventListener('DOMContentLoaded', () => {
    const slider175 = document.getElementById('slider_175');
    const tooltip175 = document.getElementById('tooltip-175');  // Tooltip container for slider_175
    const slider = document.getElementById('spending-slider');
    const spendingVar = document.getElementById('spending-var');
    const noteContainer = document.getElementById('note-container');
    const propTaxVar = document.getElementById('prop-tax-var');
    const propTaxPercVar = document.getElementById('prop-tax-perc-var');
    const otherTaxPercVar = document.getElementById('other-tax-perc-var');
    const noteContainer175 = document.getElementById('note-container-175');
    const levyCommercialVar = document.getElementById('comm-tax-levy-span');
    const levyResidentialVar = document.getElementById('res-tax-levy-span');

    if (slider175 && tooltip175) {
        // Slider 175 tooltip functionality
        slider175.addEventListener('input', (e) => {
            const value175 = parseFloat(slider175.value); // Get value of slider_175
            tooltip175.textContent = value175.toFixed(1); // Set tooltip text
            const sliderRect = slider175.getBoundingClientRect(); // Get position of the slider
            const tooltipWidth = tooltip175.offsetWidth; // Get width of the tooltip
            const sliderWidth = sliderRect.width; // Slider's width

            // Set tooltip position relative to slider's value
            const position = (value175 / 100) * sliderWidth - tooltipWidth / 2;
            tooltip175.style.left = `${position}px`;
            tooltip175.style.top = `-30px`; // Position tooltip above the slider

            tooltip175.style.display = 'block'; // Show tooltip
        });

        slider175.addEventListener('mouseout', () => {
            tooltip175.style.display = 'none'; // Hide tooltip when not hovering
        });

        slider175.addEventListener('input', () => {
            const value = parseFloat(slider175.value);

            if (value < 170) {
                noteContainer175.innerHTML = `
                    <a href="https://www.mass.gov/info-details/proposition-2-12-and-tax-rate-process" 
                       target="_blank" 
                       style="color: red; text-decoration: underline;">
                       Click here </a> &nbsp;for more information about why the ratio cannot be lower than 170%.
                `;
                noteContainer175.style.visibility = 'visible'; // Makes it visible
                noteContainer175.style.opacity = '1'; // Fully opaque
                slider175.style.setProperty('--slider-color', 'red');
            } else {
                slider175.style.setProperty('--slider-color', ''); // Reset to default color
                noteContainer175.style.visibility = 'hidden'; // Hides the content
                noteContainer175.style.opacity = '0'; // Fully transparent
            }
        });
    }

    if (slider) {
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
    }

    // Start interactivity of final tax rate block
    const numeratorSpans = document.querySelectorAll('.numerator span');
    const denominatorSpans = document.querySelectorAll('.denominator span');
    const resultSpans = document.querySelectorAll('.result span');
    const commPropLevy = document.getElementById('comm-tax-levy-span');
    const resPropLevy = document.querySelector('.res-tax-levy-span');

    if (commPropLevy) {
        // Create MutationObservers for commPropLevy
        const levyObserver = new MutationObserver(() => {
            numeratorSpans[0].textContent = parseFloat(commPropLevy.textContent).toFixed(1);
            numeratorSpans[1].textContent = parseFloat(resPropLevy.textContent).toFixed(1);
        });

        levyObserver.observe(commPropLevy, { childList: true, characterData: true, subtree: true });
    }

    // Function to calculate and update tax rate for a specific index
    const updateTaxRate = (index) => {
        const numerator = parseFloat(numeratorSpans[index].textContent);
        const denominator = parseFloat(denominatorSpans[index].textContent);
        const taxRate = (numerator / denominator) * 1000;
        resultSpans[index].textContent = taxRate.toFixed(2);
    };

    // Create MutationObservers for each numerator/denominator pair
    numeratorSpans.forEach((numeratorSpan, index) => {
        const observer = new MutationObserver(() => {
            updateTaxRate(index);
        });

        // Observe numerator and denominator of the same index
        observer.observe(numeratorSpan, { childList: true, characterData: true, subtree: true });
        observer.observe(denominatorSpans[index], { childList: true, characterData: true, subtree: true });

        // Initial update for this index
        updateTaxRate(index);
    });

    // Start interactivity between 175% slider and boxes
    if (slider175 && levyCommercialVar && levyResidentialVar) {
        slider175.addEventListener('input', () => {
            const value175 = parseFloat(slider175.value);
            let levyCommercial = (value175 / 100) * 0.01483 * 68.304382;
            levyCommercialVar.textContent = levyCommercial.toFixed(2);

        });

        slider175.addEventListener('input', () => {
            const value175 = parseFloat(slider175.value);
            let levyResidential = 3.3 - ((value175 / 100) * 0.01483 * 68.304382) ;
            levyResidentialVar.textContent = levyResidential.toFixed(2);
        });


    }
});
