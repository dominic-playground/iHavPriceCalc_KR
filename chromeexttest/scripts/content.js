// select all product panels
const productPanels = document.querySelectorAll('.panel-default');

productPanels.forEach((productPanel) => {
  const panelBodies = productPanel.querySelectorAll('.panel-body');
  panelBodies.forEach((panel) => {

    //extract box count
    const boxSize = panel.querySelector('li:first-child').textContent.trim().replace('Box ', '');
    const boxQty = boxSize.includes('x') ? boxSize.split('x')[1].trim() : 1;
    const boxCount = boxSize.includes('x') ? boxSize.split('x')[0].trim() : boxSize;
  
    // extract price and calculate price per unit
    const priceStr = panel.querySelector('.current_price').textContent.replace('US$ ', '');
    const price = parseFloat(priceStr.match(/[\d\.]+/));

    const pricePerUnit = price / boxQty / boxCount;
    const afterTaxKr = pricePerUnit*1.54+2
  
// create span elements for displaying prices and quantities
const pricePerUnitEl = document.createElement('span');
const afterTaxEl = document.createElement('span');
const boxCountEl = document.createElement('span');

// add a line break after the discounted price, if present
const discountedPriceEl = panel.querySelector('.discounted_price');
if (discountedPriceEl) {
  discountedPriceEl.appendChild(document.createElement('br'));
}

// display the box count on the first line
const firstLine = panel.querySelector('li:first-child');
firstLine.appendChild(document.createElement('br'));
boxCountEl.textContent = `\n 총 ${boxCount*boxQty}개 / `;
boxCountEl.style.color = "white";
firstLine.appendChild(boxCountEl);

// calculate the price per unit and display it on the first line
if (price > 150) {
  afterTaxEl.innerHTML = `\n 개당: $${afterTaxKr.toFixed(2)}<br>(150초과)`;
  // set background color based on price
  if (afterTaxKr <= 10) {
    afterTaxEl.style.backgroundColor = '#00b14f'; // green
  } else if (afterTaxKr <= 20) {
    afterTaxEl.style.backgroundColor = '#0085ca'; // blue
  } else {
    afterTaxEl.style.backgroundColor = '#d2232a'; // red
  }
  afterTaxEl.style.color = 'white';
  boxCountEl.style.backgroundColor = afterTaxEl.style.backgroundColor;
  firstLine.appendChild(afterTaxEl);
} else {
  pricePerUnitEl.textContent = `\n 개당: $${pricePerUnit.toFixed(2)}`;
  // set background color based on price
  if (pricePerUnit <= 10) {
    pricePerUnitEl.style.backgroundColor = '#00b14f'; // green
  } else if (pricePerUnit <= 20) {
    pricePerUnitEl.style.backgroundColor = '#0085ca'; // blue
  } else {
    pricePerUnitEl.style.backgroundColor = '#d2232a'; // red
  }
  pricePerUnitEl.style.color = 'white';
  boxCountEl.style.backgroundColor = pricePerUnitEl.style.backgroundColor;
  firstLine.appendChild(pricePerUnitEl);
}



  });
});
