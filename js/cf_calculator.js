/**
 * ALSOLVED - Calcolatore Codice Fiscale
 * Standard Algorithm
 */

const CF_CALC = {
    months: {
        1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'H',
        7: 'L', 8: 'M', 9: 'P', 10: 'R', 11: 'S', 12: 'T'
    },
    oddValues: {
        '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
        'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
        'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
        'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
    },
    evenValues: {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
        'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
        'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18,
        'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
    },

    normalize: (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z]/g, "");
    },

    getConsonants: (str) => {
        return str.replace(/[AEIOU]/g, '');
    },

    getVowels: (str) => {
        return str.replace(/[^AEIOU]/g, '');
    },

    calcSurname: (surname) => {
        const s = CF_CALC.normalize(surname);
        const cons = CF_CALC.getConsonants(s);
        const vows = CF_CALC.getVowels(s);
        const res = (cons + vows + "XXX").substring(0, 3);
        return res;
    },

    calcName: (name) => {
        const s = CF_CALC.normalize(name);
        const cons = CF_CALC.getConsonants(s);
        const vows = CF_CALC.getVowels(s);

        if (cons.length >= 4) {
            // First, Third, Fourth consonant
            return cons[0] + cons[2] + cons[3];
        } else {
            return (cons + vows + "XXX").substring(0, 3);
        }
    },

    calcCheckDigit: (cfPartial) => {
        let sum = 0;
        for (let i = 0; i < 15; i++) {
            const char = cfPartial[i];
            if ((i + 1) % 2 !== 0) { // Odd positions (1st, 3rd...) -> Array Index 0, 2...
                sum += CF_CALC.oddValues[char];
            } else {
                sum += CF_CALC.evenValues[char];
            }
        }
        const rem = sum % 26;
        return String.fromCharCode(65 + rem); // 'A' is 65
    },

    compute: (nome, cognome, data, sesso, codiceComune) => {
        if (!nome || !cognome || !data || !sesso || !codiceComune) return null;

        const yy = data.substring(2, 4);
        const mm = parseInt(data.substring(5, 7));
        let dd = parseInt(data.substring(8, 10));

        if (sesso === 'F') dd += 40;
        const ddStr = String(dd).padStart(2, '0');

        const codeSurname = CF_CALC.calcSurname(cognome);
        const codeName = CF_CALC.calcName(nome);
        const codeMonth = CF_CALC.months[mm];

        const partial = codeSurname + codeName + yy + codeMonth + ddStr + codiceComune;
        const check = CF_CALC.calcCheckDigit(partial);

        return partial + check;
    }
};
