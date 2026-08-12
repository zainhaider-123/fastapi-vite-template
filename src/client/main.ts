import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section class="flex flex-col items-center text-center">
  <div class="relative mb-10 h-44 w-44">
    <img src="${heroImg}" class="absolute inset-0 m-auto h-40 w-40 drop-shadow-xl" width="170" height="179" alt="">
    <img src="${typescriptLogo}" class="absolute bottom-2 right-3 h-10 w-10 rounded-lg bg-slate-900/80 p-1 ring-1 ring-white/10" alt="TypeScript logo">
    <img src="${viteLogo}" class="absolute bottom-2 left-3 h-10 w-10 rounded-lg bg-slate-900/80 p-1 ring-1 ring-white/10" alt="Vite logo">
  </div>
  <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">Get started</h1>
  <p class="mt-3 max-w-xl text-slate-400">
    Edit
    <code class="rounded-md bg-slate-800 px-1.5 py-0.5 text-sm text-violet-200">src/client/main.ts</code>
    and
    <code class="rounded-md bg-slate-800 px-1.5 py-0.5 text-sm text-violet-200">src/template</code>
    then rebuild with Vite.
  </p>
  <button id="counter" type="button"
    class="counter mt-8 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium shadow-lg shadow-violet-950/40 transition hover:bg-violet-500"></button>
</section>

<div class="mx-auto my-14 h-px max-w-xl bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

<section class="grid gap-6 md:grid-cols-2">
  <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
    <div class="mb-4 flex items-center gap-3 text-violet-300">
      <svg class="h-5 w-5" role="presentation" aria-hidden="true"><use href="/static/icons.svg#documentation-icon"></use></svg>
      <h2 class="text-lg font-semibold text-white">Documentation</h2>
    </div>
    <p class="mb-4 text-sm text-slate-400">Your questions, answered</p>
    <ul class="space-y-2">
      <li>
        <a class="flex items-center gap-3 rounded-xl bg-slate-800/80 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-800" href="https://vite.dev/" target="_blank">
          <img class="h-5 w-5" src="${viteLogo}" alt="">
          Explore Vite
        </a>
      </li>
      <li>
        <a class="flex items-center gap-3 rounded-xl bg-slate-800/80 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-800" href="https://www.typescriptlang.org" target="_blank">
          <img class="h-5 w-5" src="${typescriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
    <div class="mb-4 flex items-center gap-3 text-violet-300">
      <svg class="h-5 w-5" role="presentation" aria-hidden="true"><use href="/static/icons.svg#social-icon"></use></svg>
      <h2 class="text-lg font-semibold text-white">Connect with us</h2>
    </div>
    <p class="mb-4 text-sm text-slate-400">Join the Vite community</p>
    <ul class="grid grid-cols-2 gap-2">
      <li><a class="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2 text-sm transition hover:bg-slate-800" href="https://github.com/vitejs/vite" target="_blank"><svg class="h-4 w-4" role="presentation" aria-hidden="true"><use href="/static/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a class="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2 text-sm transition hover:bg-slate-800" href="https://chat.vite.dev/" target="_blank"><svg class="h-4 w-4" role="presentation" aria-hidden="true"><use href="/static/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a class="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2 text-sm transition hover:bg-slate-800" href="https://x.com/vite_js" target="_blank"><svg class="h-4 w-4" role="presentation" aria-hidden="true"><use href="/static/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a class="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2 text-sm transition hover:bg-slate-800" href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="h-4 w-4" role="presentation" aria-hidden="true"><use href="/static/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
