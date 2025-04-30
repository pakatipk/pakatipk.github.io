## 🚩 Project Milestones

1. **Portfolio Homepage (HTML / CSS / JS)**
   - Static landing page: `index.html`  
   - Bilingual resumes: `resume_en.html`, `resume_jp.html`  
   - Shared styles & scripts: `styles.css`, `script.js`  
   - Hosted on GitHub Pages as the main site

2. **Authentication Layer (HTML + Render.com)**
   - Login page: `login.html` (Bootstrap, Font Awesome, Google Fonts)  
   - Vanilla JS for dark-mode toggle, form validation, and `fetch` to auth API on Render.com  
   - Stores JWT in `localStorage` and redirects to the dashboard on success

3. **“My Dashboard” React App (Vite + TypeScript)**
   - Task Manager UI built with React hooks and component state  
   - Client-side routing gated by successful login  
   - Vite configured for dev vs. prod (`build.outDir: 'mydashboard'`, `base: '/mydashboard/'`)  
   - CI/CD pipeline with GitHub Actions → publishes to GitHub Pages at `/mydashboard/`  
   - Repository-dispatch flow keeps the user-site repo in sync with the latest build
