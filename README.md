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

## Upgrading in Production

1. Build new Docker image:

```shell
docker build --platform linux/arm64 -t florivdg/quadranto:{new-tag} .
```

2. Push new Docker image:

```shell
docker push florivdg/quadranto:{new-tag}
```

3. Update the image in the docker-compose.yaml file on production server.

4. Run Drizzle migrations within production container, if needed:

```shell
bunx drizzle-kit migrate
```
