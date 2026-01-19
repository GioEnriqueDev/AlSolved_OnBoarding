const ALSOLVED_CONFIG = {
    webhooks: {
        admin_invite: 'https://hook.eu1.make.com/gxjldskzhdxsk2j9c09zmigp93m2dam3', // Admin -> Invite
        onboarding_submit: 'https://hook.eu1.make.com/poxojxs1mtjy60l396jddgiq24xj3vjo', // Onboarding -> Submit
    },
    colors: {
        pink: '#d946ef',
        pink_hover: '#c026d3',
        success: '#22c55e',
        error: '#ef4444'
    },
    security: {
        // Base64 of 'giopolimenidev' - Consider moving this logic to backend for real security
        admin_pwd_hash: 'Z2lvcG9saW1lbmlkZXY='
    },
    /**
     * Tenta di copiare il testo nella clipboard usando API moderna + fallback
     * @param {string} text - Testo semplice
     * @param {string} html - (Opzionale) Contenuto HTML (es. firma)
     * @returns {Promise<boolean>}
     */
    copyToClipboard: async (text, html = null) => {
        try {
            if (navigator.clipboard) {
                if (html) {
                    const blobHtml = new Blob([html], { type: "text/html" });
                    const blobText = new Blob([text], { type: "text/plain" });
                    const data = [new ClipboardItem({ ["text/html"]: blobHtml, ["text/plain"]: blobText })];
                    await navigator.clipboard.write(data);
                } else {
                    await navigator.clipboard.writeText(text);
                }
                return true;
            } else {
                throw new Error("Clipboard API not available");
            }
        } catch (err) {
            console.warn("Clipboard API failed, trying execCommand", err);
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";  // Avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                return successful;
            } catch (err) {
                document.body.removeChild(textArea);
                console.error('Fallback verify failed', err);
                return false;
            }
        }
    }
};

// Configurazione Tailwind per CDN (Fallback se la build locale fallisce)
// Permette di centralizzare i colori anche usando la CDN
if (typeof window !== 'undefined') {
    window.tailwind = {
        config: {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
                    },
                    colors: {
                        alsolved: {
                            dark: '#0f172a',
                            darker: '#020617',
                            surface: '#1e293b',
                            pink: ALSOLVED_CONFIG.colors.pink,
                            pink_hover: ALSOLVED_CONFIG.colors.pink_hover,
                            accent: '#8b5cf6',
                        }
                    },
                    boxShadow: {
                        'glow': '0 0 20px -5px rgba(217, 70, 239, 0.3)',
                    }
                }
            }
        }
    };
}
