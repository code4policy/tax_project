document.addEventListener('DOMContentLoaded', () => {
    const slider175 = document.getElementById('slider_175');
    const tooltip175 = document.getElementById('tooltip-175');
    const slider = document.getElementById('spending-slider');
    const spendingVar = document.getElementById('spending-var');
    const noteContainer = document.getElementById('note-container');
    const propTaxVar = document.getElementById('prop-tax-var');
    const ntrNumerator = document.getElementById('ntr-numerator');
    const ntrDenominator1 = document.getElementById('ntr-denominator1');
    const ntrDenominator2 = document.getElementById('ntr-denominator2');
    const ntrResult = document.getElementById('ntr-result');
    const propTaxPercVar = document.getElementById('prop-tax-perc-var');
    const otherTaxPercVar = document.getElementById('other-tax-perc-var');
    const noteContainer175 = document.getElementById('note-container-175');
    const levyCommercialVar = document.getElementById('comm-tax-levy-span');
    const levyResidentialVar = document.getElementById('res-tax-levy-span');

    let spendingSliderValue = 3.3284; // Default value

 // Function to update the natural tax rate result
 const updateNtrResult = () => {
    const numerator = parseFloat(ntrNumerator.textContent);
    const denominator1 = parseFloat(ntrDenominator1.textContent);
    const denominator2 = parseFloat(ntrDenominator2.textContent);
    const totalDenominator = denominator1 + denominator2;
    const result = (numerator / totalDenominator) * 1000;
    ntrResult.textContent = result.toFixed(2);
};

    if (slider) {
        // Spending slider functionality
        slider.addEventListener('input', () => {
            const value = parseFloat(slider.value);
            spendingVar.textContent = value.toFixed(1);
            spendingSliderValue = value;

            let propTaxValue = value - 1.3;
            propTaxVar.textContent = propTaxValue.toFixed(1);
            ntrNumerator.textContent = propTaxValue.toFixed(1); // Update ntr-numerator

            let propTaxPercentage = Math.round((propTaxValue / value) * 100);
            propTaxPercVar.textContent = propTaxPercentage;
            otherTaxPercVar.textContent = 100 - propTaxPercentage;

            if (value > 4.6) {
                propTaxVar.style.color = 'red';
                noteContainer.innerHTML = `
                    <a href="https://www.mass.gov/info-details/proposition-2-12-and-tax-rate-process" 
                       target="_blank" 
                       style="color: red; text-decoration: underline;">
                       Click here </a> &nbsp;for more information about how Proposition 2 1/2 limits the property tax levy.
                `;
                noteContainer.style.visibility = 'visible';
                noteContainer.style.opacity = '1';
            } else {
                propTaxVar.style.color = '';
                noteContainer.style.visibility = 'hidden';
                noteContainer.style.opacity = '0';
            }

            // Recalculate levy values for slider175
            const slider175Value = parseFloat(slider175.value);
            let levyCommercial = (slider175Value / 100) * (propTaxValue / (156.079088 + 68.304382)) * 68.304382;
            let levyResidential = propTaxValue - ((slider175Value / 100) * 0.01483 * 68.304382);

            levyCommercialVar.textContent = levyCommercial.toFixed(2);
            levyResidentialVar.textContent = levyResidential.toFixed(2);
        });
    }

    if (slider175 && tooltip175) {
        // Slider 175 tooltip functionality
        slider175.addEventListener('input', (e) => {
            const value175 = parseFloat(slider175.value);
            tooltip175.textContent = value175.toFixed(1);
            const sliderRect = slider175.getBoundingClientRect();
            const tooltipWidth = tooltip175.offsetWidth;
            const sliderWidth = sliderRect.width;

            // Set tooltip position relative to slider's value
            const position = (value175 / 100) * sliderWidth - tooltipWidth / 2;
            tooltip175.style.left = `${position}px`;
            tooltip175.style.top = `-30px`;

            tooltip175.style.display = 'block'; // Show tooltip
        });

        slider175.addEventListener('mouseout', () => {
            tooltip175.style.display = 'none'; // Hide tooltip when not hovering
        });

        slider175.addEventListener('input', () => {
            const value175 = parseFloat(slider175.value);

            if (value175 < 170) {
                noteContainer175.innerHTML = `
                    <a href="https://www.mass.gov/info-details/proposition-2-12-and-tax-rate-process" 
                       target="_blank" 
                       style="color: red; text-decoration: underline;">
                       Click here </a> &nbsp;for more information about why the ratio cannot be lower than 170%.
                `;
                noteContainer175.style.visibility = 'visible';
                noteContainer175.style.opacity = '1';
                slider175.style.setProperty('--slider-color', 'red');
            } else {
                slider175.style.setProperty('--slider-color', '');
                noteContainer175.style.visibility = 'hidden';
                noteContainer175.style.opacity = '0';
            }
               // Update the natural tax rate result
            updateNtrResult();
        });
         // Initial update of the natural tax rate result
         updateNtrResult();
    }

    // Start interactivity between sliders
    slider175.addEventListener('input', () => {
        const value175 = parseFloat(slider175.value);
        const spendingValue = parseFloat(slider.value);
        const propTaxValue = spendingValue - 1.3;
        propTaxVar.textContent = propTaxValue.toFixed(1);

        let levyCommercial = (value175 / 100) * (propTaxValue / (156.079088 + 68.304382)) * 68.304382;
        let levyResidential = propTaxValue - ((value175 / 100) * 0.01483 * 68.304382);

        levyCommercialVar.textContent = levyCommercial.toFixed(2);
        levyResidentialVar.textContent = levyResidential.toFixed(2);
    });
});

    // Start interactivity of final tax rate block
document.addEventListener('DOMContentLoaded', () => {
    const numeratorSpans = document.querySelectorAll('.numerator span');
    const denominatorSpans = document.querySelectorAll('.denominator span');
    const resultSpans = document.querySelectorAll('.result span');
    const commPropLevy = document.getElementById('comm-tax-levy-span');
    const resPropLevy = document.getElementById('res-tax-levy-span');

    if (commPropLevy) {
        const levyObserver = new MutationObserver(() => {
            numeratorSpans[0].textContent = parseFloat(commPropLevy.textContent).toFixed(1);
            numeratorSpans[1].textContent = parseFloat(resPropLevy.textContent).toFixed(1);
        });

        levyObserver.observe(commPropLevy, { childList: true, characterData: true, subtree: true });
    }

    const updateTaxRate = (index) => {
        const numerator = parseFloat(numeratorSpans[index].textContent);
        const denominator = parseFloat(denominatorSpans[index].textContent);
        const taxRate = (numerator / (denominator - 21.8)) * 1000;
        resultSpans[index].textContent = taxRate.toFixed(2);
    };

    numeratorSpans.forEach((numeratorSpan, index) => {
        const observer = new MutationObserver(() => {
            updateTaxRate(index);
        });

        observer.observe(numeratorSpan, { childList: true, characterData: true, subtree: true });
        observer.observe(denominatorSpans[index], { childList: true, characterData: true, subtree: true });

        updateTaxRate(index);
    });
});
