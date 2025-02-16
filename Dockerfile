FROM oven/bun:1-alpine

LABEL org.opencontainers.image.description="Organize your projects with the Eisenhower matrix."

WORKDIR /app

COPY . .

RUN bun install
RUN bun --bun run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["bun", "run", "./dist/server/entry.mjs"]