# FastAPI Vite Template

A starter for sites that need **server-rendered HTML** from FastAPI and a **Vite-built TypeScript + Tailwind** frontend.

Jinja templates define the page. Vite compiles `src/client` into `src/static/dist`. FastAPI serves both.

## How it fits together

```
Browser  →  FastAPI (:8000)
              ├─ Jinja pages     src/template/
              └─ /static/*       src/static/   (Vite output in dist/)
```

1. A route in `src/app/app.py` returns a Jinja template.
2. `src/template/base.html` loads `/static/dist/main.css` and `/static/dist/main.js`.
3. Vite’s entry is `src/client/main.ts`. Production filenames are fixed (`main.js`, `main.css`) so the template does not need a manifest.
4. Files in `src/static` that are not produced by Vite (favicon, SVG sprites) are served as-is.

Tailwind 4 scans both `src/client/**/*.ts` and `src/template/**/*.html`, so classes in either place are included in the CSS.

## Stack

| Layer | Tools |
| --- | --- |
| Backend | Python 3.12+, FastAPI, Jinja2, Uvicorn |
| Frontend | TypeScript, Vite 8, Tailwind CSS 4 |
| Package managers | [uv](https://docs.astral.sh/uv/), [pnpm](https://pnpm.io/) |
| Tool versions (optional) | [mise](https://mise.jdx.dev/) via `mise.toml` |

## Layout

```
src/
  app/app.py          FastAPI app and routes
  main.py             Uvicorn entry (uv run dev)
  template/           Jinja templates (base.html, pages/)
  client/             TypeScript and CSS Vite compiles
  static/             Public files at /static
    dist/             Vite build output (gitignored)
package.json          Vite + concurrently scripts
pyproject.toml        Python package and console scripts
vite.config.mjs       Bundles to src/static/dist with base /static/dist/
```

`@` in TypeScript resolves to `src/client`.

## Prerequisites

- Python 3.12+
- Node.js (22+ recommended; `concurrently` needs 22+)
- [uv](https://docs.astral.sh/uv/)
- [pnpm](https://pnpm.io/)

If you use mise:

```bash
mise install
```

## Setup

```bash
git clone https://github.com/zainhaider-123/fastapi-vite-template.git
cd fastapi-vite-template

uv sync
pnpm install
```

## Run

**Development** (Vite and FastAPI together):

```bash
pnpm dev
```

Open [http://localhost:8000/](http://localhost:8000/). FastAPI reloads on Python/template changes. Rebuild frontend assets when you change `src/client` (see below).

**FastAPI only** (after a Vite build):

```bash
uv run dev
```

**Frontend assets**

Vite writes `src/static/dist/main.js` and `main.css`. The HTML always points at those paths.

```bash
pnpm build:vite
```

During `pnpm dev`, Vite also starts its own process. The page FastAPI serves still reads files from `src/static/dist`, so run `pnpm build:vite` at least once (and again after client edits) until a watch/HMR proxy is wired up.

## Add a page

1. Add a template under `src/template/pages/` that extends `base.html`.
2. Register a route in `src/app/app.py` that returns `templates.TemplateResponse(...)`.
3. Put interactive UI in `src/client` and import it from `main.ts`.
4. Put unchanging files (images, icons) in `src/static` and reference them with `url_for('static', path='...')` or `/static/...`.

Keep API handlers and template wiring in `src/app`. Keep browser code in `src/client`.
