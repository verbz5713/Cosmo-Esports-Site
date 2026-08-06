// ---- TEAM LIST ----
// Add teammates here as you send them over - each entry needs a role, country, and
// a 2-letter ISO country code (used to pull a real flag image, since flag emoji
// don't render as icons on Windows).
// group: used as the sub-heading (e.g. "Founders", "Staff", "Pro Roster", "Academy")
const roster = [
    { name: "Verbz", role: "Founder", country: "Netherlands", code: "nl", group: "Staff Members" },
    { name: "Merokin", role: "Co-Founder", country: "United Kingdom", code: "gb", group: "Staff Members" },
    { name: "Zyncc", role: "Co-Founder", country: "United Kingdom", code: "gb", group: "Staff Members" },
    { name: "Pr3ska7", role: "Administrator", country: "Bulgaria", code: "bg", group: "Staff Members" },
    { name: "Wirzig", role: "Senior Moderator", country: "Germany", code: "de", group: "Staff Members" },
    { name: "A7x", role: "Moderator", country: "Kuwait", code: "kw", group: "Staff Members" },
    { name: "Kapi", role: "Future Player", country: "Poland", code: "pl", group: "Players" },
    { name: "Tigasbamz", role: "Academy Player", country: "Portugal", code: "pt", group: "Players" }
];

function renderRoster() {
    const container = document.getElementById('roster-content');
    const groups = {};
    roster.forEach(m => {
        if (!groups[m.group]) groups[m.group] = [];
        groups[m.group].push(m);
    });

    let html = '';
    Object.keys(groups).forEach(groupName => {
        html += `<div class="roster-group"><div class="roster-group-title">${groupName.toUpperCase()}</div><div class="roster-grid">`;
        groups[groupName].forEach(m => {
            const founderClass = m.role.includes('Founder') ? ' founder' : '';
            html += `
                <div class="roster-card reveal${founderClass}">
                    <img class="roster-flag" src="https://flagcdn.com/48x36/${m.code}.png" srcset="https://flagcdn.com/96x72/${m.code}.png 2x" alt="${m.country} flag" width="32" height="24">
                    <div>
                        <div class="roster-name">${m.name}</div>
                        <div class="roster-role">${m.role}</div>
                        <div class="roster-country">${m.country}</div>
                    </div>
                </div>`;
        });
        html += `</div></div>`;
    });

    // Grinder+ shoutout - too many to list individually, so it gets a banner instead of cards
    html += `
        <div class="roster-group">
            <div class="roster-group-title">GRINDER+</div>
            <div class="roster-placeholder" style="max-width: 600px; margin: 0 auto;">
                150+ Grinder+ members from all over the world - the foundation of Cosmo eSports. 💪
            </div>
        </div>`;

    container.innerHTML = html;

    // Re-run reveal + stagger for the freshly injected cards
    document.querySelectorAll('.roster-grid .roster-card').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.08) + 's';
        io.observe(el);
    });
}
renderRoster();
