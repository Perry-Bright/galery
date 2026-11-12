# Maison Alisa — How to Add Your Photos & Deploy to GitHub Pages

## 1. Where Your Photos Live (After-Only Exhibition)
Your exhibition photos are stored inside `src/assets/images/` and bundled automatically by Vite:
- `src/assets/images/after-main.jpg` — Main centerpiece portrait (shown first)
- `src/assets/images/after-1.jpg` — Gallery slider plate 1
- `src/assets/images/after-2.jpg` — Gallery slider plate 2
- `src/assets/images/after-3.jpg` — Gallery slider plate 3

To swap any photo later, replace the `.jpg` file in `src/assets/images/` (or add new ones and import them in `src/config/revealConfig.ts`).

## 2. Where to Customize Alisa's Quiz Answers
Open `src/config/revealConfig.ts` and edit the `IDENTITY_QUESTIONS` array if you want to add more accepted phrasings:
- Question 1 (`first-kiss`): Already configured for **Oct 25** (`Oct 25`, `October 25`, `25.10`, `10/25`, `25 октября`).
- Question 2 (`first-name-a`): Already configured for **Alemmbom**.
- Question 3 (`last-travel`): Already configured for your 1-day trip to **Zelenogorsk** in both Latin and Russian (`Zelenogorsk`, `Зеленогорск`, `в Зеленогорске`).

## 3. One-Time GitHub Pages Deployment Setup
You only have to set this up **once**:
1. Push this entire project to a GitHub repository (branch `main` or `master`).
2. In your GitHub repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. That's it! Every time you push to `main` (including when you add your photos), `.github/workflows/deploy.yml` automatically builds and publishes the live website.
