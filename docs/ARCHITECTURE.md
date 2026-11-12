# Alex Rivera architecture

A one-page, motion-heavy portfolio template for a fictional developer.

## Components

| Part | What it does |
| --- | --- |
| `src/App.jsx` | Section order: preloader, nav, hero, about, work, experience, skills, contact, footer |
| `Nav.jsx` | Links to `#about`, `#work`, `#experience`, `#skills` and `#contact` |
| `Contact.jsx` | Contact form (simulated send) and social links |
| `Footer.jsx` | Credit link to the template author's portfolio and back to top |
| `Reveal`, `TiltCard`, `Magnetic`, `ParticleField`, `Cursor` | Motion helpers built on Framer Motion |

## Data flow

Static content. The contact form doesn't send anything; it shows a success animation.

## Hosting

GitHub Pages through `.github/workflows/deploy.yml` on every push to `main`. Vite's `base` is `/alex-portfolio/`.

## Key decisions

- **Fictional persona, real links.** The email used to be `hello@alexrivera.dev`, a domain we don't own, so it now jumps to the contact form. The socials, which were bare site homepages, now go to Youssef's GitHub, LinkedIn and portfolio.

## Links

- Live demo: https://youssefabotaleb20.github.io/alex-portfolio/
- Portfolio (the site this demo is shown on): https://youssefabotaleb20.github.io/Portfolio/
- Every "View my portfolio" or "Built by Youssef Abotaleb" link in the demo points to the portfolio. There are no Linktree links any more (changed 2026-11-12).
