const productPanels = document.querySelectorAll('.panel-default');

productPanels.forEach((productPanel) => {
  const panelBodies = productPanel.querySelectorAll('.panel-body');
  panelBodies.forEach((panel) => {
    const boxSizeEl = panel.querySelector('li:first-child');
    const boxSize = boxSizeEl.textContent.trim().replace('Box ', '');
    const [boxCount, boxQty] = boxSize.includes('x') ? boxSize.split('x').map((s) => s.trim()) : [boxSize, 1];

    const priceStr = panel.querySelector('.current_price').textContent.replace('US$ ', '');
    const price = parseFloat(priceStr.match(/[\d\.]+/));
    const pricePerUnit = (price / boxQty / boxCount) + 2;
    const afterTaxKr = (price / boxQty / boxCount) * 1.54 + 2;

    const pricePerUnitEl = document.createElement('span');
    const afterTaxEl = document.createElement('span');
    const boxCountEl = document.createElement('span');


    if (price > 150) {
      boxCountEl.textContent = `\n *${boxCount * boxQty}개 / `;
      boxCountEl.style.color = 'white';
      afterTaxEl.innerHTML = `\n 개당: $${afterTaxKr.toFixed(2)}<br>`;
    } else if (boxCount * boxQty > 50) {
      boxCountEl.textContent = `\n *${boxCount * boxQty}개 / `;
      boxCountEl.style.color = 'white';
      afterTaxEl.innerHTML = `\n 개당: $${afterTaxKr.toFixed(2)}<br>`;
    } else {
      boxCountEl.textContent = `\n ${boxCount * boxQty}개 / `;
      boxCountEl.style.color = 'white';
      pricePerUnitEl.textContent = `\n 개당: $${pricePerUnit.toFixed(2)}`;
    }

    const backgroundColor = price > 150 ? (afterTaxKr <= 10 ? '#00b14f' : afterTaxKr <= 20 ? '#0085ca' : '#d2232a') :
      (pricePerUnit <= 10 ? '#00b14f' : pricePerUnit <= 20 ? '#0085ca' : '#d2232a');

    [afterTaxEl, pricePerUnitEl].forEach((el) => {
      el.style.backgroundColor = backgroundColor;
      el.style.color = 'white';
    });

    boxCountEl.style.backgroundColor = backgroundColor;
    boxSizeEl.appendChild(document.createElement('br'));
    boxSizeEl.appendChild(boxCountEl);
    boxSizeEl.appendChild(price > 150 ? afterTaxEl : pricePerUnitEl);
  });
});
