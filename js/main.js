/* ==========================================================================
   Vansh Fire Xcross - Main Application Scripts
   Authentic Light Design System & Interactive Handlers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenuDrawer.classList.remove('translate-x-full');
    });
  }

  if (mobileMenuClose && mobileMenuDrawer) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenuDrawer.classList.add('translate-x-full');
    });
  }

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (mobileMenuDrawer && !mobileMenuDrawer.contains(e.target) && mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
      mobileMenuDrawer.classList.add('translate-x-full');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuDrawer) {
      mobileMenuDrawer.classList.add('translate-x-full');
    }
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuDrawer) mobileMenuDrawer.classList.add('translate-x-full');
    });
  });

  // 2. Navbar Scroll Glass Elevation (Clean Light)
  const headerNav = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (headerNav) {
      if (window.scrollY > 30) {
        headerNav.classList.add('shadow-md', 'bg-white/98');
      } else {
        headerNav.classList.remove('shadow-md', 'bg-white/98');
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
        b.classList.remove('active', 'bg-fireRed', 'text-white');
        b.classList.add('text-slate-600', 'hover:text-slate-900');
      });

      // Add active to current
      btn.classList.add('active', 'bg-fireRed', 'text-white');
      btn.classList.remove('text-slate-600', 'hover:text-slate-900');

      const filterCategory = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        if (filterCategory === 'all' || cardCat.includes(filterCategory)) {
          card.classList.remove('hidden');
          card.classList.add('animate-fade-in');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 4. FAQ Accordion (Supports both light and standard classnames)
  const faqItems = document.querySelectorAll('.faq-item, .faq-item-light');
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
      deployTabs.forEach(t => {
        t.classList.remove('active', 'bg-white', 'text-fireRed', 'shadow-sm', 'border-slate-200');
        t.classList.add('text-slate-600');
      });
      tab.classList.add('active', 'bg-white', 'text-fireRed', 'shadow-sm', 'border', 'border-slate-200');
      tab.classList.remove('text-slate-600');

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

  // 6. Interactive 3D Fireball Preview Sphere Mouse Rotation (Subtle 3D Effect)
  const ball3D = document.querySelector('.product-hero-image');
  if (ball3D) {
    document.addEventListener('mousemove', (e) => {
      const rect = ball3D.getBoundingClientRect();
      const ballCenterX = rect.left + rect.width / 2;
      const ballCenterY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - ballCenterX) / 45;
      const deltaY = (e.clientY - ballCenterY) / 45;

      ball3D.style.transform = `perspective(800px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    });
  }

  // 7. Contact / Dealership Form Handler with WhatsApp Integration
  const leadForm = document.getElementById('dealershipEnquiryForm') || document.getElementById('contactForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('leadName')?.value || document.getElementById('contactName')?.value || 'Valued Partner';
      const phone = document.getElementById('leadPhone')?.value || document.getElementById('contactPhone')?.value || '';
      const email = document.getElementById('leadEmail')?.value || document.getElementById('contactEmail')?.value || '';
      const city = document.getElementById('leadCity')?.value || document.getElementById('contactCity')?.value || '';
      const inquiryType = document.getElementById('leadInquiryType')?.value || document.getElementById('contactSubject')?.value || 'Bulk Purchase';
      const message = document.getElementById('leadMessage')?.value || document.getElementById('contactMessage')?.value || '';

      const msgEncoded = `*New Inquiry via Vansh Fire Xcross Portal*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*City/State:* ${encodeURIComponent(city)}%0A*Interest:* ${encodeURIComponent(inquiryType)}%0A*Requirements:* ${encodeURIComponent(message)}`;

      // Show success modal or feedback
      const formFeedback = document.getElementById('formFeedbackMsg');
      if (formFeedback) {
        formFeedback.classList.remove('hidden');
        formFeedback.innerHTML = `
          <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm">
            <i class="fas fa-check-circle mr-2 text-emerald-600"></i> Thank you, <strong>${name}</strong>! Your inquiry has been registered. Connecting to WhatsApp support...
          </div>
        `;
      }

      setTimeout(() => {
        window.open(`https://api.whatsapp.com/send?phone=917878939493&text=${msgEncoded}`, '_blank');
      }, 1000);
    });
  }

  // 8. Datasheet Downloader Simulation
  window.downloadDatasheet = function(modelName) {
    const alertModal = document.createElement('div');
    alertModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4';
    alertModal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in text-center">
        <div class="w-16 h-16 rounded-full bg-red-100 border border-red-200 flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-file-pdf text-2xl text-fireRed"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Technical Datasheet</h3>
        <p class="text-sm text-slate-600 mb-6">
          Engineering specifications & MSDS for <strong>${modelName}</strong>.
        </p>
        <div class="flex items-center justify-center gap-3">
          <button onclick="this.closest('.fixed').remove()" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition">
            Close
          </button>
          <a href="assets/pamphlet.jpeg" download="${modelName}-Specifications.jpeg" onclick="this.closest('.fixed').remove()" class="btn-primary-red px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md">
            Download Spec Sheet
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(alertModal);
  };
});

// Image Lightbox Functions
window.openImageModal = function(imageSrc, captionText) {
  const modal = document.getElementById('imageLightboxModal');
  const img = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  if (modal && img) {
    img.src = imageSrc;
    if (caption) caption.textContent = captionText || 'Product Preview';
    modal.classList.remove('hidden');
  }
};

window.closeImageModal = function() {
  const modal = document.getElementById('imageLightboxModal');
  if (modal) {
    modal.classList.add('hidden');
  }
};

