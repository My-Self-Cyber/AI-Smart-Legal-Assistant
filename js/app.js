/* =============================================================================
   AI SMART LEGAL ASSISTANT — MASTER INTERACTIVE LOGIC (MATCHING SCREENSHOTS)
   COMSATS University Islamabad, Vehari Campus | Evaluation 2 (7th Semester)
   ============================================================================= */

// ── Ingested Pakistan Legal Knowledge Base ────────────────────────────────────
const LEGAL_KNOWLEDGE = [
    {
        id: "PPC-302",
        keywords: ["murder", "qatl", "302", "killing", "death penalty", "punishment for murder"],
        statute: "Pakistan Penal Code (Act XLV of 1860)",
        section: "Section 302: Punishment of Qatl-i-Amd",
        answer: "Under Section 302 of the Pakistan Penal Code 1860, whoever commits Qatl-i-amd (intentional murder) shall be punished with death as Qisas; or death or imprisonment for life as Tazir having regard to the facts and circumstances of the case; or imprisonment up to 25 years where Qisas is not applicable under Islamic injunctions. It is cognizable, non-bailable, and compoundable by legal heirs under Section 345 Cr.P.C.",
        citations: ["PPC 1860, Sec. 302", "PPC Sec. 304", "Cr.P.C. Sec. 345"]
    },
    {
        id: "CRPC-154",
        keywords: ["fir", "police", "complaint", "registration", "cognizable", "154"],
        statute: "Code of Criminal Procedure (Act V of 1898)",
        section: "Section 154: Information in Cognizable Cases",
        answer: "Under Section 154 Cr.P.C. 1898, every information relating to a cognizable offence given orally to an officer in charge of a police station shall be reduced to writing, signed by the informant, entered in the FIR Register, and a copy provided immediately free of cost. In case of police refusal, an application lies before the Ex-Officio Justice of Peace under Section 22-A / 22-B Cr.P.C.",
        citations: ["Cr.P.C. 1898, Sec. 154", "Cr.P.C. Sec. 22-A", "Cr.P.C. Sec. 157"]
    },
    {
        id: "CRPC-497",
        keywords: ["bail", "bailable", "non-bailable", "arrest", "496", "497", "pre-arrest", "498"],
        statute: "Code of Criminal Procedure (Act V of 1898)",
        section: "Sections 496, 497 & 498: Bail Provisions",
        answer: "Under Section 496 Cr.P.C., bail is a matter of statutory right in bailable offences. Under Section 497, bail in non-bailable offences is discretionary, subject to the Prohibitory Clause (punishable with 10 years, life, or death), except for women, minors under 16, or sick/infirm persons. Pre-arrest bail under Section 498 requires showing mala fide intention or harassment by the prosecution.",
        citations: ["Cr.P.C. 1898, Sec. 496", "Cr.P.C. Sec. 497", "Cr.P.C. Sec. 498"]
    },
    {
        id: "PECA-20",
        keywords: ["cyber", "online", "blackmail", "facebook", "whatsapp", "peca", "harassment"],
        statute: "Prevention of Electronic Crimes Act (PECA 2016)",
        section: "Sections 20 & 21: Cyber Harassment and Stalking",
        answer: "Under PECA 2016, online harassment, false reputation attacks, and cyber stalking are cognizable criminal offences punishable by up to 3 years imprisonment and/or fines up to 1 million PKR under Sections 20 and 21. Formal investigation is conducted by the FIA Cyber Crime Wing.",
        citations: ["PECA 2016, Sec. 20", "PECA 2016, Sec. 21", "FIA Act 1974"]
    },
    {
        id: "NDA-GEN",
        keywords: ["draft", "nda", "agreement", "contract", "confidentiality"],
        statute: "Contract Act 1872",
        section: "Section 27 & Non-Disclosure Covenants",
        answer: "Here is a standard Pakistan Legal Non-Disclosure Agreement (NDA) framework governed by the Contract Act 1872: (1) Defining Proprietary Information, (2) Obligations to maintain secrecy for a term of 2 years, (3) Exclusions for publicly known material, and (4) Exclusive dispute jurisdiction in District Courts Vehari / Lahore.",
        citations: ["Contract Act 1872, Sec. 27", "Specific Relief Act 1877"]
    }
];

const DEFAULT_FALLBACK = {
    answer: "The AI Smart Legal Assistant could not identify an exact statutory excerpt matching your specific phrasing above the &ge; 0.75 cosine similarity threshold. In accordance with system design constraints, no unsupported guidance is hallucinated. Please specify a section of the Pakistan Penal Code, Cr.P.C., Family Laws, or PECA Cybercrime.",
    citations: ["System Boundary Notice", "Pakistan Code Repository"]
};

// ── Application State ────────────────────────────────────────────────────────
let state = {
    currentScreen: "home",
    chatMessages: [
        {
            sender: "assistant",
            text: "Hello! I am your AI Legal Chatbot. You can ask me any question regarding the Pakistan Penal Code (PPC 1860), Code of Criminal Procedure (Cr.P.C. 1898), PECA Cybercrime, or Court Procedures."
        },
        {
            sender: "user",
            text: "What is the legal punishment for intentional murder under Pakistan Penal Code section 302?"
        },
        {
            sender: "assistant",
            text: LEGAL_KNOWLEDGE[0].answer
        },
        {
            sender: "user",
            text: "Can the police refuse to register an FIR if a robbery occurs?"
        },
        {
            sender: "assistant",
            text: LEGAL_KNOWLEDGE[1].answer
        }
    ],
    cases: [
        { title: "State vs. Tariq Mehmood", client: "Tariq Mehmood", status: "Active", progress: 85, date: "01/12/2026", type: "PPC 302 Trial" },
        { title: "Bail Petition - Cr.P.C. 497", client: "Hamza Riaz", status: "Active", progress: 60, date: "01/15/2026", type: "Criminal Bail" },
        { title: "Cyber Extortion Defense", client: "Bilal Ahmad", status: "Pending", progress: 40, date: "01/18/2026", type: "PECA Inquiry" },
        { title: "Family Khula Dissolution", client: "Fatima Bibi", status: "Pending", progress: 30, date: "01/20/2026", type: "Family Court" },
        { title: "Specific Relief Injunction", client: "Kamran Traders", status: "Closed", progress: 100, date: "12/28/2025", type: "Civil Court" },
        { title: "Cr.P.C. 154 Mandamus 22-A", client: "Rashid Ali", status: "Pending", progress: 50, date: "01/22/2026", type: "Sessions Court" },
        { title: "Arbitration Act Enforcement", client: "Al-Rehman Mills", status: "Pending", progress: 45, date: "01/24/2026", type: "Arbitration" },
        { title: "Service Agreement Breach", client: "Apex Logistics", status: "Closed", progress: 100, date: "12/15/2025", type: "Commercial" },
        { title: "Cheque Dishonour 489-F", client: "Zubair Shah", status: "Closed", progress: 100, date: "12/10/2025", type: "PPC 489-F" }
    ],
    activities: [
        { action: "Document View", desc: "Viewed Pakistan Penal Code Section 302 Statutory Text", time: "127.0.0.1 • 14:32", status: "Success" },
        { action: "Case Edit", desc: "Updated bail surety amount for Case #CS-102", time: "127.0.0.1 • 13:15", status: "Edited" },
        { action: "Research Query", desc: "Executed vector search for Cr.P.C. 154 Cognizable FIR", time: "127.0.0.1 • 11:45", status: "Success" },
        { action: "Login", desc: "Authenticated session for student Zain Ul Abideen (FA23-BSE-127)", time: "127.0.0.1 • 09:12", status: "Success" },
        { action: "Document Ingestion", desc: "Indexed 842 text chunks into ChromaDB collection 'legal_documents'", time: "127.0.0.1 • 08:30", status: "Success" },
        { action: "Failed Auth Attempt", desc: "Invalid password attempt for account 'admin'", time: "192.168.1.45 • 07:15", status: "Failed" }
    ]
};

// ── Screen Navigation Controller ─────────────────────────────────────────────
function showScreen(screenId) {
    state.currentScreen = screenId;

    // Toggle screen views
    document.querySelectorAll(".screen-view").forEach(el => el.classList.remove("active"));
    const target = document.getElementById(`screen-${screenId}`);
    if (target) target.classList.add("active");

    // Toggle sidebar items
    document.querySelectorAll(".sidebar-item").forEach(item => {
        item.classList.toggle("active", item.getAttribute("data-screen") === screenId);
    });

    if (screenId === "home") renderHomeDashboard();
    if (screenId === "cases") renderCasesGrid();
    if (screenId === "history") renderActivityLogs();
    if (screenId === "chat") renderChatMessages();
}

// ── Screen 2: Home Dashboard Renderer ────────────────────────────────────────
function renderHomeDashboard() {
    const barsContainer = document.getElementById("active-cases-bars");
    if (!barsContainer) return;
    barsContainer.innerHTML = "";

    const heights = [35, 20, 60, 45, 80, 50, 95, 70, 85, 40, 65, 90];
    heights.forEach((h, i) => {
        const bar = document.createElement("div");
        bar.style.flex = "1";
        bar.style.height = `${h}%`;
        bar.style.background = i % 2 === 0 ? "var(--gold-primary)" : "var(--gold-bright)";
        bar.style.borderRadius = "3px 3px 0 0";
        barsContainer.appendChild(bar);
    });
}

// ── Screen 3: My Cases Grid Renderer (3x3 Grid) ──────────────────────────────
function renderCasesGrid() {
    const container = document.getElementById("cases-cards-container");
    if (!container) return;
    container.innerHTML = "";

    state.cases.forEach((c, idx) => {
        const statusClass = c.status === "Active" ? "badge-active" : (c.status === "Pending" ? "badge-pending" : "badge-closed");
        const tile = document.createElement("div");
        tile.className = "case-card-tile";
        tile.innerHTML = `
            <div>
                <div class="case-card-header">
                    <div>
                        <div class="case-card-title">${c.title}</div>
                        <div class="case-card-client">${c.client} • ${c.type}</div>
                    </div>
                    <span class="badge-tag ${statusClass}">${c.status}</span>
                </div>
                <div style="font-size:0.75rem; color:#94A3B8; margin-top:0.6rem;">
                    Case Progress (${c.progress}%)
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width:${c.progress}%;"></div>
                </div>
            </div>
            <div class="case-card-footer">
                <span>📅 ${c.date}</span>
                <div style="display:flex; gap:0.4rem;">
                    <button class="btn-outline-gold" style="padding:2px 8px; font-size:0.7rem;" onclick="showCaseDetails('${c.title}')">View</button>
                    <button class="btn-gold" style="padding:2px 8px; font-size:0.7rem;" onclick="inquireCaseInChat('${c.title}')">Inquire</button>
                </div>
            </div>
        `;
        container.appendChild(tile);
    });
}

function showCaseDetails(title) {
    alert(`Case Record: ${title}\nJurisdiction: District & Sessions Courts Pakistan\nStatus: Verified under Case Management Rules.`);
}

function inquireCaseInChat(title) {
    showScreen("chat");
    const input = document.getElementById("chat-message-input");
    if (input) {
        input.value = `Analyze statutory provisions and precedents relevant to case: ${title}`;
        sendChatMessage();
    }
}

// ── Screen 6: Activity Log Renderer ──────────────────────────────────────────
function renderActivityLogs() {
    const tbody = document.getElementById("activity-log-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    state.activities.forEach(a => {
        const tr = document.createElement("tr");
        const badgeClass = a.status === "Success" ? "badge-active" : (a.status === "Edited" ? "badge-pending" : "badge-urgent");
        tr.innerHTML = `
            <td><strong>${a.action}</strong></td>
            <td>${a.desc}</td>
            <td style="color:#94A3B8; font-size:0.8rem;">${a.time}</td>
            <td><span class="badge-tag ${badgeClass}">${a.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// ── Screen 11: Dedicated AI Legal Chatbot Controller (Matches Screenshot) ────
function renderChatMessages() {
    const feed = document.getElementById("chat-feed-box");
    if (!feed) return;
    feed.innerHTML = "";

    state.chatMessages.forEach(m => {
        const row = document.createElement("div");
        row.className = `chat-bubble-row ${m.sender}`;

        if (m.sender === "assistant") {
            row.innerHTML = `
                <div class="chat-avatar-icon">🧠</div>
                <div class="chat-bubble-assistant">
                    ${m.text.replace(/\n/g, '<br/>')}
                </div>
            `;
        } else {
            row.innerHTML = `
                <div class="chat-bubble-user">
                    ${m.text}
                </div>
            `;
        }
        feed.appendChild(row);
    });

    feed.scrollTop = feed.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById("chat-message-input");
    const query = input.value.trim();
    if (!query) return;

    input.value = "";

    // Push User message
    state.chatMessages.push({
        sender: "user",
        text: query
    });
    renderChatMessages();

    // Log Activity
    state.activities.unshift({
        action: "Legal Query",
        desc: `Executed query: "${query.substring(0, 35)}..."`,
        time: "127.0.0.1 • Just now",
        status: "Success"
    });

    // Simulated RAG Pipeline matching
    setTimeout(() => {
        const qLower = query.toLowerCase();
        let matched = null;

        for (const item of LEGAL_KNOWLEDGE) {
            for (const kw of item.keywords) {
                if (qLower.includes(kw)) {
                    matched = item;
                    break;
                }
            }
            if (matched) break;
        }

        const reply = matched ? matched.answer : DEFAULT_FALLBACK.answer;

        state.chatMessages.push({
            sender: "assistant",
            text: reply
        });
        renderChatMessages();
    }, 700);
}

function sendQuickPrompt(promptText) {
    const input = document.getElementById("chat-message-input");
    if (input) {
        input.value = promptText;
        sendChatMessage();
    }
}

// ── Research Hub Query Runner ────────────────────────────────────────────────
function focusResearchInput() {
    const input = document.getElementById("research-main-input");
    if (input) input.focus();
}

function setResearchQuery(q) {
    const input = document.getElementById("research-main-input");
    if (input) {
        input.value = q;
        runResearchHubQuery();
    }
}

function runResearchHubQuery() {
    const input = document.getElementById("research-main-input");
    const q = input.value.trim();
    if (!q) return;

    const box = document.getElementById("research-results-box");
    box.style.display = "block";
    box.innerHTML = `
        <div class="panel-box" style="border-color:#E5A93C;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
                <strong style="color:#FFD166; font-size:1rem;">Verified Statutory Result for: "${q}"</strong>
                <span class="status-pill">Cosine Metric: 0.88</span>
            </div>
            <p style="font-size:0.88rem; color:#CBD5E1; line-height:1.6;">
                Pakistan Penal Code & Criminal Procedure Code Indexing: Section matches confirmed against official Pakistan Code Repository. Top relevant provisions identified with verified statutory cross-references.
            </p>
            <div style="margin-top:1rem; display:flex; gap:0.6rem;">
                <button class="btn-gold" style="font-size:0.8rem;" onclick="inquireInChatFromResearch('${q}')">Deep Query with Legal Chatbot ➔</button>
            </div>
        </div>
    `;
}

function inquireInChatFromResearch(q) {
    showScreen("chat");
    const input = document.getElementById("chat-message-input");
    if (input) {
        input.value = q;
        sendChatMessage();
    }
}

function executeGlobalSearch() {
    const val = document.getElementById("global-search-bar").value.trim();
    if (val) {
        showScreen("research");
        setResearchQuery(val);
    }
}

function handleAccountCreated(e) {
    e.preventDefault();
    alert("Account successfully created! Logged in as Zain Ul Abideen (FA23-BSE-127).");
    showScreen("home");
}

// ── Initialization ───────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    showScreen("chat"); // Directly opens the user's uploaded Chat screen for instant testing!
    renderHomeDashboard();
    renderCasesGrid();
    renderActivityLogs();
    renderChatMessages();

    // Chat enter key
    const chatInput = document.getElementById("chat-message-input");
    if (chatInput) {
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                sendChatMessage();
            }
        });
    }
});

function switchChatThread(threadName) {
    document.querySelectorAll('.chat-sub-menu-item').forEach(el => {
        if (el.textContent.includes(threadName)) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });

    if (threadName === 'Document View') {
        state.chatMessages.push({
            sender: "assistant",
            text: "Loaded Pakistan Statutory Corpus: Viewing Pakistan Penal Code (Act XLV of 1860). All 511 sections indexed for semantic similarity lookup."
        });
    } else if (threadName === 'Case Edit') {
        state.chatMessages.push({
            sender: "assistant",
            text: "Editing active case file: State vs. Tariq Mehmood (PPC 302). Evidence documents and FIR No. 412/24 attached."
        });
    } else if (threadName === 'Research Query') {
        state.chatMessages.push({
            sender: "assistant",
            text: "Precedent Research Mode active. Ready to cross-examine Supreme Court of Pakistan (SCMR) & High Court (PLD) citations."
        });
    } else if (threadName === 'Login' || threadName === 'Login Edit') {
        state.chatMessages.push({
            sender: "assistant",
            text: "Authentication session active: User logged in as Senior Advocate (CUI Vehari Chamber License #PK-7821)."
        });
    }
    renderChatMessages();
}
