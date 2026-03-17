// ── Filter Tabs ──────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.tier-section').forEach(section => {
            if (filter === 'all' || section.dataset.tier === filter) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    });
});

// ── Setup Guide Modal ────────────────────────────────────────
let currentGuide = null;
let currentStep = 0;

const guides = {
    prattle: {
        title: 'Prattle Setup Guide',
        steps: [
            {
                heading: 'What you need',
                content: `
                    <p>Prattle converts your voice to text on your desktop. It needs a <strong>speech-to-text API key</strong> to process your audio.</p>
                    <p>Setup takes about 3 minutes. You have a few options depending on your needs.</p>
                `
            },
            {
                heading: 'Choose your API provider',
                content: `
                    <div class="option-card">
                        <h4>Option 1: Deepgram <span class="pro-tag">(Recommended)</span></h4>
                        <p>Best accuracy for real-time dictation. Free tier includes $200 in credits.</p>
                        <ol>
                            <li>Go to <a href="https://console.deepgram.com/signup" target="_blank">console.deepgram.com/signup</a></li>
                            <li>Create a free account</li>
                            <li>Go to <strong>API Keys</strong> in the dashboard</li>
                            <li>Click <strong>"Create Key"</strong> and copy it</li>
                        </ol>
                        <p><span class="pro-tag">Pros:</span> Best accuracy, fast, $200 free credits (~100 hours of audio)</p>
                        <p><span class="con-tag">Cons:</span> Credits eventually run out (then ~$0.0043/min)</p>
                    </div>
                    <div class="option-card">
                        <h4>Option 2: OpenAI Whisper API</h4>
                        <p>Great accuracy, simple pricing.</p>
                        <ol>
                            <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank">platform.openai.com/api-keys</a></li>
                            <li>Create an account and add billing</li>
                            <li>Create a new API key</li>
                        </ol>
                        <p><span class="pro-tag">Pros:</span> Excellent accuracy, well-known provider</p>
                        <p><span class="con-tag">Cons:</span> Requires billing upfront (~$0.006/min), slightly slower</p>
                    </div>
                `
            },
            {
                heading: 'Add the key to Prattle',
                content: `
                    <p>Once you have your API key:</p>
                    <ol>
                        <li>Open Prattle on your Windows PC</li>
                        <li>Click the <strong>Settings</strong> icon (top right)</li>
                        <li>Select your API provider from the dropdown</li>
                        <li>Paste your key and click <strong>Save</strong></li>
                        <li>Done! Click the mic button and start talking.</li>
                    </ol>
                    <p>Your key stays on your computer - Prattle sends audio directly to the API provider you chose, nowhere else.</p>
                `
            }
        ]
    }
};

function openGuide(appId) {
    currentGuide = guides[appId];
    currentStep = 0;
    if (!currentGuide) return;

    document.getElementById('guide-title').textContent = currentGuide.title;
    renderGuideStep();
    document.getElementById('guide-overlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeGuide(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('guide-overlay').classList.add('hidden');
    document.body.style.overflow = '';
    currentGuide = null;
}

function guideStep(delta) {
    if (!currentGuide) return;
    const newStep = currentStep + delta;
    if (newStep < 0 || newStep >= currentGuide.steps.length) return;
    currentStep = newStep;
    renderGuideStep();
}

function renderGuideStep() {
    if (!currentGuide) return;
    const step = currentGuide.steps[currentStep];
    const total = currentGuide.steps.length;

    document.getElementById('guide-content').innerHTML = `
        <div class="guide-step active">
            <h3>${step.heading}</h3>
            ${step.content}
        </div>
    `;

    document.getElementById('guide-progress').textContent = `Step ${currentStep + 1} of ${total}`;
    document.getElementById('guide-prev').style.visibility = currentStep === 0 ? 'hidden' : 'visible';

    const nextBtn = document.getElementById('guide-next');
    if (currentStep === total - 1) {
        nextBtn.textContent = 'Done';
        nextBtn.onclick = () => closeGuide();
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.onclick = () => guideStep(1);
    }
}

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGuide();
});

// ── TicketDeck Bug Widget ───────────────────────────────────────
const TICKETDECK_URL = 'https://dgnikbbugiuuwokwenlm.supabase.co/rest/v1/tickets';
const TICKETDECK_KEY = 'sb_publishable_L2VH13C5NYtdSBoENpoh9Q_d7iJHDOF';
let bugFiles = [];

document.addEventListener('DOMContentLoaded', () => {
    const bugInput = document.getElementById('bug-file-input');
    if (bugInput) {
        bugInput.addEventListener('change', (e) => {
            Array.from(e.target.files).forEach(file => {
                if (!file.type.startsWith('image/')) return;
                if (bugFiles.length >= 3) return;
                bugFiles.push(file);
            });
            renderBugFilePreviews();
            e.target.value = '';
        });
    }
});

function renderBugFilePreviews() {
    const container = document.getElementById('bug-file-previews');
    if (!container) return;
    container.innerHTML = bugFiles.map((file, i) => {
        const url = URL.createObjectURL(file);
        return `<div class="bug-file-preview">
            <img src="${url}" alt="${file.name}">
            <button class="remove-bug-file" onclick="removeBugFile(${i})">&times;</button>
        </div>`;
    }).join('');
}

function removeBugFile(index) {
    bugFiles.splice(index, 1);
    renderBugFilePreviews();
}

function toggleBugPanel() {
    const panel = document.getElementById('bug-panel');
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
        document.getElementById('bug-form').reset();
        bugFiles = [];
        renderBugFilePreviews();
        const status = document.getElementById('bug-status');
        status.classList.add('hidden');
        status.className = 'bug-status-msg hidden';
    }
}

async function submitBugTicket(e) {
    e.preventDefault();
    const btn = document.getElementById('bug-submit-btn');
    const statusEl = document.getElementById('bug-status');
    btn.disabled = true;
    btn.textContent = 'Submitting...';
    statusEl.classList.add('hidden');

    const title = document.getElementById('bug-title').value.trim();
    const description = document.getElementById('bug-desc').value.trim();
    const type = document.getElementById('bug-type').value;
    const priority = document.getElementById('bug-priority').value;

    const attachments = bugFiles.length > 0 ? await filesToBase64(bugFiles) : null;

    const ticket = {
        project: 'workshop',
        type,
        priority,
        title: title.substring(0, 60),
        description: description || title,
        status: 'open',
        tags: ['workshop-widget'],
    };
    if (attachments) ticket.attachments = attachments;

    try {
        const res = await fetch(TICKETDECK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': TICKETDECK_KEY,
                'Authorization': `Bearer ${TICKETDECK_KEY}`,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(ticket)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to submit ticket');
        }
        statusEl.textContent = 'Ticket submitted! Thanks for reporting.';
        statusEl.className = 'bug-status-msg success';
        statusEl.classList.remove('hidden');
        document.getElementById('bug-form').reset();
        bugFiles = [];
        renderBugFilePreviews();
        setTimeout(() => toggleBugPanel(), 2000);
    } catch (err) {
        statusEl.textContent = 'Error: ' + err.message;
        statusEl.className = 'bug-status-msg error';
        statusEl.classList.remove('hidden');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Submit Ticket';
    }
}

async function filesToBase64(files) {
    return Promise.all(files.map(file => fileToBase64(file)));
}

async function fileToBase64(file) {
    const data = await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
    return { name: file.name, type: file.type, size: file.size, data };
}
