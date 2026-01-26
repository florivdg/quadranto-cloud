#!/bin/sh
set -e

# Run migrations unless explicitly disabled
if [ "$AUTO_MIGRATE" != "false" ]; then
  echo "Running database migrations..."
  bun run ./src/db/migrate.ts
  echo "Migrations complete."
else
  echo "Auto-migration disabled (AUTO_MIGRATE=false)"
fi

# Start the server
exec bun run ./dist/server/entry.mjs
