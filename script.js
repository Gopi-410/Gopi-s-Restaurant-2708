// script.js - search + category filter + smooth scroll

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('menuSearch');
  const menuGrid = document.getElementById('menuGrid');
  const dishes = Array.from(document.querySelectorAll('.dish'));
  const noResults = document.getElementById('noResults');
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

  // Helper: show/hide dish
  function showDish(el, show) {
    el.style.display = show ? '' : 'none';
  }

  // Search handler
  function applySearchAndFilter() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const activeCat = document.querySelector('.filter-btn.active')?.dataset.cat || 'all';

    let visible = 0;
    dishes.forEach(d => {
      const name = d.dataset.name || '';
      const desc = d.dataset.desc || '';
      const cat = d.dataset.cat || 'all';

      const matchesSearch = q === '' || name.includes(q) || desc.includes(q);
      const matchesCat = activeCat === 'all' || cat === activeCat;

      const shouldShow = matchesSearch && matchesCat;
      showDish(d, shouldShow);
      if (shouldShow) visible++;
    });

    noResults.style.display = visible ? 'none' : '';
  }

  // events
  searchInput && searchInput.addEventListener('input', applySearchAndFilter);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applySearchAndFilter();
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // initial run to set state
  applySearchAndFilter();
});
