// ---- SINGLE-PAGE ROUTER ----
// Every "page" is a <section class="page" id="page-xxx"> inside index.html.
// Nav links use href="#xxx" - clicking them just swaps which section is visible.
const PAGES = ['home', 'about', 'rosters', 'team-list', 'merch', 'partners', 'join'];

function showPage(id) {
    if (!PAGES.includes(id)) id = 'home';

    document.querySelectorAll('.page').forEach(p => {
        p.classList.toggle('active', p.id === 'page-' + id);
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === id);
    });

    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    // Let anything on the newly-shown page (which was display:none and so
    // never got observed while hidden) get its reveal + stagger treatment.
    document.querySelectorAll('#page-' + id + ' .reveal:not(.is-visible)').forEach(el => io.observe(el));
}

function goToPage(id) {
    if (location.hash === '#' + id) {
        showPage(id);
    } else {
        location.hash = id;
    }
}

window.addEventListener('hashchange', () => {
    showPage(location.hash.slice(1) || 'home');
});

document.querySelectorAll('a[data-page]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(a.dataset.page);
    });
});

// Initial page on load (respects a direct link like index.html#merch)
showPage(location.hash.slice(1) || 'home');
