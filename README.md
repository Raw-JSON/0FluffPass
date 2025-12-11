# 0FluffPass 🔑

> 0FluffPass is a zero-dependency, client-side cryptographic password generator built entirely with Vanilla JS, focused on speed, transparency, and minimal code footprint.

---

## 🔥 Key Features

* **Zero-Dependency Core:** Runs on pure, modern Vanilla JavaScript (ES6+).
* **Client-Side Integrity:** The password generation process never touches a server.
* **Cryptographic Randomness:** Leverages `window.crypto.getRandomValues()` for high-quality entropy.
* **Configurable:** Simple UI controls for length, character sets (uppercase, lowercase, numbers, symbols).
* **Minimal Footprint:** The entire logic is contained in a single, well-commented JS file.

---

## 🏗 Architectural Integrity

**The 0Fluff Rule:** This project strictly adheres to a **no-bloat** philosophy.

* **No Frameworks:** No React, Vue, or Angular.
* **No External Libraries:** No Lodash, JQuery, or bulky utilities.
* **Transparent Logic:** The core algorithm is clearly documented and visible for security auditing.

We chose to use the Web Crypto API's `crypto.getRandomValues()` because it is the **most robust** source of entropy available to the browser, ensuring the generated passwords are cryptographically strong without requiring a network request.

---

## ⚙️ Technical Blueprint

* **HTML:** `index.html` (The UI Shell)
* **CSS:** `style.css` (Minimal styling for readability and function)
* **JS:** `generator.js` (The core logic for generation and DOM manipulation)

---

## 📄 License
[MIT License](LICENSE)

---


