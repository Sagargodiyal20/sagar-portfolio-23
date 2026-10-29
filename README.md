# Sagar - Professional Systems & Full-Stack Portfolio

A modern, high-performance developer portfolio specifically tailored to attract **technical recruiters, hiring managers, and engineering leads**. Emphasizes deep foundations in **C and C++ systems programming**, modern **full-stack architecture**, and **collaborative team engineering**.

---

## 🌟 Key Features

1. **Recruiter Fast-Scan Mode (30-Second Screening)**:
   - Dedicated toggle button (`⚡ Recruiter Fast Scan`) that highlights key qualifications, core strengths, and metrics (latency reductions, PR reviews, CI pass rate) for instant screening.
2. **C / C++ Systems Specialization**:
   - Showcases low-level concepts: POSIX threads, memory allocation/safety (Valgrind/ASan clean), epoll sockets, STL, RAII, and algorithmic performance.
3. **Engineering Teamwork & Culture Section**:
   - Dedicated section highlighting peer PR reviews, RFC documentation, agile/scrum workflows, and cross-functional collaboration.
4. **Interactive In-Browser Developer Terminal**:
   - Allows recruiters and engineers to run interactive commands (`help`, `skills`, `projects`, `teamwork`, `run demo.cpp`, `valgrind-check`, `whoami`, `contact`).
5. **Print-Ready & ATS-Friendly Resume Page (`resume.html`)**:
   - Clean, professional one-click printable resume formatted for PDF export and ATS scanning.
6. **Architecture Deep-Dive Modal**:
   - Interactive modal on project cards allowing visitors to inspect technical design and trade-offs.
7. **Dark / Light Theme Toggle**:
   - Fully accessible color schemes with smooth transitions and `localStorage` persistence.
8. **Responsive & Ultra-Lightweight**:
   - 100% vanilla HTML5, CSS3, and modern JavaScript. Zero heavy dependencies, loads instantly.

---

## 📁 Project Structure

```text
c:\Users\animation_lab\Desktop\sagar\
├── index.html       # Main portfolio landing page
├── styles.css       # Responsive CSS design system (Dark & Light modes)
├── app.js           # Interactive terminal, theme toggling, recruiter mode, filtering
├── resume.html      # ATS-friendly, printable one-click PDF resume
└── README.md        # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Open (Easiest)
Simply double-click `index.html` to open it directly in Chrome, Edge, Firefox, or Safari!

### Option 2: Local HTTP Server
Using Python:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

Using Node.js (`npx`):
```bash
npx serve .
```

---

## ✏️ Customizing Your Details

Open `index.html` and `resume.html` in your text editor:
- **Contact Details**: Search and replace `sagar.developer@example.com`, `linkedin.com/in/sagar-dev`, and `github.com/sagar-dev` with your real profile links.
- **Hero & Bio**: Adjust the introduction text in the `#hero` and `#about` sections to match your personal background.
- **Projects**: Replace or add your own project GitHub repositories and live links in the `#projects` section.
- **Experience**: Customize dates, company names, and bullet points in the `#experience` timeline.

---

## 🌐 Free One-Click Deployment

### 1. GitHub Pages
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.

### 2. Vercel
1. Install Vercel CLI (`npm i -g vercel`) or sign in at [vercel.com](https://vercel.com).
2. Run `vercel` in this folder, or import your GitHub repository.
3. Deploys in 10 seconds with free custom domains and HTTPS.

### 3. Netlify
Drag and drop this entire folder into [Netlify Drop](https://app.netlify.com/drop) for instant deployment!

