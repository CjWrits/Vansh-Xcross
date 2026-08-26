/* ==========================================================================
   Vansh Fire Xcross - Main Application Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('translate-x-full');
    });
  }

  if (mobileMenuClose && mobileMenuDrawer) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenuDrawer.classList.add('translate-x-full');
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuDrawer) mobileMenuDrawer.classList.add('translate-x-full');
    });
  });

  // 2. Navbar Scroll Glass Elevation
  const headerNav = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (headerNav) {
      if (window.scrollY > 40) {
        headerNav.classList.add('shadow-2xl', 'border-b', 'border-rose-950/40', 'bg-slate-950/95');
      } else {
        headerNav.classList.remove('shadow-2xl', 'bg-slate-950/95');
      }
    }
  });

  // 3. Product Catalog Filter Tabs
  const productFilterBtns = document.querySelectorAll('.prod-filter-btn');
  const productCards = document.querySelectorAll('.product-card-item');

  productFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      productFilterBtns.forEach(b => {
        b.classList.remove('active', 'bg-gradient-to-r', 'from-rose-600', 'to-orange-500', 'text-white');
        b.classList.add('text-slate-400', 'hover:text-white');
      });

      // Add active to current
      btn.classList.add('active', 'bg-gradient-to-r', 'from-rose-600', 'to-orange-500', 'text-white');
      btn.classList.remove('text-slate-400', 'hover:text-white');

      const filterCategory = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCat.includes(filterCategory)) {
          card.classList.remove('hidden');
          card.classList.add('animate-fade-in');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        faqItems.forEach(i => i.classList.remove('active'));
        // If not already active, open it
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. Active vs Passive Visual Switcher in Feature Section
  const deployTabs = document.querySelectorAll('.deploy-mode-btn');
  const deployPassiveView = document.getElementById('deployPassiveView');
  const deployActiveView = document.getElementById('deployActiveView');

  deployTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      deployTabs.forEach(t => t.classList.remove('active', 'border-rose-500', 'bg-rose-500/20', 'text-white'));
      tab.classList.add('active', 'border-rose-500', 'bg-rose-500/20', 'text-white');

      const target = tab.getAttribute('data-deploy-target');
      if (target === 'passive') {
        if (deployPassiveView) deployPassiveView.classList.remove('hidden');
        if (deployActiveView) deployActiveView.classList.add('hidden');
      } else {
        if (deployPassiveView) deployPassiveView.classList.add('hidden');
        if (deployActiveView) deployActiveView.classList.remove('hidden');
      }
    });
  });

  // 6. Interactive 3D Fireball Preview Sphere Mouse Rotation
  const ball3D = document.getElementById('interactiveHeroBall');
  if (ball3D) {
    document.addEventListener('mousemove', (e) => {
      const rect = ball3D.getBoundingClientRect();
      const ballCenterX = rect.left + rect.width / 2;
      const ballCenterY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - ballCenterX) / 25;
      const deltaY = (e.clientY - ballCenterY) / 25;

      ball3D.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    });
  }

  // 7. Contact / Dealership Form Handler with WhatsApp Integration
  const leadForm = document.getElementById('dealershipEnquiryForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('leadName')?.value || 'Valued Partner';
      const phone = document.getElementById('leadPhone')?.value || '';
      const email = document.getElementById('leadEmail')?.value || '';
      const city = document.getElementById('leadCity')?.value || '';
      const inquiryType = document.getElementById('leadInquiryType')?.value || 'Bulk Purchase';
      const message = document.getElementById('leadMessage')?.value || '';

      const msgEncoded = `*New Inquiry via Vansh Fire Xcross Portal*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*City/State:* ${encodeURIComponent(city)}%0A*Interest:* ${encodeURIComponent(inquiryType)}%0A*Requirements:* ${encodeURIComponent(message)}`;

      // Show success modal or feedback
      const formFeedback = document.getElementById('formFeedbackMsg');
      if (formFeedback) {
        formFeedback.classList.remove('hidden');
        formFeedback.innerHTML = `
          <div class="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm">
            <i class="fas fa-check-circle mr-2"></i> Thank you, <strong>${name}</strong>! Your inquiry has been registered. Redirecting to WhatsApp for instant priority assistance...
          </div>
        `;
      }

      setTimeout(() => {
        window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${msgEncoded}`, '_blank');
      }, 1200);
    });
  }

  // 8. Datasheet Downloader Simulation
  window.downloadDatasheet = function(modelName) {
    const alertModal = document.createElement('div');
    alertModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4';
    alertModal.innerHTML = `
      <div class="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in text-center">
        <div class="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-file-pdf text-2xl text-rose-400"></i>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Technical Datasheet</h3>
        <p class="text-sm text-slate-300 mb-6">
          Downloading official engineering specifications & MSDS for <strong>${modelName}</strong>.
        </p>
        <div class="flex items-center justify-center gap-3">
          <button onclick="this.closest('.fixed').remove()" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition">
            Close
          </button>
          <a href="assets/vansh-fire-xcross-datasheet.pdf" download="${modelName}-Specs.pdf" onclick="this.closest('.fixed').remove()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 text-white text-sm font-semibold shadow-lg hover:shadow-rose-500/30 transition">
            Download PDF
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(alertModal);
  };
});
