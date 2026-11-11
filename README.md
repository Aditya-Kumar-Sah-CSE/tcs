# TCS 30-Day Preparation Tracker

A modern, lightweight, animated **TCS 30-Day Preparation Tracker** designed for students and graduates preparing for the **TCS NQT (National Qualifier Test)**, Digital, and Prime placement tracks.

Built with pure vanilla web technologies: **HTML5, CSS3, and Vanilla JavaScript**. No frameworks, no build step, no backend, no databases, and zero external paid dependencies. Simply open `index.html` in any browser or deploy directly to GitHub Pages.

---

## ✨ Features

- **30-Day Curated Curriculum with Verified Direct Links**:
  - **Direct YouTube Video Lessons**: Exact video links (`https://www.youtube.com/watch?v=...`) directly to Yash Jain Sir (Knowledge Gate) & GeeksforGeeks masterclasses (no generic playlist links).
  - **Question-Wise IndiaBix Practice**: Detailed question-by-question breakdown with individual checkboxes, difficulty badges (Easy / Medium / Hard), and direct question links (`https://www.indiabix.com/aptitude/problems-on-numbers/001001` - `001020`).
  - **GeeksforGeeks Problem Solves**: Direct problem links for all daily coding tasks (GCD, Prime, LCM, Fibonacci, Sum of Array, Largest Element, Reverse Array, Second Largest, Kadane's, Anagrams, etc.).
  - **System Default Browser (Brave) Integration**: External links open with `target="_blank" rel="noopener noreferrer"`, routing directly to your preferred browser.
- **Linear & Notion Inspired UI**:
  - Glassmorphism dark theme by default with high-contrast accent colors
  - Optional clean light mode with persistent toggle
  - Micro-interactions, hover card depth, and smooth animations
  - Animated SVG circular progress ring
- **Gamification & Rewards Engine**:
  - XP counter (+10 XP per task, +50 XP per day completion, +150 XP per week)
  - 8-level progression system (Beginner → Learner → Achiever → Scholar → Expert → Master → Champion → Legend)
  - 15 unlockable achievement badges
  - Daily study streak counter
  - Celebration confetti on completing daily milestones
- **Dedicated Coding Problem Tracker**:
  - Log DSA problems with topic, difficulty (Easy, Medium, Hard), time taken, and status (Solved, Attempted, Pending)
  - Filter by topic and difficulty breakdown
- **Personal Notes & Formula Book**:
  - Per-day notes area with automatic debounced saving to `localStorage`
- **100% Client-Side Persistence**:
  - Real-time save to browser `localStorage`
  - Export progress to JSON backup
  - Import / restore progress from backup
  - Individual day reset & total progress reset with confirmation dialogs
- **Responsive & Mobile-First**:
  - Optimized drawer sidebar and touch-friendly controls for tablets and mobile devices

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Structure** | Semantic HTML5 |
| **Styling** | Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism, 3D Transforms) |
| **Logic** | Modular Vanilla JavaScript (ES6+, zero bundler or build steps required) |
| **Storage** | Browser `localStorage` API |
| **Icons** | [Lucide Icons](https://lucide.dev/) (via lightweight CDN) |
| **Typography** | [Inter & Outfit](https://fonts.google.com/) (Google Fonts CDN) |

---

## 🚀 Quick Start (Local)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/Aditya-Kumar-Sah-CSE/tcs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tcs
   ```
3. Open `index.html` directly in your favorite web browser (double-click the file or run):
   ```bash
   start index.html
   ```

No `npm install`, Node.js, or local server required!

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

Deploy the live tracker directly from your repository in seconds:

1. **Create Repository & Push**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete TCS 30-Day Preparation Tracker"
   git branch -M main
   git remote add origin https://github.com/Aditya-Kumar-Sah-CSE/tcs.git
   git push -u origin main
   ```

2. **Configure GitHub Pages**:
   - Open your GitHub repository in your browser: `https://github.com/Aditya-Kumar-Sah-CSE/tcs`
   - Click on the **Settings** tab.
   - On the left sidebar, click **Pages** (under the "Code and automation" section).
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`.
     - **Branch**: Select `main` and set the folder to `/(root)`.
   - Click **Save**.

3. **Access Your Live Site**:
   - Wait 1–2 minutes for GitHub Actions to build and deploy.
   - Your live website will be available at:
     ```
     https://aditya-kumar-sah-cse.github.io/tcs/
     ```

---

## 📁 Project Architecture

```
tcs/
├── index.html            # Main Single-Page Application entry point
├── css/
│   ├── style.css         # Glassmorphism, design system, theme variables & animations
│   └── responsive.css    # Mobile drawer, tablet grids & responsive media queries
├── js/
│   ├── data.js           # 30-Day curriculum, lecture playlists, practice links & achievements
│   ├── storage.js        # LocalStorage persistence, sanitation, export & import engine
│   ├── rewards.js        # Gamification engine: XP calculations, levels, streaks & badges
│   ├── tracker.js        # Dedicated coding problem logger & DSA metrics
│   └── app.js            # Router, dynamic page rendering, modals, toast & confetti
├── assets/
│   └── favicon.svg       # Custom SVG emblem favicon
└── README.md             # Project documentation and deployment guide
```

---

## 📚 Study Resources Credited

- **Knowledge Gate (Yash Jain Sir)**:
  - [Quantitative Aptitude Playlist](https://www.youtube.com/playlist?list=PLMufDeLh5x2Aaig0ZieDTUsKSmvmz1RBN)
  - [Logical Reasoning Playlist](https://www.youtube.com/playlist?list=PLMufDeLh5x2DOOasdL69Fgi7gxJTv_Vfu)
  - [Verbal Ability Playlist](https://www.youtube.com/playlist?list=PLMufDeLh5x2BWYJy0ldl6vgrQ4nZm1Qap)
  - [Coding Preparation Playlist](https://www.youtube.com/playlist?list=PLMufDeLh5x2ApQeIViNxGl3jSnSbobEd2)
  - [TCS Previous Year Questions](https://www.youtube.com/playlist?list=PLMufDeLh5x2A7_klsrgfogBTtDr80OuL-)
- **Practice Platforms**: [IndiaBix](https://www.indiabix.com/), [PrepInsta](https://prepinsta.com/tcs/), [GeeksforGeeks](https://www.geeksforgeeks.org/), [LeetCode](https://leetcode.com/), [HackerRank](https://www.hackerrank.com/), [Take U Forward](https://takeuforward.org/)

---

## 📄 License

This project is created for personal preparation and educational purposes. Free to use and customize!

