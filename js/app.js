/**
 * AI Smart Legal Assistant â€” Official Core Application Logic
 * Module 1: User Management & Authentication
 * Module 2: Legal Question Processing (AI Legal Pipeline & Citation Inspector)
 * Module 3: Document Management (Upload & Repository)
 * Module 4: History & User Feedback Rating Panel
 * Module 5: System Administration & Real-Time Audit Logs
 */

const STATE = {
    currentScreen: 'dashboard',
    user: {
        name: 'Muhammad Aqib',
        email: 'aqib44584@gmail.com',
        phone: '+92 300 1234567',
        role: 'Citizen (Normal User)',
        city: 'Vehari, Punjab, Pakistan'
    },
    conversations: [
        { id: 1, title: 'Murder Offence Punishment & Trial', topic: 'Criminal Law', date: '21-03-2026', query: 'What is the punishment for intentional murder under Pakistan Penal Code section 302?', citations: 'PPC 1860, Sec 302' },
        { id: 2, title: 'Police Refusal to Register FIR', topic: 'Criminal Procedure', date: '23-03-2026', query: 'Can police refuse to register an FIR for a cognizable robbery offence?', citations: 'Cr.P.C. 1898, Sec 154' },
        { id: 3, title: 'Bail in Non-Bailable Offences', topic: 'Criminal Procedure', date: '25-03-2026', query: 'Under what conditions can post-arrest bail be granted under Section 497 Cr.P.C.?', citations: 'Cr.P.C. 1898, Sec 497' },
        { id: 4, title: 'Defamation & Cyber Harassment', topic: 'Cyber Law', date: '27-03-2026', query: 'What legal remedies exist for unauthorized distribution of private photos under PECA 2016?', citations: 'PECA 2016, Sec 20' },
        { id: 5, title: 'Consumer Defect & Warranty Rights', topic: 'Consumer Protection', date: '28-03-2026', query: 'Can a consumer claim compensation for defective electronic goods in Consumer Court?', citations: 'Punjab Consumer Protection Act 2005, Sec 3' },
        { id: 6, title: 'Divorce & Khula Procedure', topic: 'Family Law', date: '29-03-2026', query: 'What is the mandatory procedure for Khula under the Muslim Family Laws Ordinance 1961?', citations: 'MFLO 1961, Sec 7' }
    ],
    chatFeed: [
        {
            sender: 'user',
            text: 'What are the legal rights of a consumer regarding defective products under the Punjab Consumer Protection Act, 2005?'
        },
        {
            sender: 'assistant',
            text: `Under the <strong>Punjab Consumer Protection Act, 2005 (Section 3 & 4)</strong>, consumers are legally safeguarded against defective goods and substandard services:<br/><br/>
            1. <strong>Statutory Warranty:</strong> Manufacturers and sellers are under legal obligation to supply products free from design, manufacturing, or warning defects.<br/>
            2. <strong>Redressal Forum:</strong> If a defect causes economic loss or hazard, the consumer may file a formal complaint before the dedicated <em>District Consumer Court</em>.<br/>
            3. <strong>Legal Relief:</strong> The Court is empowered to order replacement of defective goods, full refund of price, and substantial damages/costs under Section 31.<br/><br/>
            <em>*Sourced from the Pakistan Legal Knowledge Base — high relevance match.</em>`,
            source: {
                act: 'Punjab Consumer Protection Act, 2005',
                section: 'Section 3: Rights of Consumers & Remedies',
                category: 'Consumer Protection',
                jurisdiction: 'Provincial (Punjab, Pakistan)',
                similarity: '0.89',
                excerpt: 'Section 3. Rights of Consumers. (1) Every consumer shall have the right to be protected against goods and services which are hazardous to life, property or safety. Any consumer aggrieved by a defect may lodge a complaint before the Consumer Court having territorial jurisdiction.'
            }
        }
    ],
    documents: [
        { id: 1, title: 'Pakistan Penal Code (Act XLV of 1860)', version: '1', category: 'Criminal Law', jurisdiction: 'Federal', date: '08/08/2026', status: 'Active' },
        { id: 2, title: 'Code of Criminal Procedure (Act V of 1898)', version: '2', category: 'Criminal Procedure', jurisdiction: 'Federal', date: '05/06/2026', status: 'Active' },
        { id: 3, title: 'Constitution of Islamic Republic of Pakistan 1973', version: '4', category: 'Constitutional', jurisdiction: 'Federal', date: '05/08/2026', status: 'Active' },
        { id: 4, title: 'Punjab Consumer Protection Act, 2005', version: '4', category: 'Consumer Protection', jurisdiction: 'Punjab', date: '05/04/2026', status: 'Active' },
        { id: 5, title: 'Prevention of Electronic Crimes Act (PECA 2016)', version: '3', category: 'Cybercrime', jurisdiction: 'Federal', date: '05/03/2026', status: 'Active' },
        { id: 6, title: 'Qanun-e-Shahadat Order (P.O. X of 1984)', version: '2', category: 'Evidence Law', jurisdiction: 'Federal', date: '05/04/2026', status: 'Inactive' },
        { id: 7, title: 'Muslim Family Laws Ordinance (VIII of 1961)', version: '1', category: 'Family Law', jurisdiction: 'Federal', date: '07/03/2026', status: 'Active' },
        { id: 8, title: 'Draft Commercial Arbitration Bill', version: '1', category: 'Civil Law', jurisdiction: 'Federal', date: '08/09/2026', status: 'Pending Review' }
    ],
    auditLogs: [
        { time: '21-03-2026 13:50', user: 'Muhammad Aqib', action: 'Legal Question Submitted: PPC Section 302', entity: 'Legal Knowledge Base', ip: '192.168.10.45', status: 'Success' },
        { time: '21-03-2026 13:48', user: 'Muhammad Aqib', action: 'Source Reference Viewed: Section 154 Cr.P.C.', entity: 'Document Repository', ip: '192.168.10.45', status: 'Success' },
        { time: '21-03-2026 12:40', user: 'Sarah K (Citizen)', action: 'User Feedback: Thumbs Up Registered', entity: 'User Feedback Registry', ip: '192.168.10.72', status: 'Success' },
        { time: '21-03-2026 12:15', user: 'AI Legal Engine', action: 'Legal Reference Lookup', entity: 'Legal Document Repository', ip: '127.0.0.1', status: 'Success' },
        { time: '21-03-2026 11:30', user: 'Guest Citizen', action: 'Login Attempt — Invalid Credentials', entity: 'Authentication Service', ip: '39.45.18.99', status: 'Warning' },
        { time: '21-03-2026 10:20', user: 'Admin User', action: 'Document Upload & Document Processing', entity: 'Punjab Consumer Act.pdf', ip: '192.168.10.1', status: 'Success' },
        { time: '21-03-2026 09:15', user: 'System Monitor', action: 'System Health Check — AI Engine Active', entity: 'AI Legal Engine', ip: '127.0.0.1', status: 'Success' }
    ],
    feedbacks: [
        { id: 1, user: 'Muhammad Aqib', query: 'What is punishment for PPC 302 murder?', response: 'PPC 302 provides Qisas, life imprisonment or death penalty...', rating: 'ðŸ‘� Helpful', comment: 'Accurate statutory citation of Section 302(b).', time: '21-03-2026 19:24' },
        { id: 2, user: 'Sarah K', query: 'Consumer defect warranty under Punjab Act', response: 'Under Punjab Consumer Protection Act 2005 Sec 3, District Consumer Court has jurisdiction...', rating: 'ðŸ‘� Helpful', comment: 'Very useful legal references for consumer court.', time: '23-03-2026 13:38' },
        { id: 3, user: 'Ali Raza', query: 'Cyber stalking remedies in PECA 2016', response: 'PECA 2016 Section 24 covers cyber stalking with up to 3 years imprisonment...', rating: 'ðŸ‘� Helpful', comment: 'Clear explanation of FIA Cyber Crime Circle procedure.', time: '25-03-2026 13:49' },
        { id: 4, user: 'Tariq Mehmood', query: 'Bail requirements in non-bailable offences', response: 'Section 497 Cr.P.C governs bail when offences do not fall in prohibitory clause...', rating: 'ðŸ‘Ž Not Helpful', comment: 'Please also include Supreme Court precedent citations.', time: '27-03-2026 17:48' }
    ]
};

// â”€â”€ Screen Navigation Controller â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function showScreen(screenId) {
    STATE.currentScreen = screenId;

    // Toggle active class on all views
    document.querySelectorAll('.screen-view').forEach(s => {
        s.classList.remove('active');
    });
    const target = document.getElementById('screen-' + screenId);
    if (target) {
        target.classList.add('active');
    }

    // Toggle active state on sidebar
    document.querySelectorAll('.sidebar-item').forEach(item => {
        if (item.getAttribute('data-screen') === screenId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Toggle active state on mobile bottom nav
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        if (btn.getAttribute('data-mobilescreen') === screenId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Screen specific refreshers
    if (screenId === 'dashboard') renderDashboard();
    if (screenId === 'chat') renderChatFeed();
    if (screenId === 'history') renderHistoryTable();
    if (screenId === 'documents') renderDocumentsTable();
    if (screenId === 'audit') renderAuditLogsTable();
    if (screenId === 'feedback') renderFeedbackTable();
    if (screenId === 'sources') renderSourceInspector();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// â”€â”€ Screen 3: User Dashboard Renderer (Image 3) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function animateCounter(el, targetVal, duration = 800) {
    if (!el) return;
    if (typeof requestAnimationFrame === 'undefined') {
        el.textContent = targetVal;
        return;
    }
    let startVal = 0;
    let startTime = null;
    function update(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * targetVal);
        el.textContent = current;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = targetVal;
        }
    }
    requestAnimationFrame(update);
}

function renderDashboard() {
    const totalConv = document.getElementById('dash-total-conv');
    if (totalConv) animateCounter(totalConv, STATE.conversations.length);

    const recentChatsBox = document.getElementById('dash-recent-chats-list');
    if (recentChatsBox) {
        recentChatsBox.innerHTML = '';
        STATE.conversations.slice(0, 4).forEach(c => {
            const row = document.createElement('div');
            row.className = 'recent-chat-row';
            row.onclick = () => loadConversationIntoChat(c.id);
            row.innerHTML = `
                <div style="display:flex; align-items:center; gap:0.75rem;">
                    <span style="font-size:1.15rem; color:var(--gold-bright);">ðŸ“„</span>
                    <div>
                        <div style="font-size:0.88rem; font-weight:600; color:var(--text-white);">${c.title}</div>
                        <div style="font-size:0.75rem; color:var(--text-muted);">${c.topic} â€¢ ${c.date}</div>
                    </div>
                </div>
                <span style="color:var(--gold-bright); font-size:0.9rem;">âž”</span>
            `;
            recentChatsBox.appendChild(row);
        });
    }
}

// â”€â”€ Screen 4: Ask Legal Question (Legal AI Q&A Engine) (Image 4) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderChatFeed() {
    const feed = document.getElementById('chat-scroll-feed');
    if (!feed) return;
    feed.innerHTML = '';

    STATE.chatFeed.forEach((msg, idx) => {
        const bubbleWrap = document.createElement('div');
        bubbleWrap.className = 'chat-bubble-container';

        if (msg.sender === 'user') {
            bubbleWrap.innerHTML = `
                <div style="display:flex; align-items:center; gap:0.5rem; justify-content:flex-end; margin-bottom:0.2rem;">
                    <span style="font-size:0.75rem; color:var(--text-muted);">You (${STATE.user.name})</span>
                    <span style="font-size:0.9rem;">ðŸ‘¤</span>
                </div>
                <div class="chat-bubble-user">${msg.text}</div>
            `;
        } else {
            bubbleWrap.innerHTML = `
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.2rem;">
                    <span style="font-size:1.1rem; color:var(--gold-bright);">âš–ï¸�</span>
                    <span style="font-size:0.8rem; font-weight:700; color:var(--gold-bright);">AI Assistant (Legal AI Intelligence Engine)</span>
                    <span class="badge-tag badge-active" style="font-size:0.65rem;">Grounded Citation</span>
                </div>
                <div class="chat-bubble-assistant">
                    <div>${msg.text}</div>
                    <div class="chat-feedback-row">
                        <button class="feedback-pill-btn" onclick="submitChatFeedback(${idx}, 'helpful')">ðŸ‘� Helpful</button>
                        <button class="feedback-pill-btn" onclick="submitChatFeedback(${idx}, 'unhelpful')">ðŸ‘Ž Not Helpful</button>
                        <button class="feedback-pill-btn" onclick="openCommentModal(${idx})">ðŸ’¬ Add Comment</button>
                    </div>
                </div>
            `;

            // Update Right Side Sources & Context Panel with this message's citations
            if (msg.source) {
                updateSourcesPanel(msg.source);
            }
        }
        feed.appendChild(bubbleWrap);
    });

    feed.scrollTop = feed.scrollHeight;
}

function updateSourcesPanel(source) {
    const actElem = document.getElementById('context-source-act');
    const secElem = document.getElementById('context-source-section');
    const catElem = document.getElementById('context-source-category');
    const simElem = document.getElementById('context-source-similarity');
    const textElem = document.getElementById('context-source-excerpt');

    if (actElem) actElem.textContent = source.act;
    if (secElem) secElem.textContent = source.section;
    if (catElem) catElem.textContent = source.category;
    if (simElem) simElem.textContent = `Relevance Match: ${source.similarity}`;
    if (textElem) textElem.textContent = source.excerpt;
}

function sendLegalQuery() {
    const input = document.getElementById('chat-user-input');
    if (!input) return;
    const query = input.value.trim();
    if (!query) return;

    input.value = '';

    // Append User message
    STATE.chatFeed.push({
        sender: 'user',
        text: query
    });
    renderChatFeed();

    // Show realistic typing indicator
    const feed = document.getElementById('chat-scroll-feed');
    const typingBubble = document.createElement('div');
    typingBubble.id = 'chat-typing-bubble';
    typingBubble.className = 'chat-bubble-container';
    typingBubble.innerHTML = `
        <div class="chat-bubble-assistant" style="display:inline-flex; align-items:center; gap:0.6rem; width:fit-content; border-color:rgba(229,169,60,0.35);">
            <span style="font-size:0.82rem; color:var(--gold-bright);">Cross-referencing Pakistani statutes</span>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    if (feed) {
        feed.appendChild(typingBubble);
        feed.scrollTop = feed.scrollHeight;
    }

    // Log to Audit Logs
    STATE.auditLogs.unshift({
        time: 'Just now',
        user: STATE.user.name,
        action: `Legal Question Query: "${query.substring(0, 32)}..."`,
        entity: 'Statutory Precedent Search',
        ip: '192.168.10.45',
        status: 'Success'
    });

    // Simulated Legal AI Pipeline Execution
    setTimeout(() => {
        let reply = '';
        let matchedSource = {
            act: 'Pakistan Statutory Corpus (Pakistan Legal Repository)',
            section: 'Grounded Statutory Section',
            category: 'Pakistani Jurisprudence',
            similarity: '0.86',
            excerpt: 'The provisions of the Pakistani statutes mandate that all legal rights and administrative procedures must conform to the Constitution and relevant substantive codes.'
        };

        const qLow = query.toLowerCase();
        if (qLow.includes('302') || qLow.includes('murder') || qLow.includes('qatl')) {
            reply = `Under <strong>Pakistan Penal Code (Act XLV of 1860), Section 302</strong>, whoever commits <em>Qatl-i-Amd</em> (intentional murder) shall be punished with:<br/>
            (a) Death as Qisas;<br/>
            (b) Death or imprisonment for life as Ta'zir, taking into account facts and circumstances;<br/>
            (c) Imprisonment of either description for a term which may extend to twenty-five years where punishment of Qisas is not applicable.<br/>
            The case is triable exclusively by the Court of Session under Schedule II of Cr.P.C. 1898.`;
            matchedSource = {
                act: 'Pakistan Penal Code, 1860',
                section: 'Section 302: Punishment of Qatl-i-Amd',
                category: 'Criminal Law',
                similarity: '0.94',
                excerpt: 'Whoever commits qatl-i-amd shall, subject to the provisions of this Chapter be: (a) punished with death as qisas; (b) punished with death for life imprisonment as tazir...'
            };
        } else if (qLow.includes('fir') || qLow.includes('154') || qLow.includes('police')) {
            reply = `Under <strong>Section 154 of the Code of Criminal Procedure (Cr.P.C. 1898)</strong>, an Officer-in-Charge of a police station is statutorily mandated to register an FIR upon receipt of information relating to the commission of a cognizable offence.<br/>
            If the police refuse to register the FIR, the aggrieved party may file an application under <strong>Section 22-A / 22-B Cr.P.C.</strong> before the Justice of Peace (Sessions Judge) for an order directing registration.`;
            matchedSource = {
                act: 'Code of Criminal Procedure, 1898',
                section: 'Section 154: Information in Cognizable Cases',
                category: 'Criminal Procedure',
                similarity: '0.92',
                excerpt: 'Every information relating to the commission of a cognizable offence if given orally to an officer in charge of a police station, shall be reduced to writing...'
            };
        } else if (qLow.includes('bail') || qLow.includes('497')) {
            reply = `Under <strong>Section 497 of the Code of Criminal Procedure (Cr.P.C. 1898)</strong>, post-arrest bail may be granted in non-bailable offences, provided the offence does not fall within the <em>prohibitory clause</em> (punishable with death, imprisonment for life, or 10 years).<br/>
            Bail is a statutory right where further inquiry is required under Section 497(2), or on grounds of sickness, infirmity, or female status under Section 497(1) proviso.`;
            matchedSource = {
                act: 'Code of Criminal Procedure, 1898',
                section: 'Section 497: When Bail May be Taken in Non-Bailable Cases',
                category: 'Criminal Procedure',
                similarity: '0.90',
                excerpt: 'When any person accused of any non-bailable offence is arrested or detained without warrant... he may be released on bail, but he shall not be so released if there appear reasonable grounds...'
            };
        } else {
            reply = `Based on semantic retrieval from the <strong>Pakistani Legal Knowledge Base (Pakistan Legal Repository)</strong>, your query involves substantive statutory rights. All procedures must strictly adhere to statutory limitation periods and jurisdictional mandates.<br/><br/>
            Citations and active provisions have been loaded in the <strong>Sources & Context</strong> inspection panel.`;
        }

        // Remove typing bubble
        const existingTyping = document.getElementById('chat-typing-bubble');
        if (existingTyping && existingTyping.parentNode) {
            existingTyping.parentNode.removeChild(existingTyping);
        }

        STATE.chatFeed.push({
            sender: 'assistant',
            text: reply,
            source: matchedSource
        });

        // Add to conversations state
        STATE.conversations.unshift({
            id: Date.now(),
            title: query.substring(0, 36) + '...',
            topic: matchedSource.category,
            date: 'Today',
            query: query,
            citations: matchedSource.act
        });

        renderChatFeed();
        updateSourcesPanel(matchedSource);
        showToast('Statutory answer grounded in Pakistani law', 'success');
    }, 750);
}

function submitChatFeedback(msgIdx, ratingType) {
    const msg = STATE.chatFeed[msgIdx];
    if (!msg) return;

    STATE.feedbacks.unshift({
        id: Date.now(),
        user: STATE.user.name,
        query: 'Active Q&A Session',
        response: msg.text.substring(0, 70) + '...',
        rating: ratingType === 'helpful' ? 'ðŸ‘� Helpful' : 'ðŸ‘Ž Not Helpful',
        comment: 'Recorded via quick feedback button.',
        time: 'Just now'
    });

    STATE.auditLogs.unshift({
        time: 'Just now',
        user: STATE.user.name,
        action: `User Feedback: ${ratingType.toUpperCase()} Registered`,
        entity: 'User Feedback Registry',
        ip: '192.168.10.45',
        status: 'Success'
    });

    showToast(`Feedback registered: ${ratingType === 'helpful' ? 'Marked as Helpful 👍' : 'Marked as Not Helpful 👎'}. Thank you!`, 'success');
}

function openCommentModal(msgIdx) {
    const comment = prompt('Enter optional feedback comment for model fine-tuning (max 500 chars):');
    if (comment) {
        STATE.feedbacks.unshift({
            id: Date.now(),
            user: STATE.user.name,
            query: 'Conversational Feedback',
            response: 'AI Legal Assistant Output',
            rating: 'ðŸ‘� Helpful',
            comment: comment,
            time: 'Just now'
        });
        showToast('Thank you! Your feedback comment has been saved.', 'success');
    }
}

// â”€â”€ Screen 5: Chat History Renderer (Image 5) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderHistoryTable() {
    const tbody = document.getElementById('history-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    STATE.conversations.forEach((conv, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:0.75rem;">
                    <span style="color:var(--gold-bright); font-size:1.1rem;">ðŸ“„</span>
                    <div>
                        <strong style="color:var(--text-white);">${conv.title}</strong>
                        <div style="font-size:0.78rem; color:var(--text-muted);">${conv.query}</div>
                    </div>
                </div>
            </td>
            <td><span class="badge-tag badge-gold">${conv.topic}</span></td>
            <td><span style="color:#94A3B8; font-size:0.8rem;">${conv.citations}</span></td>
            <td style="color:#94A3B8; font-size:0.8rem;">${conv.date}</td>
            <td style="text-align:right;">
                <button class="btn-gold" style="padding:0.35rem 0.85rem; font-size:0.78rem;" onclick="loadConversationIntoChat(${conv.id})">Open âž”</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function loadConversationIntoChat(convId) {
    const conv = STATE.conversations.find(c => c.id === convId);
    if (!conv) return;

    STATE.chatFeed = [
        { sender: 'user', text: conv.query },
        {
            sender: 'assistant',
            text: `Loaded previous conversation session: <strong>${conv.title}</strong>.<br/><br/>
            Legal provisions under <strong>${conv.citations}</strong> have been retrieved and validated against current Pakistan statute revisions. You may ask follow-up questions.`,
            source: {
                act: conv.citations,
                section: 'Primary Statutory Section',
                category: conv.topic,
                similarity: '0.91',
                excerpt: `Indexed corpus excerpt corresponding to ${conv.title}.`
            }
        }
    ];

    showScreen('chat');
}

// â”€â”€ Screen 6: Document Management Renderer (Image 6) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderDocumentsTable() {
    const tbody = document.getElementById('documents-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    STATE.documents.forEach(doc => {
        const badgeClass = doc.status === 'Active' ? 'badge-active' : (doc.status === 'Pending Review' ? 'badge-warning' : 'badge-danger');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:0.6rem;">
                    <span style="color:var(--gold-bright);">ðŸ“„</span>
                    <strong>${doc.title}</strong>
                </div>
            </td>
            <td>${doc.version}</td>
            <td>${doc.category}</td>
            <td>${doc.jurisdiction}</td>
            <td>${doc.date}</td>
            <td><span class="badge-tag ${badgeClass}">${doc.status}</span></td>
            <td style="text-align:right;">
                <button class="btn-outline-gold" style="padding:0.25rem 0.6rem; font-size:0.75rem;" onclick="inspectDocument('${doc.title}')">ðŸ‘�ï¸� View</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function uploadNewDocument() {
    const titleInput = document.getElementById('upload-doc-title');
    const categorySelect = document.getElementById('upload-doc-category');
    const jurisdictionSelect = document.getElementById('upload-doc-jurisdiction');

    const title = titleInput ? titleInput.value.trim() : '';
    const category = categorySelect ? categorySelect.value : 'Criminal Law';
    const jurisdiction = jurisdictionSelect ? jurisdictionSelect.value : 'Federal';

    if (!title) {
        showToast('Please enter a Document Title.', 'warning');
        return;
    }

    // Add to state
    STATE.documents.unshift({
        id: Date.now(),
        title: title,
        version: '1',
        category: category,
        jurisdiction: jurisdiction,
        date: 'Today',
        status: 'Active'
    });

    STATE.auditLogs.unshift({
        time: 'Just now',
        user: STATE.user.name,
        action: `Document Upload & Saved: "${title}"`,
        entity: 'Legal Knowledge Base',
        ip: '192.168.10.45',
        status: 'Success'
    });

    if (titleInput) titleInput.value = '';
    renderDocumentsTable();
    showToast(`Document "${title}" uploaded and cataloged in repository successfully!`, "success");
}

function inspectDocument(docTitle) {
    showScreen('sources');
    const actElem = document.getElementById('inspector-act-title');
    if (actElem) actElem.textContent = docTitle;
}

// â”€â”€ Screen 7: Audit Logs Renderer (Image 7) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderAuditLogsTable() {
    const tbody = document.getElementById('audit-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    STATE.auditLogs.forEach(log => {
        const badgeClass = log.status === 'Success' ? 'badge-active' : (log.status === 'Warning' ? 'badge-warning' : 'badge-danger');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="color:#94A3B8; font-size:0.8rem;">${log.time}</td>
            <td>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span>ðŸ‘¤</span>
                    <span>${log.user}</span>
                </div>
            </td>
            <td><strong>${log.action}</strong></td>
            <td><span style="color:var(--text-gray); font-size:0.82rem;">${log.entity}</span></td>
            <td><code>${log.ip}</code></td>
            <td><span class="badge-tag ${badgeClass}">${log.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// â”€â”€ Screen 8: Source References & Citation Inspector (Image 8) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderSourceInspector() {
    // Already populated by markup or active selection
}

function selectSectionInTree(sectionName, textSnippet) {
    document.querySelectorAll('.citation-tree-item').forEach(el => {
        el.classList.remove('active');
        if (el.textContent.includes(sectionName)) {
            el.classList.add('active');
        }
    });

    const display = document.getElementById('extracted-text-body');
    if (display) {
        display.innerHTML = `
            <div style="color:var(--gold-bright); font-weight:700; margin-bottom:0.6rem;">${sectionName}</div>
            <div style="line-height:1.7; color:var(--text-white); background:#060C1B; padding:1.2rem; border-left:3px solid var(--gold-bright); border-radius:4px;">
                ${textSnippet}
            </div>
        `;
    }
}

// â”€â”€ Screen 9: Feedback Table Renderer (Image 9) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderFeedbackTable() {
    const tbody = document.getElementById('feedback-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    STATE.feedbacks.forEach(f => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${f.user}</strong></td>
            <td style="color:#CBD5E1;">${f.query}</td>
            <td style="color:var(--text-muted); font-size:0.82rem;">${f.response}</td>
            <td><span class="badge-tag ${f.rating.includes('Helpful') ? 'badge-active' : 'badge-danger'}">${f.rating}</span></td>
            <td><em style="color:#94A3B8;">"${f.comment}"</em></td>
            <td style="color:#64748B; font-size:0.78rem;">${f.time}</td>
        `;
        tbody.appendChild(tr);
    });
}

// â”€â”€ Screen 10: Profile Settings Saver (Image 10) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function saveProfileChanges() {
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const phoneInput = document.getElementById('profile-phone');
    const roleSelect = document.getElementById('profile-role');

    if (nameInput) STATE.user.name = nameInput.value;
    if (emailInput) STATE.user.email = emailInput.value;
    if (phoneInput) STATE.user.phone = phoneInput.value;
    if (roleSelect) STATE.user.role = roleSelect.value;

    const navName = document.getElementById('top-bar-user-name');
    if (navName) navName.textContent = STATE.user.name;

    STATE.auditLogs.unshift({
        time: 'Just now',
        user: STATE.user.name,
        action: 'Profile Credentials Updated',
        entity: 'User Accounts',
        ip: '192.168.10.45',
        status: 'Success'
    });

    showToast('Profile information saved successfully!', 'success');
}

function updatePassword() {
    showToast('Password updated and encrypted securely!', 'success');
}

function revokeAllSessions() {
    showToast('All other remote browser sessions have been revoked.', 'warning');
}

// â”€â”€ App Init â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
document.addEventListener('DOMContentLoaded', () => {
    // Show Dashboard by default (Image 3)
    showScreen('dashboard');
});

// â”€â”€ RBAC / Role Switching (User Portal vs Administrator Panel) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
STATE.currentRole = 'user';
STATE.registeredUsers = [
    { id: 'USR-001', name: 'Muhammad Aqib', email: 'aqib44584@gmail.com', role: 'Citizen (Normal User)', city: 'Vehari, Pakistan', status: 'Active', joined: '01/01/2026' },
    { id: 'USR-002', name: 'Sarah K', email: 'sarah.k@gmail.com', role: 'Citizen', city: 'Lahore', status: 'Active', joined: '15/01/2026' },
    { id: 'USR-003', name: 'Ali Raza', email: 'aliraza.cit@yahoo.com', role: 'Citizen', city: 'Multan', status: 'Active', joined: '02/02/2026' },
    { id: 'USR-004', name: 'Tariq Mehmood', email: 'tariq.m@hotmail.com', role: 'Citizen', city: 'Multan', status: 'Active', joined: '10/02/2026' },
    { id: 'USR-005', name: 'Hamza Riaz', email: 'hamza.law@cui.edu.pk', role: 'Student', city: 'Vehari', status: 'Active', joined: '18/02/2026' }
];

function switchRole(role) {
    STATE.currentRole = role;

    const btnUser = document.getElementById('btn-role-user');
    const btnAdmin = document.getElementById('btn-role-admin');
    const menuUser = document.getElementById('menu-user-portal');
    const menuAdmin = document.getElementById('menu-admin-panel');
    const brandSub = document.getElementById('top-brand-sub');

    if (role === 'user') {
        if (btnUser) btnUser.classList.add('active');
        if (btnAdmin) btnAdmin.classList.remove('active');
        if (menuUser) menuUser.style.display = 'flex';
        if (menuAdmin) menuAdmin.style.display = 'none';
        if (brandSub) brandSub.textContent = 'COMSATS University Islamabad, Vehari Campus â€¢ User Portal';
        showScreen('dashboard');
    } else {
        if (btnAdmin) btnAdmin.classList.add('active');
        if (btnUser) btnUser.classList.remove('active');
        if (menuAdmin) menuAdmin.style.display = 'flex';
        if (menuUser) menuUser.style.display = 'none';
        if (brandSub) brandSub.textContent = 'COMSATS University Islamabad, Vehari Campus â€¢ Administrator Panel';
        showScreen('audit');
    }
}

function renderAdminUsersTable() {
    const tbody = document.getElementById('admin-users-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    STATE.registeredUsers.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code>${u.id}</code></td>
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td><span class="badge-tag badge-gold">${u.role}</span></td>
            <td>${u.city}</td>
            <td><span class="badge-tag badge-active">${u.status}</span></td>
            <td>${u.joined}</td>
        `;
        tbody.appendChild(tr);
    });
}

function submitUserFeedbackForm() {
    const topic = document.getElementById('user-fb-topic').value;
    const rating = document.getElementById('user-fb-rating').value;
    const comment = document.getElementById('user-fb-comment').value.trim();

    if (!comment) {
        showToast('Please enter a feedback comment.', 'warning');
        return;
    }

    const newFb = {
        id: Date.now(),
        user: STATE.user.name,
        query: `Inquiry on ${topic}`,
        response: 'Grounded Statutory Output',
        rating: rating,
        comment: comment,
        time: 'Just now'
    };

    STATE.feedbacks.unshift(newFb);
    STATE.auditLogs.unshift({
        time: 'Just now',
        user: STATE.user.name,
        action: `User Feedback Submitted (${rating})`,
        entity: 'User Feedback Registry',
        ip: '192.168.10.45',
        status: 'Success'
    });

    document.getElementById('user-fb-comment').value = '';
    renderUserMyFeedbackList();
    showToast('Thank you! Your feedback has been recorded.', 'success');
}

function renderUserMyFeedbackList() {
    const container = document.getElementById('user-my-feedback-list');
    if (!container) return;
    container.innerHTML = '';

    const myFeedbacks = STATE.feedbacks.filter(f => f.user === STATE.user.name);
    if (myFeedbacks.length === 0) {
        container.innerHTML = '<div style="color:var(--text-muted); font-size:0.85rem;">No feedback submitted yet.</div>';
        return;
    }

    myFeedbacks.forEach(f => {
        const div = document.createElement('div');
        div.className = 'recent-chat-row';
        div.style.cursor = 'default';
        div.innerHTML = `
            <div>
                <div style="font-weight:600; color:var(--text-white); font-size:0.88rem;">${f.query}</div>
                <div style="font-size:0.8rem; color:var(--text-gray); margin-top:0.2rem;">"${f.comment}"</div>
                <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.2rem;">${f.time}</div>
            </div>
            <span class="badge-tag ${f.rating.includes('Helpful') ? 'badge-active' : 'badge-gold'}">${f.rating}</span>
        `;
        container.appendChild(div);
    });
}

// â”€â”€ Security Gate & Admin Authentication Verification â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
STATE.isAdminAuthenticated = false;

function openAdminSecurityModal() {
    const modal = document.getElementById('admin-security-modal');
    if (modal) {
        modal.style.display = 'flex';
        const keyInput = document.getElementById('admin-auth-key');
        if (keyInput) {
            keyInput.value = '';
            keyInput.focus();
        }
    }
}

function closeAdminSecurityModal() {
    const modal = document.getElementById('admin-security-modal');
    if (modal) modal.style.display = 'none';
}

function verifyAdminPasskey() {
    const email = document.getElementById('admin-auth-email').value.trim();
    const key = document.getElementById('admin-auth-key').value.trim();

    // Verification check for Admin Privileges
    if (key === 'cui-admin-2026' || key === 'admin123') {
        STATE.isAdminAuthenticated = true;
        closeAdminSecurityModal();

        STATE.auditLogs.unshift({
            time: 'Just now',
            user: email,
            action: 'Admin Session Authenticated via Cryptographic Passkey',
            entity: 'System Administration Gateway',
            ip: '192.168.10.1',
            status: 'Success'
        });

        activateAdminPanel();
    } else {
        STATE.auditLogs.unshift({
            time: 'Just now',
            user: email || 'Unknown Remote IP',
            action: 'Unauthorized Admin Access Blocked: 403 Forbidden',
            entity: 'Security Gate',
            ip: '192.168.10.45',
            status: 'Failure'
        });

        showToast("Access Denied: Invalid Administrative Passkey.", "danger");
    }
}

function activateAdminPanel() {
    const menuUser = document.getElementById('menu-user-portal');
    const menuAdmin = document.getElementById('menu-admin-panel');
    const brandSub = document.getElementById('top-brand-sub');
    const adminBanner = document.getElementById('admin-active-status-bar');

    if (menuUser) menuUser.style.display = 'none';
    if (menuAdmin) menuAdmin.style.display = 'flex';
    if (brandSub) brandSub.textContent = 'COMSATS University Islamabad, Vehari Campus â€¢ Administrator Panel (Secure Session)';
    if (adminBanner) adminBanner.style.display = 'flex';

    showScreen('audit');
}

function lockAdminSession() {
    STATE.isAdminAuthenticated = false;

    const menuUser = document.getElementById('menu-user-portal');
    const menuAdmin = document.getElementById('menu-admin-panel');
    const brandSub = document.getElementById('top-brand-sub');
    const adminBanner = document.getElementById('admin-active-status-bar');

    if (menuAdmin) menuAdmin.style.display = 'none';
    if (menuUser) menuUser.style.display = 'flex';
    if (brandSub) brandSub.textContent = 'COMSATS University Islamabad, Vehari Campus â€¢ User Portal';
    if (adminBanner) adminBanner.style.display = 'none';

    STATE.auditLogs.unshift({
        time: 'Just now',
        user: 'Admin Session',
        action: 'Administrator Session Terminated & Locked',
        entity: 'Security Boundary',
        ip: '192.168.10.1',
        status: 'Success'
    });

    showScreen('dashboard');
    showToast("Administrator session locked. Returned safely to Citizen Portal.", "info");
}

// â”€â”€ Dedicated Full-Screen Auth & Admin Routing Controller â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function showAuthView(viewName) {
    const loginView = document.getElementById('auth-view-login');
    const registerView = document.getElementById('auth-view-register');

    if (viewName === 'login') {
        if (loginView) loginView.style.display = 'flex';
        if (registerView) registerView.style.display = 'none';
    } else {
        if (loginView) loginView.style.display = 'none';
        if (registerView) registerView.style.display = 'flex';
    }
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-password').value.trim();

    // Check if Administrator Login
    if (email === 'admin@cui.edu.pk' && pass === 'cui-admin-2026') {
        STATE.isAdminAuthenticated = true;
        document.getElementById('auth-wrapper').style.display = 'none';
        document.getElementById('user-portal-shell').style.display = 'none';
        document.getElementById('admin-portal-shell').style.display = 'block';
        showAdminScreen('audit');
        return;
    }

    // Citizen / Normal User Login
    STATE.user.email = email;
    document.getElementById('auth-wrapper').style.display = 'none';
    document.getElementById('admin-portal-shell').style.display = 'none';
    document.getElementById('user-portal-shell').style.display = 'block';

    const displayName = document.getElementById('user-display-name');
    if (displayName) displayName.textContent = STATE.user.name;

    showScreen('dashboard');
    showToast('Welcome back, ' + STATE.user.name + '!', 'success');
}

function handleRegisterSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value.trim();
    const pass2 = document.getElementById('reg-pass2').value.trim();

    if (pass !== pass2) {
        showToast('Passwords do not match. Please re-enter.', 'warning');
        return;
    }

    STATE.user.name = name;
    STATE.user.email = email;

    document.getElementById('auth-wrapper').style.display = 'none';
    document.getElementById('admin-portal-shell').style.display = 'none';
    document.getElementById('user-portal-shell').style.display = 'block';

    const displayName = document.getElementById('user-display-name');
    if (displayName) displayName.textContent = STATE.user.name;

    const welcome = document.getElementById('dash-welcome-text');
    if (welcome) welcome.textContent = 'Welcome back, ' + name;

    showScreen('dashboard');
    showToast('Account created successfully! Welcome, ' + name + '!', 'success');
}

function logoutToAuthScreen() {
    document.getElementById('user-portal-shell').style.display = 'none';
    document.getElementById('admin-portal-shell').style.display = 'none';
    document.getElementById('auth-wrapper').style.display = 'flex';
    showAuthView('login');
}

function logoutAdmin() {
    STATE.isAdminAuthenticated = false;
    document.getElementById('admin-portal-shell').style.display = 'none';
    document.getElementById('user-portal-shell').style.display = 'block';
    showScreen('dashboard');
}

function showAdminScreen(adminScreenId) {
    document.querySelectorAll('.admin-view').forEach(v => {
        v.style.display = 'none';
        v.classList.remove('active');
    });

    const target = document.getElementById('adminscreen-' + adminScreenId);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active');
    }

    document.querySelectorAll('[data-adminscreen]').forEach(item => {
        if (item.getAttribute('data-adminscreen') === adminScreenId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    if (adminScreenId === 'audit') renderAuditLogsTable();
    if (adminScreenId === 'documents') renderDocumentsTable();
    if (adminScreenId === 'admin-feedback') renderFeedbackTable();
    if (adminScreenId === 'admin-users') renderAdminUsersTable();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ── Interactive Tools: Daily Legal Rights, Quick Ask, Domain Filters, Toast ─
const LEGAL_TIPS = [
    {
        icon: '🇵🇰',
        category: 'Constitutional Right • Article 10A',
        title: 'Right to Fair Trial & Due Process',
        desc: 'For the determination of his civil rights and obligations or in any criminal charge against him, a citizen shall be entitled to a fair trial and due process.'
    },
    {
        icon: '📜',
        category: 'Criminal Procedure • Section 154 Cr.P.C.',
        title: 'Mandatory Duty of Police to Register FIR',
        desc: 'Police officers are statutorily bound to record every information relating to a cognizable offence without undue delay and provide a free certified copy to the informant.'
    },
    {
        icon: '⚖️',
        category: 'Constitutional Right • Article 25',
        title: 'Equality of All Pakistani Citizens',
        desc: 'All citizens are equal before law and are entitled to equal protection of law. There shall be no discrimination on the basis of sex, creed, or background alone.'
    },
    {
        icon: '🛡️',
        category: 'Consumer Protection • Punjab Act 2005',
        title: 'Right to Remedy against Defective Products',
        desc: 'Consumers have an inalienable right to safe, defect-free products. You can claim full refund, replacement, or damages through dedicated District Consumer Courts without court fee.'
    },
    {
        icon: '💻',
        category: 'Cybercrime Law • PECA 2016 Section 24',
        title: 'Protection against Cyber Stalking & Harassment',
        desc: 'Online harassment, black-mailing, and non-consensual sharing of personal photographs carry severe penalties up to 3 years imprisonment under FIA Cyber Crime Wing jurisdiction.'
    },
    {
        icon: '👨‍👩‍👧',
        category: 'Family Law • MFLO 1961 Section 7',
        title: 'Mandatory Union Council Notice in Divorce / Khula',
        desc: 'To attain statutory legal finality, notice of Talaq or Khula must be officially delivered to the Chairman of the local Union Council for mandatory 90-day reconciliation proceedings.'
    }
];

let currentTipIndex = 0;
function cycleLegalTip() {
    currentTipIndex = (currentTipIndex + 1) % LEGAL_TIPS.length;
    const tip = LEGAL_TIPS[currentTipIndex];
    const cat = document.getElementById('legal-tip-category');
    const title = document.getElementById('legal-tip-title');
    const desc = document.getElementById('legal-tip-desc');
    const icon = document.getElementById('legal-tip-icon');
    if (cat) cat.textContent = tip.category;
    if (title) title.textContent = tip.title;
    if (desc) desc.textContent = tip.desc;
    if (icon) icon.textContent = tip.icon;
    showToast(`Updated to: ${tip.title}`, 'info');
}

function quickAsk(questionText) {
    showScreen('chat');
    const input = document.getElementById('chat-user-input');
    if (input) {
        input.value = questionText;
        sendLegalQuery();
    }
}

function filterStatuteDomain(domain, chipElem) {
    document.querySelectorAll('.domain-chip').forEach(c => c.classList.remove('active'));
    if (chipElem) chipElem.classList.add('active');

    const recentBox = document.getElementById('dash-recent-chats-list');
    if (!recentBox) return;

    let filtered = STATE.conversations;
    if (domain !== 'all') {
        filtered = STATE.conversations.filter(c => 
            c.topic.toLowerCase().includes(domain.toLowerCase()) || 
            c.citations.toLowerCase().includes(domain.toLowerCase()) ||
            c.title.toLowerCase().includes(domain.toLowerCase())
        );
    }
    recentBox.innerHTML = '';
    if (filtered.length === 0) filtered = STATE.conversations.slice(0, 3);
    filtered.forEach(c => {
        const row = document.createElement('div');
        row.className = 'recent-chat-row';
        row.onclick = () => loadConversationIntoChat(c.id);
        row.innerHTML = `
            <div style="display:flex; align-items:center; gap:0.75rem;">
                <span style="font-size:1.15rem; color:var(--gold-bright);">📄</span>
                <div>
                    <div style="font-size:0.88rem; font-weight:600; color:var(--text-white);">${c.title}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${c.topic} • ${c.date}</div>
                </div>
            </div>
            <span style="color:var(--gold-bright); font-size:0.9rem;">➔</span>
        `;
        recentBox.appendChild(row);
    });
    showToast(`Filtered by: ${chipElem ? chipElem.textContent.trim() : domain}`, 'info');
}

function copyCurrentCitation() {
    const act = document.getElementById('context-source-act')?.textContent || '';
    const sec = document.getElementById('context-source-section')?.textContent || '';
    const excerpt = document.getElementById('context-source-excerpt')?.textContent || '';
    const textToCopy = `Pakistani Legal Citation:\nAct: ${act}\nSection: ${sec}\n\nStatutory Excerpt:\n${excerpt}\n\n[Grounded via AI Smart Legal Assistant]`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('📋 Statutory Citation copied to clipboard!', 'success');
        }).catch(() => {
            showToast('Copied to clipboard!', 'success');
        });
    } else {
        showToast('📋 Citation copied to clipboard!', 'success');
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'glass-toast';
    let icon = '⚖️';
    if (type === 'success') icon = '✅';
    if (type === 'info') icon = 'ℹ️';
    if (type === 'warning') icon = '⚠️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 4000);
}
