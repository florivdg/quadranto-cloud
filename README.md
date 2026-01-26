# quadranto.cloud

## v2.0.0 Breaking Changes

This release migrates authentication from Lucia to Better Auth. **This is a breaking change that requires a fresh database.**

### Migration Impact

- All existing user accounts will be deleted
- All project ownership data will be cleared
- All session data will be invalidated
- User ID format changes from UUID to text

### Required Actions

1. Back up any data you need to preserve
2. Run database migration: `bunx drizzle-kit migrate`
3. All users must re-register

### New Auth System

- Authentication now powered by [Better Auth](https://www.better-auth.com/)
- Username/password login remains the same UX
- Session cookies: `better-auth.session_token`

---

Powered by Astro. Uses bun.

## Developement Setup

1. Run the following command to start a local postgres container:

```shell
docker compose -f docker-compose.dev.yaml up -d
```

2. Run migrations to create the initial database schema:

```shell
bunx drizzle-kit migrate
```

3. Now run the dev server (which uses native Bun):

```shell
bun --bun run dev
```

## Migrations

See [Drizzle Docs](https://orm.drizzle.team/docs/kit-overview)

## Upgrading in Production

1. Pull latest docker image:

```shell
docker pull ghcr.io/quadranto/quadranto.cloud:latest
# or
docker compose pull app
```

2. Run Drizzle migrations within production container, if needed:

```shell
bunx drizzle-kit migrate
```
