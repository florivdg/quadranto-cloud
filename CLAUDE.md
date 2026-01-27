# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quadranto Cloud is a task management application using the Eisenhower Matrix principle (urgent/important quadrants). It allows users to organize projects collaboratively, create tasks with priority levels, and track completion.

## Commands

```bash
# Development setup
docker compose -f docker-compose.dev.yaml up -d   # Start PostgreSQL container
bunx drizzle-kit migrate                          # Run database migrations
bun --bun run dev                                 # Start dev server (native Bun) [Note: do not run this unless told to]

# Build & preview
bun run build                                     # Build for production (runs astro check first)
bun run preview                                   # Preview production build

# Database
bun run db:generate                               # Generate new migration [Note: do not run this unless told to]
bun run db:push                                   # Push schema changes directly [Note: do not run this unless told to]
bun run db:migrate                                # Run pending migrations [Note: do not run this unless told to]
```

## Tech Stack

- **Framework**: Astro 5 with SSR (Node adapter, standalone mode)
- **UI**: Vue 3 for interactive components, Tailwind CSS 4, shadcn-vue
- **Database**: PostgreSQL 16 with Drizzle ORM
- **Auth**: Lucia (session-based) with oslo for password hashing
- **Validation**: Zod schemas, Vee Validate for forms
- **Runtime**: Bun (package manager and runtime)

## Architecture

### Directory Structure

```
src/
├── api/              # API client (ofetch), ApiError, and endpoint modules (project.ts, tasks.ts)
├── components/
│   ├── ui/           # shadcn-vue components [Note: do not edit this folder directly]
│   ├── sidebar/      # Sidebar navigation components
│   ├── tasks/        # Task quadrants and inputs
│   ├── projects/     # Project management UI
│   └── views/        # Page-level Vue components (Login, Signup)
├── db/
│   ├── schema/       # Drizzle schema definitions (auth.ts, projects.ts)
│   ├── client/       # Query functions (projects.ts, tasks.ts, users.ts)
│   ├── index.ts      # Database connection
│   └── migrate.ts    # Migration runner
├── layouts/          # App.astro (root), Main.astro (authenticated layout)
├── lib/              # Utilities (auth.ts, auth-client.ts, formatters.ts, utils.ts, validators.ts)
├── pages/
│   ├── api/          # REST endpoints (/auth, /projects, /tasks)
│   └── projects/     # Project pages with dynamic routing
├── styles/           # Global CSS (globals.css)
└── middleware.ts     # Session validation and route protection
drizzle/              # Auto-generated Drizzle migrations (at project root) [Note: do not edit this folder]
```

### Key Patterns

**Authentication Flow**: Middleware validates sessions via cookie or Bearer token. Unauthenticated users are redirected to `/login` (pages) or receive 401 (API). Whitelisted routes: `/login`, `/signup`, `/api/auth/*`.

**Database Access**: Query functions in `db/client/` include ownership checks. All project/task operations verify the user is an owner before allowing modifications.

**API Routes**: Astro API handlers receive `context.locals.user` and `context.locals.session`. Return JSON with appropriate status codes.

**Components**: Astro components for static content, Vue components for interactivity. All UI uses shadcn-vue patterns with Lucide icons.

### Database Schema

- **users** ↔ **projects** (many-to-many via projects_users)
- **projects** → **tasks** (1:many)
- **users** → **tasks** (1:many via owner_id)
- **tasks** have priority enum: low/medium/high/urgent

## Configuration Files

- `drizzle.config.ts` - DB connection via env vars (POSTGRES\_\*)
- `components.json` - shadcn-vue config (new-york style, lucide icons)
- `.prettierrc` - No semicolons, single quotes, Tailwind class sorting

## Checks and Linting

After making changes, ensure to run the following checks:

```bash
bun run astro check        # Astro type checking
bun run lint --type-aware  # Oxlint type-aware linting
```

## Formatting

Always run `bunx prettier --write .` on changed files after making edits to ensure consistent formatting.
