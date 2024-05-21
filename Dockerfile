FROM oven/bun:1 as builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun --bun run build

FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production 

COPY --from=builder /app/dist .

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD bun run ./server/entry.mjs