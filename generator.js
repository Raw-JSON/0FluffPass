// generator.js - Core Logic for 0FluffPass

// --- CONFIGURATION CONSTANTS ---
const CHAR_SETS = {
    LOWER: 'abcdefghijklmnopqrstuvwxyz',
    UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    NUMBERS: '0123456789',
    SYMBOLS: '!@#$%^&*()-_+=[]{}|;:,.<>?/~`'
};

// --- DOM ELEMENTS ---
const elements = {
    display: document.getElementById('password-display'),
    lengthSlider: document.getElementById('length-slider'),
    lengthValue: document.getElementById('length-value'),
    generateBtn: document.getElementById('generate-button'),
    copyBtn: document.getElementById('copy-button'),
    upperCheck: document.getElementById('include-uppercase'),
    lowerCheck: document.getElementById('include-lowercase'),
    numberCheck: document.getElementById('include-numbers'),
    symbolCheck: document.getElementById('include-symbols')
};

// --- CORE GENERATION LOGIC ---

/**
 * Generates a cryptographically strong password based on current UI settings.
 * The What: Assembles the character set and uses window.crypto.getRandomValues to pick random indices.
 * The Why: window.crypto.getRandomValues is mandatory for security. It generates true cryptographically
 * secure pseudo-random numbers, unlike Math.random().
 */
function generatePassword() {
    let charSet = '';
    const length = parseInt(elements.lengthSlider.value, 10);

    // 1. Assemble the Character Set (0Fluff Modular Check)
    if (elements.lowerCheck.checked) charSet += CHAR_SETS.LOWER;
    if (elements.upperCheck.checked) charSet += CHAR_SETS.UPPER;
    if (elements.numberCheck.checked) charSet += CHAR_SETS.NUMBERS;
    if (elements.symbolCheck.checked) charSet += CHAR_SETS.SYMBOLS;

    // Architectural integrity check: Ensure at least one set is selected
    if (charSet.length === 0) {
        elements.display.textContent = 'ERROR: Select at least one character set.';
        return;
    }
    
    // 2. Generate Random Bytes
    // We create an array of random bytes large enough for the desired length.
    const randomBytes = new Uint32Array(length);
    window.crypto.getRandomValues(randomBytes);

    let password = '';
    const charSetLength = charSet.length;

    // 3. Map Random Bytes to Character Set Indices
    for (let i = 0; i < length; i++) {
        // Architectural efficiency: Use the modulus operator to map the random number 
        // to a valid index within the character set length.
        const randomIndex = randomBytes[i] % charSetLength;
        password += charSet.charAt(randomIndex);
    }

    elements.display.textContent = password;
}

// --- UTILITY FUNCTIONS ---

/**
 * Copies the generated password to the clipboard.
 * The What: Uses the modern Clipboard API (navigator.clipboard) for non-blocking copying.
 * The Why: The Clipboard API is asynchronous and cleaner than old execCommand() hacks. 
 * It provides a better, less invasive user experience.
 */
function copyToClipboard() {
    const password = elements.display.textContent;

    if (password === 'Click \'Generate\' to begin' || password.startsWith('ERROR')) {
        return;
    }

    if (navigator.clipboard) {
        navigator.clipboard.writeText(password).then(() => {
            elements.copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                elements.copyBtn.textContent = 'Copy';
            }, 1500);
        }).catch(err => {
            console.error('Copy failed:', err);
            elements.copyBtn.textContent = 'Failed';
        });
    } else {
        // Fallback for older browsers (not strictly 0Fluff, but necessary for compatibility edge cases)
        const textarea = document.createElement('textarea');
        textarea.value = password;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            elements.copyBtn.textContent = 'Copied!';
            setTimeout(() => { elements.copyBtn.textContent = 'Copy'; }, 1500);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textarea);
    }
}

// --- EVENT HANDLERS ---

/**
 * Updates the displayed length value when the slider moves.
 */
function handleLengthChange() {
    elements.lengthValue.textContent = elements.lengthSlider.value;
}

/**
 * Initial generation and event listener setup.
 */
function init() {
    // Set initial length value
    handleLengthChange();

    // Event listeners for user interaction
    elements.lengthSlider.addEventListener('input', handleLengthChange);
    elements.generateBtn.addEventListener('click', generatePassword);
    elements.copyBtn.addEventListener('click', copyToClipboard);

    // Initial password generation for immediate use
    generatePassword(); 
}

// Kick off the application logic
document.addEventListener('DOMContentLoaded', init);
