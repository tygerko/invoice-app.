# Error Log & Lessons Learned 📔

Tento dokument slúži na sledovanie technických problémov, chýb a ich riešení počas vývoja aplikácie **invoice-app**.

---

## 🛑 Aktuálne zdokumentované chyby

### 1. GitHub Authentication (PAT)
- **Problém**: Git v termináli odmietal heslo k GitHubu.
- **Príčina**: GitHub zrušil podporu hesiel pre Git operácie v roku 2021. Vyžaduje Personal Access Token (PAT).
- **Riešenie**: Vygenerovaný PAT s rozsahom `repo` a použitý namiesto hesla (alebo v URL: `https://<token>@github.com/...`).

### 2. Preklep v názve repozitára (Double Dot)
- **Problém**: `fatal: repository not found` pri pokuse o push.
- **Príčina**: V URL adrese bol preklep: `invoice-app..git` (dve bodky).
- **Riešenie**: Oprava remote URL pomocou `git remote set-url origin <correct_url>`.

### 3. "Stratené" funkcie po refaktoringu
- **Problém**: Po rozdelení `InvoiceForm.jsx` na menšie komponenty zmizli tlačidlá (Save, G-Drive) a komponent `YodaQuote`.
- **Príčina**: Nová štruktúra komponentov neobsahovala pôvodné JSX pre akcie a importy neboli prenesené.
- **Riešenie**: Vytvorený samostatný `ActionsSection.jsx`, re-importované potrebné knižnice a komponenty.

### 4. Git "Not a repository"
- **Problém**: Príkazy `git push` zlyhávali s chybou `fatal: not a git repository`.
- **Príčina**: Príkazy boli spúšťané v domovskom priečinku (`~`) namiesto priečinka projektu.
- **Riešenie**: Navigácia do správneho priečinka pomocou `cd Documents/work/coding/invoice-app`.

### 5. Opakované zmiznutie QR kódu (Regresia)
- **Problém**: Funkcia/UI pre QR kód opakovane zmizla z rozhrania po zmenách v kóde.
- **Príčina**: Pri refaktoringu alebo veľkých prepisoch komponentov sa pozabudlo na logiku zobrazenia QR kódu.
- **Riešenie**: Dôsledná kontrola `InvoiceForm.jsx` a `InvoicePreview.jsx` po každej zmene. Pridané do checklistu pred nasadením.

---

## 💡 Prevencia do budúcna
- **Refaktoring**: Pred rozbíjaním veľkých súborov vždy skontrolovať zoznam všetkých funkcií (props, state), aby sa na nič nezabudlo.
- **Cesty**: Vždy overiť `pwd` (súčasný priečinok) pred spúšťaním Git príkazov.
- **Verifikácia**: Po každom pushi na GitHub overiť, či Vercel úspešne dokončil "Build".
