import { cars } from '../data/data.js';

document.addEventListener('DOMContentLoaded', () => {
  initLucide();
  initMobileMenu();
  initCounters();
  initScrollAnimations();
  initTabs();
  initSmoothScroll();
  initCarFiltering();
  initReviewCarousel();
  initStickyHeader();

  renderLatetsOffers();
  // initLatestOffersBrandFilter();
  initSearchFilters();
  initSearchRedirect();
});

// ======================
// Search cars redirect
// ======================
function initSearchRedirect() {
  const btn = document.getElementById('search-cars-btn');
  const brandSelect = document.getElementById('brand-select');
  const modelSelect = document.getElementById('model-select');
  const yearSelect = document.getElementById('year-select');

  if (!btn || !brandSelect || !modelSelect || !yearSelect) return;

  btn.addEventListener('click', () => {
    const brand = brandSelect.value;
    const model = modelSelect.value;
    const year = yearSelect.value;

    const params = new URLSearchParams();

    if (brand) params.append('brand', brand);
    if (model) params.append('model', model);
    if (year) params.append('year', year);

    const url = `lease-offers.html?${params.toString()}`;

    window.location.href = url;
  });
}

// ======================
// Latest offers brand filter
// ======================
// function initLatestOffersBrandFilter() {
//   const brandFilter = document.getElementById('brand-filter');

//   if (!brandFilter) return;

//   const latestCars = cars.slice(0, 6);
//   const brands = [...new Set(latestCars.map((car) => car.brand))].sort();

//   brands.forEach((brand) => {
//     const option = document.createElement('option');
//     option.value = brand;
//     option.textContent = brand;
//     brandFilter.appendChild(option);
//   });
// }

// ======================
// Search filters params
// ======================
function initSearchFilters() {
  const brandSelect = document.getElementById('brand-select');
  const modelSelect = document.getElementById('model-select');
  const yearSelect = document.getElementById('year-select');

  if (!brandSelect || !modelSelect || !yearSelect) return;

  const brands = [...new Set(cars.map((car) => car.brand))].sort();

  const years = [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a);

  // ===== BRAND =====
  brands.forEach((brand) => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });

  // ===== YEAR =====
  years.forEach((year) => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });

  // ===== BRAND CHANGE → UPDATE MODELS =====
  brandSelect.addEventListener('change', () => {
    const selectedBrand = brandSelect.value;

    modelSelect.innerHTML = `<option value="">Choose a model</option>`;

    if (!selectedBrand) return;

    const models = [
      ...new Set(cars.filter((car) => car.brand === selectedBrand).map((car) => car.model)),
    ];

    models.forEach((model) => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  });

  modelSelect.disabled = true;

  brandSelect.addEventListener('change', () => {
    modelSelect.disabled = false;
  });
}

// ======================
// Latest offers render
// ======================
function renderLatetsOffers() {
  console.log(cars);
  const carGrid = document.getElementById('car-grid');

  if (!carGrid) return;

  carGrid.innerHTML = '';

  const latestCars = cars.slice(0, 6);

  latestCars.forEach((car) => {
    const card = document.createElement('a');

    card.href = `item.html?id=${car.id}`;

    card.className = 'block';

    card.innerHTML = `
      <div class="car-card bg-dark-secondary overflow-hidden group cursor-pointer">

        <div class="car-image relative overflow-hidden aspect-[4/3]">
          <img src="${car.images[0]}" alt="${car.brand} ${car.model}" class="w-full h-full object-cover" />
        </div>

        <div class="p-4 border border-gray-800 border-t-0">

          <div class="flex justify-between items-start mb-2">

            <div>
              <h4 class="text-sm font-medium text-white">
                ${car.brand} ${car.model}
              </h4>

              <p class="text-xs text-gray-500">
                ${car.trim}
              </p>
            </div>

            <span class="text-primary font-montserrat font-bold">
              $${car.price.toLocaleString()}
              <span class="text-xs text-gray-400">/ month</span>
            </span>

          </div>

          <div class="flex items-center gap-3 text-xs text-gray-400 mt-3">
            <span>${car.year}</span>

            <span class="w-1 h-1 bg-gray-600 rounded-full"></span>

            <span>${car.mileage.toLocaleString()} mi</span>
          </div>

        </div>

      </div>
    `;

    carGrid.appendChild(card);
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

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
// Counters
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
  const duration = 1000;
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
// function initScrollAnimations() {
//   const elements = document.querySelectorAll('.fade-in-up');

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('visible');
//           observer.unobserve(entry.target);
//         }
//       });
//     },
//     { threshold: 0.15 },
//   );

//   elements.forEach((el) => observer.observe(el));
// }

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

function initCarFiltering() {}

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
      threshold: 0.1,
      rootMargin: '0px 0px -5% 0px',
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
