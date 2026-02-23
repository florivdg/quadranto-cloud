## Project Overview

Quadranto Cloud is a task management application using the Eisenhower Matrix principle (urgent/important quadrants). It allows users to organize projects collaboratively, create tasks with priority levels, and track completion.

## Commands

```bash
bun --bun run dev       # Start dev server (native Bun) [Note: do not run this unless told to]

bun run db:generate     # Generate new migration [Note: do not run this unless told to]
bun run db:push         # Push schema changes directly [Note: do not run this unless told to]
bun run db:migrate      # Run pending migrations [Note: do not run this unless told to]
```

### Key Patterns

**Authentication Flow**: Middleware validates sessions via cookie or Bearer token. Unauthenticated users are redirected to `/login` (pages) or receive 401 (API). Whitelisted routes: `/login`, `/signup`, `/api/auth/*`.

**Database Access**: Query functions in `db/client/` include ownership checks. All project/task operations verify the user is an owner before allowing modifications.

**Components**: Astro components for static content, Vue components for interactivity. All UI uses shadcn-vue patterns with Lucide icons.

## After Edits

After making changes, ensure to run the following checks:

```bash
bun run astro check        # Astro type checking
bun run lint --type-aware  # Oxlint type-aware linting
```

Always run `bunx prettier --write .` on changed files after making edits to ensure consistent formatting.
