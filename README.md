# AI Smart Legal Assistant — 40% Implementation Frontend

**Project Title:** AI Smart Legal Assistant  
**Department:** Computer Science & Software Engineering  
**Institution:** COMSATS University Islamabad, Vehari Campus  
**Academic Level:** 7th Semester — Evaluation 2 (Software Design Document & 40% Implementation)  
**Students:** Zain Ul Abideen (FA23-BSE-127), M Aqib (FA23-BSE-147)  
**Supervisor:** Dr. Syeda Zoupash Zahra  

---

## 1. Overview of 40% Implementation

According to the official **Evaluation 2 SDD Rubrics for Evaluators (Semester 7th)**, 5 marks are dedicated to the **"40% Modules Completion Status"**. This codebase provides the complete, working, interactive frontend for the core 40% modules of the AI Smart Legal Assistant, matching the mockups in **Appendix A (Figures A1 to A5)** and the technical specifications in **Chapter 4 (Software Design Document)**:

| Module | SRS Requirement | SDD Section | Frontend Implementation Status |
| :--- | :--- | :--- | :--- |
| **User Authentication** | FR-1.1, FR-1.2 | Section 4.4.1, Fig A1, A2 | **100% Implemented:** Registration, Login, Role Selector, Bcrypt Hash indicator. |
| **User Dashboard** | FR-1.3 | Section 4.4.1, Fig A3 | **100% Implemented:** Stats overview, Recent Consultations table, Active Statutes list. |
| **AI Legal Chat** | FR-2.1 to FR-2.5 | Section 4.4.2, Fig A4 | **100% Implemented:** Dynamic chat stream, Citation Badges, Collapsible Sources Drawer, Disclaimer Banner, Feedback Rating buttons. |
| **History & Transcripts** | FR-4.1, FR-4.2 | Section 4.4.4, Fig A5 | **100% Implemented:** Searchable history, resume conversation, full transcript modal. |
| **Document Ingestion** | FR-3.1 to FR-3.3 | Section 4.4.3 | **Preview Implemented:** Admin upload zone, collection chunk tables. |

---

## 2. How to Run and Demo the Website

### Option A: Using the Python Server (Recommended)
Open PowerShell or Command Prompt, navigate to this folder, and run:
```bash
python server.py
```
This will automatically launch the website in your browser at `http://localhost:5000/index.html`.

### Option B: Direct Browser Open
Simply double-click `index.html` to open it in Google Chrome, Microsoft Edge, or Mozilla Firefox.

---

## 3. Evaluator Demonstration Walkthrough

When presenting to evaluators:
1. **Dashboard Demo:** Show the clean metrics (14 consultations completed, 8 statutes ingested, 1.8s average latency, 96.4% citation accuracy).
2. **AI Chat Demo:** Click on the suggested chip `⚖️ PPC 302 Murder` or `🚓 FIR under CrPC 154`. Show how:
   - The assistant replies with structured legal provisions.
   - Statutory citation badges (`PPC 1860, Sec. 302`) appear.
   - Clicking **"🔍 View Official Statutory Source Excerpt"** reveals the verbatim text chunk extracted from the legal corpus.
   - Clicking **"👍 Helpful"** or **"👎 Unhelpful"** logs feedback into the audit database.
   - The **Statutory Legal Disclaimer** banner remains visible throughout the consultation.
3. **History Demo:** Go to the **History** tab, type `"FIR"` into the search bar, and show instant client-side filtering and transcript preview.
4. **Auth Demo:** Open the **Sign In** tab, toggle between Sign In and Create Account, showing role selection and security validation.
