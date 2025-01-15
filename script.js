document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('spending-slider');
    const spendingVar = document.getElementById('spending-var');
    const noteContainer = document.getElementById('note-container');
    const propTaxVar = document.getElementById('prop-tax-var');

    slider.addEventListener('input', () => {
        const value = parseFloat(slider.value);
        spendingVar.textContent = value.toFixed(1);

        let propTaxValue = value - 1.3;
        propTaxVar.textContent = propTaxValue.toFixed(1);

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

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('spending-slider'); 
    const spendingVar = document.getElementById('spending-var'); // Select the spending box span
    const propTaxVar = document.getElementById('prop-tax-var');
    const propTaxPercVar = document.getElementById('prop-tax-perc-var');
    const otherTaxPercVar = document.getElementById('other-tax-perc-var');

    slider.addEventListener('input', function () {
        let spending = parseFloat(slider.value);
        spendingVar.textContent = spending.toFixed(1); // Update number in spending box

        let propTaxValue = spending - 1.3; // Updates prop tax variable
        propTaxVar.textContent = propTaxValue.toFixed(1); // Updates number in prop tax box
        
        let propTaxPercentage = Math.round((propTaxValue / spending) * 100); // Calculates percentage of prop tax
        propTaxPercVar.textContent = propTaxPercentage;  // Updates percent in gray prop tax box
        otherTaxPercVar.textContent = 100 - propTaxPercentage; // Updates percent in gray other tax box
    });
});


