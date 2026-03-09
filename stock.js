function initCatalogPagination() {
  const items = document.querySelectorAll('.catalog-item');
  const pagination = document.getElementById('pagination');

  if (!items.length) return;

  const perPage = 9;
  const pages = Math.ceil(items.length / perPage);
  let currentPage = 1;

  function showPage(page, scroll = true) {
    currentPage = page;

    items.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * perPage && index < page * perPage ? 'block' : 'none';
    });

    renderPagination();

    if (!scroll) return;

    const catalog = document.getElementById('catalog-content_section');

    if (catalog) {
      const y = catalog.getBoundingClientRect().top + window.scrollY - 130;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  }

  function renderPagination() {
    pagination.innerHTML = '';

    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement('button');

      btn.innerText = i;

      btn.className =
        'px-4 py-2 text-xs text-gray-400 border border-gray-300 hover:bg-red-500 hover:text-white transition';

      if (i === currentPage) {
        btn.classList.add('bg-red-500', 'text-white', 'border-primary');
      }

      btn.addEventListener('click', () => showPage(i));

      pagination.appendChild(btn);
    }
  }

  showPage(1, false);
}

document.addEventListener('DOMContentLoaded', initCatalogPagination);
