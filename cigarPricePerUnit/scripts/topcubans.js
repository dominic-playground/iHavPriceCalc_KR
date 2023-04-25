const productPanels = document.querySelectorAll('.product-list');

productPanels.forEach((productPanel) => {
    const panelBodies = productPanel.querySelectorAll('.list-item');

    panelBodies.forEach((panel) => {
        const Pricequery = panel.querySelector('.price-discounted') ? panel.querySelector('.price-discounted') : panel.querySelector('.price');
        const price = parseFloat(Pricequery.textContent.replace('$ ', '').match(/[\d\.]+/));

        const boxCount = panel.querySelector('.column:nth-of-type(2)');
        const cigarCount = parseInt(boxCount.textContent);

        const pricePerUnit = (price / cigarCount).toFixed(2);
        const pricePerUnitEl = document.createElement('span');
        const boxCountEl = document.createElement('span');

        boxCountEl.textContent = `\n 총 ${cigarCount}개 / `;
        pricePerUnitEl.textContent = `\n 개당: $${pricePerUnit}`;

        const backgroundColor = (pricePerUnit <= 10 ? '#00b14f' : pricePerUnit <= 20 ? '#0085ca' : '#d2232a');
        [pricePerUnitEl].forEach((el) => {
            el.style.backgroundColor = backgroundColor;
            el.style.color = 'white';
        });
        boxCountEl.style.color = 'white';
        boxCountEl.style.backgroundColor = backgroundColor;
        const subtitle = panel.querySelector('.subtitle');
        subtitle.appendChild(document.createElement('br'));
        subtitle.appendChild(boxCountEl);
        subtitle.appendChild(pricePerUnitEl);
    });
});
