# Design Doc — Task Dashboard

## Stack

**React** — component model fits naturally for a board with columns and cards.

**Tailwind CSS** — faster to build with than writing plain CSS. Keeps styling close to the markup which matters when moving quick.

**shadcn/ui** — already on Tailwind, and since it only pulls in components you actually use, the bundle stays small. Made sense for a project this size rather than pulling in a full component library.

**UUID** — simple way to generate unique task IDs and avoid collisions, especially since localStorage has no auto-increment.

Considered **@hello-pangea/dnd** for drag and drop but dropped it. Unfamiliar with the package and didn't want to sink hours debugging DnD behavior with limited time. Went with a simple dropdown to move tasks instead — works fine, no dependency risk.

---

## AI / Tooling

Used Claude throughout. Mainly for things I already know how to do but would take time to write — boilerplate, repetitive patterns, prop wiring. Also used it to review code and check if the approach was reasonable, then adjusted based on that. Understood everything before using it, didn't paste and ship blind.

---

## Architecture

State lives in a `useTasks` custom hook using React state. `App` only handles UI state like whether a dialog is open or what the search query is.

Data flows one way — `useTasks` owns the tasks, passes them down to `App`, which passes them to column and card components as props. Actions like edit, delete, and move go back up through callbacks into `useTasks`.

Persistence is localStorage. On first load the app checks localStorage and loads saved tasks, falling back to a default task if nothing's there. Every state change saves back automatically.

---

## Three Ways This Could Break

**1. No real input validation**
Only checks if the title is empty. Fields like description have no constraints. In production I'd add Zod schemas and validate on submit — gives clear error messages and a single source of truth for what a valid task looks like.

**2. No delete confirmation**
Tasks delete immediately. One misclick and it's gone. A simple confirmation modal would prevent accidental data loss. In production this is a must, especially if tasks can't be recovered.

**3. localStorage is unreliable at scale**
Storage limits, no sync across tabs, no conflict resolution. For anything real this needs a backend — a proper API with a database, and something like React Query or RTK Query for caching and state syncing.

---

## Trade-offs

**Features over design** — made sure all required functionality worked first, polish came second. A broken feature looks worse than a plain UI.

**Skipped some WCAG guidelines** — basic keyboard nav and focus states are there but didn't go deep on ARIA roles or screen reader testing. Given the deadline, prioritized functional requirements over full accessibility coverage.

**Tight scope over more features** — kept it small and working rather than half-finishing more things. Anything not done is noted here rather than rushed.

---

## One More Week

**Drag and drop** — the most obvious missing piece. Would properly evaluate @hello-pangea/dnd with enough time to get comfortable with it.

**Validation** — add Zod, wire it to forms, handle errors clearly.

**Performance at scale** — would add react-window or react-virtualized to only render visible tasks instead of the full list, which becomes a problem as task count grows.

**Accessibility** — go through WCAG more carefully, add ARIA where needed, test with a screen reader.

**Backend + React Query** — move off localStorage, add a real API, use React Query for caching and loading states.

**Responsiveness** — the layout doesn't hold up well on smaller screens. Would go through breakpoints properly and make sure the board is usable on mobile.

---

**P.S.** — Due to the 16 hour time constraint and office hours running alongside, I couldn't give this the time I would have liked. Some things are unfinished and some corners were cut that I've tried to be honest about above. Appreciate the opportunity regardless.
