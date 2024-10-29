# quadranto.cloud

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
