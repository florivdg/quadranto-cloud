# Build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

# Runtime stage
FROM oven/bun:1-alpine

WORKDIR /app

LABEL org.opencontainers.image.description="Organize your projects with the Eisenhower matrix."

COPY package.json bun.lock ./
RUN bun install --production --frozen-lockfile

# Copy built output from builder stage
COPY --from=builder /app/dist /app/dist

# Copy migration files and scripts
COPY --from=builder /app/drizzle /app/drizzle
COPY --from=builder /app/src/db/migrate.ts /app/src/db/migrate.ts
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV HOST=0.0.0.0
ENV PORT=4321
ENV AUTO_MIGRATE=true
EXPOSE 4321

ENTRYPOINT ["/app/entrypoint.sh"]
