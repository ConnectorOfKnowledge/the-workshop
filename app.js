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
    cleandictate: {
        title: 'CleanDictate Setup Guide',
        steps: [
            {
                heading: 'What you need',
                content: `
                    <p>CleanDictate uses AI to clean up your voice dictation in real-time. To make it work, you need a <strong>Gemini API key</strong> from Google.</p>
                    <p>Don't worry — it's free for personal use and takes about 2 minutes to set up.</p>
                `
            },
            {
                heading: 'Get your API key',
                content: `
                    <p>You have a couple options for getting a Gemini API key:</p>
                    <div class="option-card">
                        <h4>Option 1: Google AI Studio <span class="pro-tag">(Recommended)</span></h4>
                        <p>Free tier gives you plenty of usage for personal dictation. No credit card required.</p>
                        <ol>
                            <li>Go to <a href="https://aistudio.google.com/apikey" target="_blank">aistudio.google.com/apikey</a></li>
                            <li>Sign in with your Google account</li>
                            <li>Click <strong>"Create API Key"</strong></li>
                            <li>Copy the key — you'll paste it into CleanDictate next</li>
                        </ol>
                        <p><span class="pro-tag">Pros:</span> Free, fast, generous limits for personal use</p>
                        <p><span class="con-tag">Cons:</span> Rate limits may slow down if you dictate for hours straight</p>
                    </div>
                    <div class="option-card">
                        <h4>Option 2: Google Cloud Vertex AI</h4>
                        <p>Pay-as-you-go pricing. Better for heavy usage or if you hit free tier limits.</p>
                        <ol>
                            <li>Go to <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a></li>
                            <li>Enable the Vertex AI API</li>
                            <li>Create an API key under Credentials</li>
                        </ol>
                        <p><span class="pro-tag">Pros:</span> Higher limits, more reliable for heavy use</p>
                        <p><span class="con-tag">Cons:</span> Requires billing setup, costs ~$0.01 per 1000 words</p>
                    </div>
                `
            },
            {
                heading: 'Add the key to CleanDictate',
                content: `
                    <p>Once you have your API key:</p>
                    <ol>
                        <li>Open CleanDictate on your Android device</li>
                        <li>Go to <strong>Settings</strong> (gear icon)</li>
                        <li>Tap <strong>"API Key"</strong></li>
                        <li>Paste your key and tap <strong>Save</strong></li>
                        <li>You're all set! Start dictating in any app.</li>
                    </ol>
                    <p>Your key is stored only on your device — it's never sent anywhere except directly to Google's API.</p>
                `
            }
        ]
    },
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
                    <p>Your key stays on your computer — Prattle sends audio directly to the API provider you chose, nowhere else.</p>
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
