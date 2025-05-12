const inputEl = document.querySelector('.unit--form-input');
const convertBtn = document.querySelector('.unit--convert-btn');

// Conversion configuration with abbreviations
const conversions = [
  {
    title: 'Length (Pixel/REM)',
    metricUnit: 'pixel',
    imperialUnit: 'rem',
    metricAbbr: 'px',
    imperialAbbr: 'rem',
    factor: 1 / 16,
    selector: '.px-rem-info',
  },
  {
    title: 'Length (Centimeter/Inch)',
    metricUnit: 'centimeter',
    imperialUnit: 'inch',
    metricAbbr: 'cm',
    imperialAbbr: 'in',
    factor: 0.3937,
    selector: '.cm-inch-info',
  },
  {
    title: 'Length (Inch/Feet)',
    metricUnit: 'inch',
    imperialUnit: 'foot',
    metricAbbr: 'in',
    imperialAbbr: 'ft',
    factor: 1 / 12,
    selector: '.inch-feet-info',
  },
  {
    title: 'Length (Millimeter/Centimeter)',
    metricUnit: 'millimeter',
    imperialUnit: 'centimeter',
    metricAbbr: 'mm',
    imperialAbbr: 'cm',
    factor: 0.1,
    selector: '.mm-cm-info',
  },
  {
    title: 'Length (Meter/Feet)',
    metricUnit: 'meter',
    imperialUnit: 'foot',
    metricAbbr: 'm',
    imperialAbbr: 'ft',
    factor: 3.281,
    selector: '.length-info',
  },
  {
    title: 'Volume (Liter/Gallon)',
    metricUnit: 'liter',
    imperialUnit: 'gallon',
    metricAbbr: 'L',
    imperialAbbr: 'gal',
    factor: 0.264,
    selector: '.volume-info',
  },
  {
    title: 'Mass (Kilogram/Pound)',
    metricUnit: 'kilogram',
    imperialUnit: 'pound',
    metricAbbr: 'kg',
    imperialAbbr: 'lb',
    factor: 2.204,
    selector: '.mass-info',
  },
];

// Format unit (abbreviations only)
function formatUnit(abbr) {
  return abbr;
}

// Convert units and inject HTML
function convert(value) {
  conversions.forEach((conversion) => {
    const resultEl = document.querySelector(conversion.selector);

    if (!resultEl) return;

    const metricToImperial = (value * conversion.factor).toFixed(3);
    const imperialToMetric = (value / conversion.factor).toFixed(3);

    // Construct HTML
    resultEl.innerHTML = `
      <div class="conversion-info--wrapper">
        <div class="convert-info--first-wrapper">
          <div><span class="converted-number">${value}</span> ${formatUnit(
      conversion.metricAbbr
    )}</div>
          <div>&equals;</div>
          <div><span class="converted-number">${metricToImperial}</span> ${formatUnit(
      conversion.imperialAbbr
    )}</div>
        </div>

        <div class="convert-info--second-wrapper">
          <div><span class="converted-number">${value}</span> ${formatUnit(
      conversion.imperialAbbr
    )}</div>
          <div>&equals;</div>
          <div><span class="converted-number">${imperialToMetric}</span> ${formatUnit(
      conversion.metricAbbr
    )}</div>
        </div>
      </div>
    `;
  });

  enableCopyOnConvertedNumbers(); // Apply clipboard interaction
}

// Enable click-to-copy with tooltip
function enableCopyOnConvertedNumbers() {
  const elements = document.querySelectorAll('.converted-number');

  elements.forEach((el) => {
    el.addEventListener('click', () => {
      const text = el.textContent;

      navigator.clipboard.writeText(text).then(() => {
        const tooltip = document.createElement('span');
        tooltip.className = 'copy-tooltip';
        tooltip.innerText = 'Copied!';
        el.appendChild(tooltip);

        setTimeout(() => {
          tooltip.remove();
        }, 1000);
      });
    });
  });
}

// Button click handler
convertBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = parseFloat(inputEl.value);
  if (isNaN(inputValue)) {
    alert('Please enter a valid number.');
    return;
  }
  convert(inputValue);
});

// Default conversion on load
document.addEventListener('DOMContentLoaded', () => {
  const defaultValue = parseFloat(inputEl.value);
  if (!isNaN(defaultValue)) {
    convert(defaultValue);
  }
});
