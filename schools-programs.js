(() => {
  const input = document.querySelector('#school-search');
  const filters = [...document.querySelectorAll('.sp-filter')];
  const cards = [...document.querySelectorAll('.sp-school-card')];
  const count = document.querySelector('#school-results-count');
  const loadMore = document.querySelector('#school-load-more');
  const loadMoreWrap = document.querySelector('#school-load-more-wrap');
  if (!input || !cards.length || !count) return;

  let activeFilter = 'all';
  const batchSize = 3;
  const isLoaded = card => card.dataset.loadHidden !== 'true';

  const update = () => {
    const term = input.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const category = card.dataset.category || '';
      const searchable = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
      const matches = (activeFilter === 'all' || category === activeFilter) && (!term || searchable.includes(term));
      const show = isLoaded(card) && matches;
      card.hidden = !show;
      if (show) visible++;
    });
    count.textContent = `Showing ${visible} ${visible === 1 ? 'pathway' : 'pathways'}`;

    const remaining = cards.filter(card => !isLoaded(card));
    if (loadMoreWrap) loadMoreWrap.hidden = remaining.length === 0;
    if (loadMore) {
      loadMore.disabled = remaining.length === 0;
      loadMore.innerHTML = remaining.length
        ? 'Load more pathways <span aria-hidden="true">＋</span>'
        : 'All pathways shown';
    }

    let empty = document.querySelector('#school-no-results');
    if (!visible) {
      if (!empty) {
        empty = document.createElement('p');
        empty.id = 'school-no-results';
        empty.className = 'sp-no-results';
        empty.textContent = 'No matching pathways. Try another search or choose “All pathways”.';
        count.insertAdjacentElement('afterend', empty);
      }
    } else if (empty) empty.remove();
  };

  input.addEventListener('input', update);
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    update();
  }));

  if (loadMore) loadMore.addEventListener('click', () => {
    const nextCards = cards.filter(card => !isLoaded(card)).slice(0, batchSize);
    nextCards.forEach(card => {
      card.dataset.loadHidden = 'false';
      card.hidden = false;
    });
    update();
  });

  update();
})();
