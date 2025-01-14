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