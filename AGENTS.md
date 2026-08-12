# AGENTS.md

Instructions for coding agents working in this repository.

## What this is

A FastAPI + Jinja site with a Vite TypeScript/Tailwind frontend. FastAPI owns HTML and `/static`. Vite only compiles `src/client` into `src/static/dist`.

This is a small template. Match existing patterns. Do not introduce a SPA framework, ORM, or extra build tool unless the user asks.

## Layout

| Path | Role |
| --- | --- |
| `src/app/app.py` | FastAPI app, routes, Jinja, static mount |
| `src/main.py` | Uvicorn entry (`uv run dev`) |
| `src/template/` | Jinja (`base.html`, `pages/`) |
| `src/client/` | Vite entry, TS, CSS, imported assets |
| `src/static/` | Files served at `/static` |
| `src/static/dist/` | **Generated.** Do not edit or commit. |
| `vite.config.mjs` | Output names, `/static/dist/` base, `@` → `src/client` |
| `package.json` | `dev`, `build:vite` |
| `pyproject.toml` | Python deps and `dev` / `fastapi_vite_template` scripts |

There is no `__init__.py` under `src/app`. The uv editable install puts `src/` on `sys.path` so `app` and `main` import.

## Commands

```bash
uv sync                 # Python env from uv.lock
pnpm install            # Node deps from pnpm-lock.yaml
pnpm build:vite         # Write src/static/dist/main.js and main.css
pnpm dev                # concurrently: vite + `uv run dev` (FastAPI :8000)
uv run dev              # FastAPI only; needs a prior Vite build
```

Python 3.12+, uv, pnpm, Node 22+. Optional: `mise install` from `mise.toml`.

There is no test or lint suite. Do not invent CI or formatters unless asked.

`package.json` `build` / `build:fastapi` call `uv run build`, which is **not** a project script. Prefer `pnpm build:vite` plus `uv run dev`. Do not add a dummy `build` script to hide that.

## Architecture rules

- **Server HTML:** new pages are Jinja templates extending `src/template/base.html`, plus a route in `src/app/app.py`.
- **Browser JS/CSS:** `src/client/main.ts` is the only Vite input. Import modules from there. Use `@/` for `src/client`.
- **Static that Vite should not hash:** put files in `src/static` (see `favicon.svg`, `icons.svg`). Reference with `url_for('static', path='...')` or `/static/...`.
- **Vite output is stable:** `main.js` and `main.css`. Templates hardcode those paths. Do not switch to hashed filenames without updating `base.html`.
- **Tailwind 4:** `@import "tailwindcss"` in `src/client/style.css`. `@source` already covers `src/template/**/*.html` and `src/client/**/*.ts`. Add another `@source` if you add a new HTML/TS tree.
- **Vite `publicDir` is `false`.** Do not expect Vite to copy a `public/` folder.
- `app.mount("/static", ...)` stays **after** routes so `/` is not swallowed.

## Code style

**Python**

- Keep the app in `src/app/app.py` until it clearly needs modules (routers, deps).
- Use `pathlib.Path` for filesystem paths. `ROOT_DIR` is `src/` (parent of `app/`).
- Templates live in `src/template`, not next to the Python package.
- New Python deps: `uv add <pkg>` so `pyproject.toml` and `uv.lock` stay in sync.

**TypeScript**

- Bundler-mode TS (`tsconfig.json`): `verbatimModuleSyntax`, `allowImportingTsExtensions`. Use `import { x } from './file.ts'`.
- Tailwind utility classes in templates and in TS-generated HTML are both valid.
- New Node deps: `pnpm add -D <pkg>` (this repo only has `devDependencies`).

**General**

- Do not commit `.venv`, `node_modules`, or `src/static/dist/`.
- Do not expand `README.md` with agent-only detail; put that here.
- After client changes, run `pnpm build:vite` so FastAPI can serve the new assets. FastAPI reload does not rebuild JS/CSS.

## Do not

- Rewrite the frontend as React/Vue/Svelte or move rendering entirely to the client.
- Point templates at the Vite dev-server URL without also changing FastAPI.
- Check in secrets or `.env` files (none are used today).
- Add `src/static/dist` to git.
