# 🦅 ALSOLVED - Sistema Integrato Onboarding Venditori

> **Versione**: 2.0 (Mobile-Ready & Engineered)
> **Stack**: HTML5, Vanilla JS, Tailwind CSS (CDN), Make.com

## 📖 Panoramica del Progetto
Questo sistema è una suite web completa progettata per **automatizzare e standardizzare** il processo di inserimento (onboarding) dei nuovi consulenti commerciali ALSOLVED.
L'obiettivo è eliminare il "lavoro manuale" di configurazione account e garantire che ogni venditore abbia una presenza digitale (email e firma) professionale e uniforme fin dal primo giorno.

Il sistema si compone di due portali distinti:
1.  **Portale Admin**: Per l'amministrazione, per invitare i candidati.
2.  **Portale Onboarding (Wizard)**: Per i venditori, una guida passo-passo per auto-configurarsi.

---

## 🔄 I Flussi Utente (User Flows)

### 1. Flusso Amministratore (`/Admin`)
Il punto di innesco del processo.
*   **Login**: Accesso protetto da password (hash client-side) in un'interfaccia "Glassmorphism" premium.
*   **Input Dati**: L'admin inserisce Nome, Cognome e Email Personale del candidato.
*   **Automazione**: Al click su "Invia Invito", il sistema:
    1.  Pulisce e formatta i dati (Auto-Capitalizzazione delle iniziali).
    2.  Chiama il Webhook **Make.com** (`admin_invite`).
    3.  L'automazione invia un'email personalizzata al candidato con il link al portale Onboarding.

### 2. Flusso Venditore (`/Onboarding`)
L'esperienza "Self-Service" per il nuovo assunto. Un Wizard interattivo a 5 step:
*   **Step 1: Benvenuto & Dati**: Il venditore conferma i propri dati. Il sistema suggerisce l'email aziendale standard (`nomecognome.alsolved@gmail.com`).
*   **Step 2: Creazione Gmail**: Guida l'utente ad aprire un account Google con credenziali specifiche (mostrate a video e copiabili).
*   **Step 3: Inoltro (Forwarding)**: Tutorial visuale (desktop o mobile) che spiega come impostare l'inoltro automatico delle email verso il CRM centrale.
*   **Step 4: Firma Digitale**:
    *   Genera automaticamente una firma HTML professionale con Logo, Nome, Ruolo e Telefono.
    *   Tutorial visuale su come incollarla nelle impostazioni di Gmail.
*   **Step 5: Attivazione**: Conferma finale. Il sistema invia i dati definitivi al Webhook **Make.com** (`onboarding_submit`) per creare l'utenza nel CRM.

---

## �️ Architettura Tecnica & Ingegnerizzazione

Il progetto è costruito secondo la filosofia **"Serverless Frontend"**. Non richiede un server backend dedicato (Node/PHP), ma "vive" di file statici che orchestrano servizi esterni.

### Core Features
*   **Styling Centralizzato**: Utilizziamo **Tailwind CSS via CDN** configurato dinamicamente tramite `js/config.js`. Questo garantisce coerenza di brand (Colori: *Alsolved Pink*, *Slate 950*) senza build complex.
*   **Configurazione Unica**: Tutte le variabili vitali (URL Webhook, colori, testi base) sono in un unico file `js/config.js`.
*   **Nessuna Dipendenza npm**: Il progetto è "Drag & Drop". Basta copiare la cartella su qualsiasi hosting statico per farlo funzionare.

### Robustezza e Affidabilità (Engineering)
Abbiamo implementato logiche avanzate per prevenire errori umani e tecnici:
1.  **💾 Smart Persistence (localStorage)**:
    *   Il sistema salva lo stato dell'Onboarding ad ogni tasto premuto.
    *   Se l'utente chiude la tab o aggiorna la pagina, **i dati non vanno persi**. Si riparte dallo stesso punto.
2.  **🧹 Data Sanitization (Qualità del Dato)**:
    *   **Nomi**: Auto-capitalizzazione ("mario rossi" → "Mario Rossi").
    *   **Email**: Rimozione caratteri speciali, accenti e spazi ("D'Angelo" → `dangelo`).
    *   **Trim**: Pulizia automatica degli spazi vuoti accidentali (copia-incolla errati).
3.  **📱 Mobile-First Adaptation**:
    *   Rilevamento automatico smartphone.
    *   **Image Swap**: I tutorial passano da screenshot Desktop orizzontali a screenshot Mobile verticali.
    *   **Text Swap**: Le istruzioni cambiano lessico ("Clicca" diventa "Tocca").
4.  **🎨 Aggressive CSS Override**:
    *   Implementato style `!important` sugli input per prevenire che l'autofill dei browser renda il testo invisibile (bianco su bianco).

---

## 📂 Struttura del Repository

```text
/ALSOLVED - Sistema Venditori
│
├── � README.md            # Questa documentazione
│
├── 📁 Admin/               # MODULO AMMINISTRATORE
│   └── index.html          # Interfaccia SPA (Single Page Application) per l'invito.
│
├── 📁 Onboarding/          # MODULO VENDITORE
│   └── index.html          # Wizard a step progressivi. Gestisce tutta la logica venditore.
│
├── 📁 assets/              # RISORSE STATICHE
│   ├── logo.png            # Logo ALSOLVED
│   ├── tutorial_...png     # Screenshot Desktop per le guide Gmail
│   └── ..._mobile.png      # Screenshot Mobile per le guide Gmail
│
└── 📁 js/                  # LOGICA CONDIVISA
    └── config.js           # ⚙️ IL CERVELLO DEL SISTEMA
                            # Contiene URL Webhook, Password Hash, Utility condivise.
```

## 🚀 Guida all'Installazione / Deploy

Essendo un sito statico, il deployment è immediato.

1.  **Hosting**: Caricare l'intera cartella su uno spazio web (es. SiteGround, Netlify, S3).
2.  **Configurazione**:
    *   Aprire `js/config.js`.
    *   Aggiornare `webhooks.admin_invite` e `webhooks.onboarding_submit` con gli URL di produzione Make.com.
3.  **Sicurezza**:
    *   Per cambiare la password dell'Admin, generare una stringa Base64 e aggiornare `security.admin_pwd_hash` in `config.js`.

---

*Progettato e Ingegnerizzato per ALSOLVED.*
