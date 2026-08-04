// ---- APPLICATION SUBMISSIONS (Discord Webhook) ----
// How to set this up:
// 1. In Discord: Server Settings → Integrations → Webhooks → New Webhook
// 2. Pick the channel applications should land in, copy the Webhook URL
// 3. Paste it below, replacing the placeholder text
const RECRUIT_WEBHOOK_URL = "PASTE_YOUR_RECRUITMENT_DISCORD_WEBHOOK_URL_HERE";
const PARTNER_WEBHOOK_URL = "PASTE_YOUR_PARTNERSHIP_DISCORD_WEBHOOK_URL_HERE";

async function submitToDiscord(webhookUrl, embed, statusEl, submitBtn) {
    if (!webhookUrl || webhookUrl.startsWith("PASTE_YOUR_")) {
        statusEl.textContent = "Applications aren't connected yet - use the Discord option below instead.";
        statusEl.className = "form-status error";
        return;
    }
    statusEl.textContent = "Sending...";
    statusEl.className = "form-status pending";
    if (submitBtn) submitBtn.disabled = true;
    try {
        const res = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ embeds: [embed] })
        });
        if (!res.ok) throw new Error("Webhook responded with an error");
        statusEl.textContent = "Application received! We'll be in touch on Discord.";
        statusEl.className = "form-status success";
        return true;
    } catch (err) {
        statusEl.textContent = "Something went wrong - please try the Discord option below instead.";
        statusEl.className = "form-status error";
        return false;
    } finally {
        if (submitBtn) submitBtn.disabled = false;
    }
}

const recruitForm = document.getElementById('recruit-form');
if (recruitForm) {
    recruitForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const discord = document.getElementById('recruit-discord').value;
        const epic = document.getElementById('recruit-epic').value;
        const age = document.getElementById('recruit-age').value;
        const email = document.getElementById('recruit-email').value;
        const history = document.getElementById('recruit-history').value;
        const statusEl = document.getElementById('recruit-form-status');
        const btn = document.getElementById('recruit-submit-btn');

        const ok = await submitToDiscord(RECRUIT_WEBHOOK_URL, {
            title: "🎮 New Recruitment Application",
            color: 0xa855f7,
            fields: [
                { name: "Discord ID", value: discord || "N/A", inline: true },
                { name: "Epic Games Username", value: epic || "N/A", inline: true },
                { name: "Age", value: age || "N/A", inline: true },
                { name: "Email", value: email || "N/A", inline: true },
                { name: "Competitive History", value: history || "N/A" }
            ],
            timestamp: new Date().toISOString()
        }, statusEl, btn);

        if (ok) recruitForm.reset();
    });
}

// ---- DISCOUNT CODE COPY BUTTON ----
const discountBtn = document.getElementById('discount-code-btn');
if (discountBtn) {
    discountBtn.addEventListener('click', async () => {
        const code = discountBtn.dataset.code;
        const hint = document.getElementById('discount-hint');
        try {
            await navigator.clipboard.writeText(code);
            if (hint) hint.textContent = 'Copied!';
        } catch (err) {
            if (hint) hint.textContent = 'Code: ' + code;
        }
        if (hint) setTimeout(() => { hint.textContent = 'Tap to copy'; }, 2000);
    });
}

const partnerForm = document.getElementById('partner-form');
if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('partner-name').value;
        const contact = document.getElementById('partner-contact').value;
        const message = document.getElementById('partner-message').value;
        const statusEl = document.getElementById('partner-form-status');

        const ok = await submitToDiscord(PARTNER_WEBHOOK_URL, {
            title: "🤝 New Partnership Application",
            color: 0x22d3ee,
            fields: [
                { name: "Brand / Community", value: name || "N/A", inline: true },
                { name: "Contact", value: contact || "N/A", inline: true },
                { name: "Offer", value: message || "N/A" }
            ],
            timestamp: new Date().toISOString()
        }, statusEl, null);

        if (ok) partnerForm.reset();
    });
}
