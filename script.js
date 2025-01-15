document.addEventListener('DOMContentLoaded', function () {
    let slider = document.getElementById('spending-slider'); 
    let spendingVar = document.getElementById('spending-var'); // Select the spending box span

    slider.addEventListener('input', function () {
        let spending = parseFloat(slider.value);
        spendingVar.textContent = spending.toFixed(1); // Update number in spending box

        let propTaxVar = spending - 1.3; // Updates prop tax variable
        document.getElementById('prop-tax-var').textContent = propTaxVar.toFixed(1); // Updates number in prop tax box
        
        let propTaxPercVar = Math.round((propTaxVar / spending) * 100); // Calculates percentage of prop tax
        document.getElementById('prop-tax-perc-var').textContent = propTaxPercVar;  // Updates percent in gray prop tax box
        document.getElementById('other-tax-perc-var').textContent = 100 - propTaxPercVar; // Updates percent in gray other tax box

    });
});


document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('spending-slider');
    const spendingVar = document.getElementById('spending-var');
    const noteContainer = document.getElementById('note-container');

    slider.addEventListener('input', () => {
        const value = parseFloat(slider.value);
        spendingVar.textContent = value.toFixed(1);

        if (value > 4.6) {
            slider.style.background = 'red';
            noteContainer.innerHTML = `
                <a href="https://www.mass.gov/info-details/proposition-2-12-and-tax-rate-process" 
                   target="_blank" 
                   style="color: red; text-decoration: underline;">
                   Click here </a> &nbsp;for more information about how Proposition 2 1/2 limits the property tax levy.
            `;
            noteContainer.style.visibility = 'visible'; // Makes it visible
            noteContainer.style.opacity = '1'; // Fully opaque
        } else {
            slider.style.background = 'blue';
            noteContainer.style.visibility = 'hidden'; // Hides the content
            noteContainer.style.opacity = '0'; // Fully transparent
        }
    });
});
