document.addEventListener('DOMContentLoaded', () => {
  initLucide();
  initMobileMenu();
  initCounters();
  initScrollAnimations();
  initTabs();
  initSmoothScroll();
  initCarFiltering();
  initReviewCarousel();
  initVideoModal();
  initStickyHeader();
  // initFormInteractions();
});

// ======================
// Lucide Icons
// ======================
function initLucide() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ======================
// Mobile Menu
// ======================
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

// ======================
// Sticky Header
// ======================
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('shadow-lg');
    } else {
      header.classList.remove('shadow-lg');
    }
  });
}

// ======================
// Counters (объединённая версия)
// ======================
function initCounters() {
  const counters = document.querySelectorAll('.counter');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(counter) {
  const target = parseInt(counter.dataset.target);
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.floor(easeOut * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// ======================
// Scroll Animations (fade-in-up)
// ======================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  elements.forEach((el) => observer.observe(el));
}

// ======================
// Tabs + Filtering
// ======================
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active', 'bg-primary', 'text-white');
        t.classList.add('text-gray-400');
      });

      tab.classList.add('active', 'bg-primary', 'text-white');
      tab.classList.remove('text-gray-400');

      const filter = tab.textContent.trim().toLowerCase();
      filterCars(filter);
    });
  });
}

function filterCars(filter) {
  const cards = document.querySelectorAll('.car-card');

  cards.forEach((card, index) => {
    const title = card.querySelector('h4').textContent.toLowerCase();
    const desc = card.querySelector('p').textContent.toLowerCase();

    const show = filter === 'show all' || title.includes(filter) || desc.includes(filter);

    if (show) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 50 * index);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

function initCarFiltering() {
  // уже вызывается внутри initTabs
}

// ======================
// Smooth Scroll
// ======================
function initSmoothScroll() {
  const menu = document.getElementById('mobile-menu');

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });

      if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
      }
    });
  });
}

// ======================
// Review Carousel
// ======================
function initReviewCarousel() {
  const container = document.getElementById('reviews-container');
  const prev = document.getElementById('prev-review');
  const next = document.getElementById('next-review');

  if (!container || !prev || !next) return;

  const reviews = container.querySelectorAll('.bg-dark-secondary');
  let current = 0;
  const visibleCount = window.innerWidth >= 768 ? 2 : 1;

  function update() {
    reviews.forEach((review, i) => {
      review.style.display = i >= current && i < current + visibleCount ? 'block' : 'none';
    });
  }

  prev.addEventListener('click', () => {
    if (current > 0) {
      current--;
      update();
    }
  });

  next.addEventListener('click', () => {
    if (current < reviews.length - visibleCount) {
      current++;
      update();
    }
  });

  update();
}

// ======================
// Video Modal
// ======================
function initVideoModal() {
  const video = document.querySelector('.video-container');
  if (!video) return;

  video.addEventListener('click', () => {
    alert('Video modal would open here');
  });
}

// ======================
// Form Interactions
// ======================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -15% 0px',
    },
  );

  elements.forEach((el) => observer.observe(el));
}

// ======================
// Spin Animation
// ======================
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
