// Function for main page
function processMainPage() {
  const tables = document.querySelectorAll('table[width="98%"]');

  tables.forEach((table) => {
    const cigarBoxCount = table.querySelector('.blacktxt_w strong + strong').textContent;
    const price = parseFloat(table.querySelector('.redtxt').textContent);
    const boxCount = parseInt(cigarBoxCount.match(/\d+/)[0]);

    const pricePerUnit = price / boxCount;
    const afterTaxKr = pricePerUnit * 1.54 + 2;

    const newCell = document.createElement('td');
    const pricePerUnitEl = document.createElement('span');
    const boxCountEl = document.createElement('span');

    if (price > 150) {
      pricePerUnitEl.textContent = `${boxCount}개/개당$${afterTaxKr.toFixed(2)}`;
    } else {
      pricePerUnitEl.textContent = `${boxCount}개/개당$${pricePerUnit.toFixed(2)}`;
    }

    const backgroundColor = price > 150 ? (afterTaxKr <= 10 ? '#00b14f' : afterTaxKr <= 20 ? '#0085ca' : '#d2232a') :
      (pricePerUnit <= 10 ? '#00b14f' : pricePerUnit <= 20 ? '#0085ca' : '#d2232a');

    [pricePerUnitEl].forEach((el) => {
      el.style.backgroundColor = backgroundColor;
      el.style.color = 'white';
      el.style.fontSize = '11px';
      el.style.whiteSpace = 'nowrap';
      el.style.textAlign = 'right';
    });

    // set the width of oldPriceEl to half of its original width
    const oldPriceEl = table.querySelector('.oldpricetxt_black');
    const redPriceEl = table.querySelector('.redtxt');

    oldPriceEl.style.width = `${parseFloat(getComputedStyle(oldPriceEl).width) / 2}px`;
    redPriceEl.style.width = `${parseFloat(getComputedStyle(redPriceEl).width) / 1.5}px`;

    boxCountEl.style.backgroundColor = backgroundColor;
    const blank = document.createTextNode('\u00A0');
    newCell.appendChild(blank);
    newCell.appendChild(document.createElement('span'));
    newCell.appendChild(boxCountEl);
    newCell.appendChild(pricePerUnitEl);

    // insert newCell after the cigar name element
    const cigarNameEl = table.querySelector('.oldpricetxt_black');
    cigarNameEl.parentNode.insertBefore(newCell, cigarNameEl.nextSibling);
  });
}

// Function for other page
function processOtherPage() {
  const tables = document.querySelectorAll("table");

  tables.forEach((table) => {
    const productName = table.querySelector(".product_header_W") || table.querySelector(".product_header");
    const priceEl = table.querySelector(".pricetxt strong");
    const cigarBoxCount = table.querySelector(".fsize11 strong");

    if (productName && priceEl && cigarBoxCount) {
      const priceText = priceEl.textContent.trim();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
      const boxCount = parseInt(cigarBoxCount.textContent.match(/\d+/)[0]);
      const pricePerUnit = price / boxCount;

      const afterTaxKr = pricePerUnit * 1.54 + 2;

      const newCell = document.createElement("td");
      const pricePerUnitEl = document.createElement("span");
      const boxCountEl = document.createElement("span");

      if (price > 150) {
        pricePerUnitEl.textContent = `${boxCount}개/개당$${afterTaxKr.toFixed(2)}`;
      } else {
        pricePerUnitEl.textContent = `${boxCount}개/개당$${pricePerUnit.toFixed(2)}`;
      }

      const backgroundColor =
        price > 150
          ? afterTaxKr <= 10
            ? "#00b14f"
            : afterTaxKr <= 20
              ? "#0085ca"
              : "#d2232a"
          : pricePerUnit <= 10
            ? "#00b14f"
            : pricePerUnit <= 20
              ? "#0085ca"
              : "#d2232a";

      [pricePerUnitEl].forEach((el) => {
        el.style.backgroundColor = backgroundColor;
        el.style.color = "white";
        el.style.fontSize = "11px";
        el.style.whiteSpace = "nowrap";
        el.style.textAlign = "right";
      });

      boxCountEl.style.backgroundColor = backgroundColor;
      const blank = document.createTextNode("\u00A0");
      newCell.appendChild(blank);
      newCell.appendChild(document.createElement("span"));
      newCell.appendChild(boxCountEl);
      newCell.appendChild(pricePerUnitEl);

      const cigarNameEl = table.querySelector("td:nth-child(1) strong");

      // Check if new cell has already been inserted
      if (!cigarNameEl.parentNode.querySelector(".price-per-unit-cell")) {
        newCell.classList.add("price-per-unit-cell");
        cigarNameEl.parentNode.insertBefore(newCell, cigarNameEl.nextSibling);
      }
    }
  });
}

// Call the functions based on the page
if (document.querySelector('table[width="98%"]')) {
  processMainPage();
} else {
  processOtherPage();
}
