// select all product panels
const productPanels = document.querySelectorAll('.panel-default');

productPanels.forEach((productPanel) => {
  const panelBodies = productPanel.querySelectorAll('.panel-body');
  panelBodies.forEach((panel) => {
    const boxSize = panel.querySelector('li:first-child').textContent.trim().replace('Box ', '');
    const boxQty = boxSize.includes('x') ? boxSize.split('x')[1].trim() : 1;
    const boxCount = boxSize.includes('x') ? boxSize.split('x')[0].trim() : boxSize;
  
    // extract price and calculate price per unit
    const priceStr = panel.querySelector('.current_price').textContent.replace('US$ ', '');
    const price = parseFloat(priceStr.match(/[\d\.]+/));
    const pricePerUnit = price / boxQty / boxCount;
    const afterTaxKr = pricePerUnit*1.54+2
  
    // display the result
    console.log(`1ea: ${pricePerUnit.toFixed(2)}`);
    console.log(`1ea(tax): ${afterTaxKr.toFixed(2)}`);
  
    // update the HTML
    const pricePerUnitEl = document.createElement('span');
    const afterTaxEl = document.createElement('span');
    
    const discountedPriceEl = panel.querySelector('.discounted_price');
    if (discountedPriceEl) {
      discountedPriceEl.appendChild(document.createElement('br'));
    }
    panel.querySelector('li:first-child').appendChild(document.createElement('br'));



    if (price > 150) {
      afterTaxEl.textContent = `\n 개당: $${afterTaxKr.toFixed(2)} (150초과)`;
      panel.querySelector('li:first-child').appendChild(afterTaxEl);
    } else {
      pricePerUnitEl.textContent = `\n 개당: $${pricePerUnit.toFixed(2)}`;
      panel.querySelector('li:first-child').appendChild(pricePerUnitEl);
    }


    
  });
});
