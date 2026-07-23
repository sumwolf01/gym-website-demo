/* =========================================================
   POWERFIT GYM — script.js
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADING SCREEN ---------- */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen.classList.add('hidden'), 500);
  });
  // Fallback in case 'load' fires very late (slow external images)
  setTimeout(() => loadingScreen && loadingScreen.classList.add('hidden'), 2500);

  /* ---------- SCROLL PROGRESS BAR ---------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive:true });

  /* ---------- NAVBAR SCROLLED STATE ---------- */
  const navbar = document.getElementById('navbar');
  function toggleNavbarBg(){
    if(window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleNavbarBg, { passive:true });
  toggleNavbarBg();

  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById('back-to-top');
  function toggleBackToTop(){
    if(window.scrollY > 600) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }
  document.addEventListener('scroll', toggleBackToTop, { passive:true });
  backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  /* ---------- MOBILE MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  function closeMobileMenu(){
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
  }
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
  });
  mobileOverlay.addEventListener('click', closeMobileMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a, .mobile-menu a');
  function highlightNav(){
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if(window.scrollY >= top) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  document.addEventListener('scroll', highlightNav, { passive:true });
  highlightNav();

  /* ---------- DARK / LIGHT MODE TOGGLE ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  });

  /* ---------- SEARCH OVERLAY ---------- */
  const searchToggle = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  const searchIndex = [
    { title:'About PowerFit Gym', href:'#about' },
    { title:'Membership Plans & Pricing', href:'#membership' },
    { title:'Yoga Classes', href:'#classes' },
    { title:'CrossFit Classes', href:'#classes' },
    { title:'HIIT Training', href:'#classes' },
    { title:'Strength Training', href:'#classes' },
    { title:'Zumba', href:'#classes' },
    { title:'Kickboxing', href:'#classes' },
    { title:'Our Trainers', href:'#trainers' },
    { title:'BMI Calculator', href:'#bmi' },
    { title:'Gym Facilities', href:'#facilities' },
    { title:'Transformation Gallery', href:'#gallery' },
    { title:'Success Stories / Testimonials', href:'#testimonials' },
    { title:'Fitness Blog', href:'#blog' },
    { title:'Frequently Asked Questions', href:'#faq' },
    { title:'Contact Us', href:'#contact' },
    { title:'Starter Membership Plan', href:'#membership' },
    { title:'Premium Membership Plan', href:'#membership' },
    { title:'Elite Membership Plan', href:'#membership' },
  ];

  function openSearch(){
    searchOverlay.classList.add('open');
    setTimeout(() => searchInput.focus(), 200);
  }
  function closeSearch(){
    searchOverlay.classList.remove('open');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }
  searchToggle.addEventListener('click', openSearch);
  searchClose.addEventListener('click', closeSearch);
  searchOverlay.addEventListener('click', (e) => { if(e.target === searchOverlay) closeSearch(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeSearch(); });

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    if(!q){ return; }
    const matches = searchIndex.filter(item => item.title.toLowerCase().includes(q));
    if(matches.length === 0){
      searchResults.innerHTML = '<p class="search-empty">No results — try "yoga", "pricing", or "trainers".</p>';
      return;
    }
    matches.forEach(m => {
      const a = document.createElement('a');
      a.href = m.href;
      a.textContent = m.title;
      a.addEventListener('click', closeSearch);
      searchResults.appendChild(a);
    });
  });

  /* ---------- SCROLL REVEAL ANIMATIONS ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  // Heartbeat pulse dividers draw once in view
  document.querySelectorAll('.pulse-divider').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){ entry.target.classList.add('in-view'); obs.unobserve(entry.target); }
      });
    }, { threshold:0.4 });
    obs.observe(el);
  });

  /* ---------- COUNTER ANIMATION ---------- */
  const counters = document.querySelectorAll('[data-count]');
  function animateCounter(el){
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.floor(value) : value.toFixed(1)) + suffix;
      if(progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.6 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- LAZY LOAD IMAGES ---------- */
  const lazyImages = document.querySelectorAll('img.lazy');
  const lazyObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if(src){
          img.src = src;
          img.addEventListener('load', () => img.classList.add('loaded'), { once:true });
        }
        obs.unobserve(img);
      }
    });
  }, { rootMargin:'150px' });
  lazyImages.forEach(img => lazyObserver.observe(img));

  /* ---------- SMOOTH SCROLL FOR ANCHORS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const targetId = this.getAttribute('href');
      if(targetId.length > 1){
        const target = document.querySelector(targetId);
        if(target){
          e.preventDefault();
          const offset = target.offsetTop - 70;
          window.scrollTo({ top: offset, behavior:'smooth' });
        }
      }
    });
  });

  /* ---------- CLASS TABS FILTER ---------- */
  const classTabs = document.querySelectorAll('.class-tab');
  const classCards = document.querySelectorAll('.class-card');
  classTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      classTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      classCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- GALLERY FILTER ---------- */
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------- LIGHTBOX ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  let galleryVisibleList = [];
  let currentLightboxIndex = 0;

  function openLightbox(index){
    galleryVisibleList = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
    currentLightboxIndex = galleryVisibleList.findIndex(item => item === galleryItems[index]) ;
    if(currentLightboxIndex === -1) currentLightboxIndex = 0;
    showLightboxImage();
    lightbox.classList.add('open');
  }
  function showLightboxImage(){
    const item = galleryVisibleList[currentLightboxIndex];
    if(!item) return;
    const img = item.querySelector('img');
    lightboxImg.src = img.dataset.src || img.src;
    lightboxImg.alt = img.alt;
  }
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });
  lightboxPrev.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryVisibleList.length) % galleryVisibleList.length;
    showLightboxImage();
  });
  lightboxNext.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryVisibleList.length;
    showLightboxImage();
  });
  document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') lightbox.classList.remove('open');
    if(e.key === 'ArrowLeft') lightboxPrev.click();
    if(e.key === 'ArrowRight') lightboxNext.click();
  });

  /* ---------- TESTIMONIAL SLIDER ---------- */
  const slidesTrack = document.getElementById('testimonial-slides');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsWrap = document.getElementById('slider-dots');
  let currentSlide = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if(i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i+1));
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  function goToSlide(i){
    currentSlide = (i + slides.length) % slides.length;
    slidesTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsWrap.querySelectorAll('button').forEach((d, idx) => d.classList.toggle('active', idx === currentSlide));
  }
  document.getElementById('slider-prev').addEventListener('click', () => goToSlide(currentSlide - 1));
  document.getElementById('slider-next').addEventListener('click', () => goToSlide(currentSlide + 1));
  let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 6000);
  document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => clearInterval(autoSlide));
  document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 6000);
  });

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- BMI CALCULATOR ---------- */
  const bmiForm = document.getElementById('bmi-form');
  const bmiUnitBtns = document.querySelectorAll('.unit-toggle button');
  const heightField = document.getElementById('bmi-height-field');
  const weightField = document.getElementById('bmi-weight-field');
  let bmiUnit = 'metric';

  bmiUnitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bmiUnitBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bmiUnit = btn.dataset.unit;
      if(bmiUnit === 'metric'){
        heightField.querySelector('label').textContent = 'Height (cm)';
        weightField.querySelector('label').textContent = 'Weight (kg)';
        heightField.querySelector('input').placeholder = 'e.g. 175';
        weightField.querySelector('input').placeholder = 'e.g. 70';
      } else {
        heightField.querySelector('label').textContent = 'Height (inches)';
        weightField.querySelector('label').textContent = 'Weight (lbs)';
        heightField.querySelector('input').placeholder = 'e.g. 69';
        weightField.querySelector('input').placeholder = 'e.g. 154';
      }
    });
  });

  const bmiValueEl = document.getElementById('bmi-value');
  const bmiCategoryEl = document.getElementById('bmi-category');
  const bmiMeterFill = document.getElementById('bmi-meter-fill');
  const bmiSuggestion = document.getElementById('bmi-suggestion');
  const bmiPlaceholder = document.getElementById('bmi-placeholder');

  bmiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const heightInput = parseFloat(document.getElementById('bmi-height').value);
    const weightInput = parseFloat(document.getElementById('bmi-weight').value);
    if(!heightInput || !weightInput || heightInput <= 0 || weightInput <= 0) return;

    let bmi;
    if(bmiUnit === 'metric'){
      const heightM = heightInput / 100;
      bmi = weightInput / (heightM * heightM);
    } else {
      bmi = (weightInput / (heightInput * heightInput)) * 703;
    }
    bmi = Math.round(bmi * 10) / 10;

    let category, color, suggestion, meterPct;
    if(bmi < 18.5){
      category = 'Underweight'; color = '#4CAF87';
      suggestion = 'Focus on nutrient-dense meals and progressive strength training to build lean mass. Our trainers can build a gain plan around your Elite or Premium membership.';
      meterPct = (bmi / 40) * 100;
    } else if(bmi < 25){
      category = 'Healthy Range'; color = '#4CAF87';
      suggestion = 'Great work — maintain this with a mix of cardio and strength sessions. Ask a trainer about our maintenance and performance programs.';
      meterPct = (bmi / 40) * 100;
    } else if(bmi < 30){
      category = 'Overweight'; color = '#FFD166';
      suggestion = 'A structured cardio + strength routine with guided nutrition can help. Our Premium plan includes a personal trainer and nutrition plan to get you there.';
      meterPct = (bmi / 40) * 100;
    } else {
      category = 'Obese Range'; color = '#FF3B30';
      suggestion = 'A supervised, gradual program works best. Book a free trial so a certified trainer can design a safe plan tailored to you.';
      meterPct = (bmi / 40) * 100;
    }

    bmiPlaceholder.style.display = 'none';
    bmiValueEl.style.display = 'block';
    bmiCategoryEl.style.display = 'block';
    bmiSuggestion.style.display = 'block';

    bmiValueEl.textContent = bmi.toFixed(1);
    bmiCategoryEl.textContent = category;
    bmiCategoryEl.style.color = color;
    bmiMeterFill.style.width = Math.min(meterPct, 100) + '%';
    bmiSuggestion.textContent = suggestion;
  });

  /* ---------- CONTACT FORM VALIDATION ---------- */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  function setError(field, message){
    field.classList.toggle('invalid', !!message);
    const errorEl = field.querySelector('.field-error');
    if(errorEl) errorEl.textContent = message || '';
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('cf-name');
    const email = document.getElementById('cf-email');
    const phone = document.getElementById('cf-phone');
    const message = document.getElementById('cf-message');

    if(name.value.trim().length < 2){
      setError(name.closest('.field'), 'Please enter your full name.'); valid = false;
    } else setError(name.closest('.field'), '');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.value.trim())){
      setError(email.closest('.field'), 'Please enter a valid email address.'); valid = false;
    } else setError(email.closest('.field'), '');

    const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
    if(!phoneRegex.test(phone.value.trim())){
      setError(phone.closest('.field'), 'Please enter a valid phone number.'); valid = false;
    } else setError(phone.closest('.field'), '');

    if(message.value.trim().length < 5){
      setError(message.closest('.field'), 'Tell us a little about what you need.'); valid = false;
    } else setError(message.closest('.field'), '');

    if(valid){
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
      contactForm.reset();
    }
  });

  /* ---------- NEWSLETTER FORM ---------- */
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Subscribed ✓';
    newsletterForm.querySelector('input').value = '';
    setTimeout(() => btn.textContent = original, 2500);
  });

});
