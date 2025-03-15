Here's the refined README file:

---

# Smarter Prompt

A Chrome extension that enhances your prompts for AI tools based on different needs.

## Features

- Transform basic prompts into more effective ones.
- Multiple enhancement modes:
  - **Informational:** Clear, factual responses.
  - **Creative:** Storytelling and idea generation.
  - **Concise:** Short and direct answers.
  - **Persuasive:** Convincing arguments.
- Copy enhanced prompts to clipboard with one click.

## Installation

### Development Setup

1. **Clone this repository:**
   ```sh
   git clone https://github.com/Wavxr/Smarter-Prompt.git
   cd smarter-prompt
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file** based on `.env.example` and add your Gemini API key.

4. **Build the extension:**
   ```sh
   npm run build
   ```

5. **Load the extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode**.
   - Click **"Load unpacked"** and select the `dist` folder.

## Development

- **Run development server:**  
  ```sh
  npm run dev
  ```
- **Build extension:**  
  ```sh
  npm run build
  ```
- **Build and prepare extension (Windows):**  
  ```sh
  build-extension.bat
  ```

## Technologies

- **React**
- **Vite**
- **Tailwind CSS 4.0**
- **Google Gemini API**
