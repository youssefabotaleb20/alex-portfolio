# Alex Rivera — demo developer portfolio

A one-page portfolio for a fictional developer, Alex Rivera, built as a showcase of motion-heavy front-end work.

**Live demo:** https://youssefabotaleb20.github.io/alex-portfolio/

Part of [Youssef Abotaleb's portfolio](https://youssefabotaleb20.github.io/Portfolio/). Alex Rivera is a fictional persona, so the contact links go to the template's author.


## Features
- Preloader, custom cursor and grain overlay
- Hero with a particle field and magnetic buttons
- About, Skills, Projects (3D tilt cards), Experience and Contact sections
- Scroll reveals and a parallax banner, built with Framer Motion
- Responsive layout styled with Tailwind CSS

## Tech stack
React 19, Vite 6, Tailwind CSS 4, Framer Motion

## Run locally
```bash
npm install
npm run dev      # dev server
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Deployment
Every push to `main` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`. Vite's `base` is set to `/alex-portfolio/` to match the Pages path.

## Project structure
```
src/
  App.jsx            page layout and section order
  components/        one file per section, plus motion helpers
                     (Reveal, TiltCard, Magnetic, ParticleField, Cursor)
  index.css          Tailwind entry and global styles
```
