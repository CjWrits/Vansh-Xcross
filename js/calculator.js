/* ==========================================================================
   Vansh Fire Xcross - Smart Fire Coverage & Hazard Protection Calculator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const facilityTypeEl = document.getElementById('calcFacilityType');
  const areaRangeEl = document.getElementById('calcAreaRange');
  const areaValueEl = document.getElementById('calcAreaValue');
  const hazardCheckboxes = document.querySelectorAll('.calc-hazard-check');
  const btnCalculate = document.getElementById('calcSubmitBtn');
  const btnWhatsAppQuote = document.getElementById('calcWhatsAppQuote');

  // Outputs
  const outClassicEl = document.getElementById('calcOutClassic');
  const outCompactEl = document.getElementById('calcOutCompact');
  const outProEl = document.getElementById('calcOutPro');
  const outSavingsEl = document.getElementById('calcOutSavings');
  const outCoverageDescEl = document.getElementById('calcCoverageDesc');

  function calculateCoverage() {
    if (!facilityTypeEl || !areaRangeEl) return;

    const facility = facilityTypeEl.value; // 'home', 'office', 'server', 'factory', 'kitchen', 'vehicle'
    const areaSqFt = parseInt(areaRangeEl.value, 10);
    
    // Count hazards selected
    let hazardCount = 0;
    hazardCheckboxes.forEach(cb => {
      if (cb.checked) hazardCount++;
    });

    let classicUnits = 0;
    let compactUnits = 0;
    let proUnits = 0;
    let traditionalRefillAnnualCost = 1200; // INR per standard cylinder annual service

    switch (facility) {
      case 'home':
        // 1 classic per 400 sq ft + 1 per kitchen / meter
        classicUnits = Math.max(1, Math.ceil(areaSqFt / 450));
        compactUnits = Math.max(1, hazardCount);
        proUnits = 0;
        break;

      case 'office':
        // 1 classic per 350 sq ft + compact in server/breaker
        classicUnits = Math.max(2, Math.ceil(areaSqFt / 400));
        compactUnits = Math.max(1, hazardCount + 1);
        proUnits = areaSqFt > 3000 ? Math.ceil(areaSqFt / 2500) : 0;
        break;

      case 'server':
        // High density electrical protection
        classicUnits = Math.max(2, Math.ceil(areaSqFt / 250));
        compactUnits = Math.max(2, hazardCount * 2 + 1);
        proUnits = Math.max(1, Math.ceil(areaSqFt / 800));
        traditionalRefillAnnualCost = 2500;
        break;

      case 'factory':
        // Large volume 360 coverage
        classicUnits = Math.max(4, Math.ceil(areaSqFt / 300));
        compactUnits = Math.max(2, hazardCount);
        proUnits = Math.max(2, Math.ceil(areaSqFt / 1200));
        traditionalRefillAnnualCost = 3500;
        break;

      case 'kitchen':
        // Grease, chimney, LPG banks
        classicUnits = Math.max(2, Math.ceil(areaSqFt / 250));
        compactUnits = Math.max(2, hazardCount + 1);
        proUnits = 0;
        break;

      case 'vehicle':
        // Fleet / Automotive
        classicUnits = 0;
        compactUnits = Math.max(1, Math.ceil(areaSqFt / 100));
        proUnits = 0;
        break;

      default:
        classicUnits = 2;
        compactUnits = 1;
        proUnits = 0;
    }

    // Traditional Extinguishers equivalent maintenance savings over 5 years
    const totalEquivUnits = classicUnits + (compactUnits * 0.5) + (proUnits * 2);
    const traditional5YrCost = Math.round(totalEquivUnits * traditionalRefillAnnualCost * 5 + (totalEquivUnits * 1800));
    const vansh5YrCost = Math.round(totalEquivUnits * 1400); // 0 maintenance
    const estimatedSavings = Math.max(5000, traditional5YrCost - vansh5YrCost);

    // Update UI
    if (outClassicEl) outClassicEl.textContent = `${classicUnits} Units`;
    if (outCompactEl) outCompactEl.textContent = `${compactUnits} Units`;
    if (outProEl) outProEl.textContent = `${proUnits} Units`;
    if (outSavingsEl) outSavingsEl.textContent = `₹${estimatedSavings.toLocaleString('en-IN')}`;

    if (outCoverageDescEl) {
      outCoverageDescEl.innerHTML = `
        <div class="text-xs text-slate-400 space-y-1">
          <p><i class="fas fa-shield-alt text-emerald-400 mr-1.5"></i> <strong>Strategic Placement:</strong> Mount 15–30 cm directly above ${hazardCount > 0 ? 'selected electrical & gas hazard points' : 'primary high-risk zones'}.</p>
          <p><i class="fas fa-check-circle text-amber-400 mr-1.5"></i> <strong>Radial Span:</strong> 360° instantaneous ABC dry chemical envelope covering ~${(classicUnits * 8.5).toFixed(1)} m² perimeter.</p>
          <p><i class="fas fa-calendar-check text-cyan-400 mr-1.5"></i> <strong>5-Year Warranty:</strong> 100% Maintenance-free autonomous readiness.</p>
        </div>
      `;
    }
  }

  // Event Listeners for Dynamic Calculation
  if (areaRangeEl && areaValueEl) {
    areaRangeEl.addEventListener('input', (e) => {
      areaValueEl.textContent = `${parseInt(e.target.value, 10).toLocaleString('en-IN')} sq. ft.`;
      calculateCoverage();
    });
  }

  if (facilityTypeEl) {
    facilityTypeEl.addEventListener('change', calculateCoverage);
  }

  hazardCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateCoverage);
  });

  if (btnCalculate) {
    btnCalculate.addEventListener('click', (e) => {
      e.preventDefault();
      calculateCoverage();
    });
  }

  // WhatsApp Quote Link Builder
  if (btnWhatsAppQuote) {
    btnWhatsAppQuote.addEventListener('click', () => {
      const facility = facilityTypeEl ? facilityTypeEl.options[facilityTypeEl.selectedIndex].text : 'Premises';
      const area = areaRangeEl ? areaRangeEl.value : '1000';
      const classic = outClassicEl ? outClassicEl.textContent : '2';
      const compact = outCompactEl ? outCompactEl.textContent : '1';
      const pro = outProEl ? outProEl.textContent : '0';

      const message = `Hello Vansh Fire Xcross Team!%0A%0AI used the Smart Fire Safety Coverage Calculator for my *${encodeURIComponent(facility)}* (Area: *${area} sq.ft.*).%0A%0A*Recommended Vansh Fire Xcross Package:*%0A• Vansh Xcross Classic (1.3kg): ${classic}%0A• Vansh Xcross Compact (400g): ${compact}%0A• Vansh Xcross Pro (Modular): ${pro}%0A%0APlease provide an official quotation and delivery timeline.`;
      
      const whatsappUrl = `https://api.whatsapp.com/send?phone=919876543210&text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // Initial calculation
  calculateCoverage();
});
