# Build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

# Runtime stage
FROM oven/bun:1-alpine

WORKDIR /app

# Add label for the image description for GitHub's container registry
LABEL org.opencontainers.image.description="Organize your projects with the Eisenhower matrix."

COPY package.json bun.lock ./
RUN bun install --production --frozen-lockfile

# Copy built output from builder stage
COPY --from=builder /app/dist /app/dist

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["bun", "run", "./dist/server/entry.mjs"]