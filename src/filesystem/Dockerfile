FROM node:22.12-alpine AS builder

WORKDIR /app

COPY src/filesystem /app
COPY tsconfig.json /tsconfig.json

# Install pnpm
RUN npm install -g pnpm

# Install express and its types for HTTP server
RUN pnpm add express
RUN pnpm add -D @types/express

# Use pnpm for dependencies and build
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install
# Build the project first (runs TypeScript compiler)
RUN pnpm run build


FROM node:22.12-alpine AS release

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml

ENV NODE_ENV=production
# Enable HTTP server
ENV USE_HTTP=true
# Set port (default is 3000)
ENV PORT=3000

# Install pnpm
RUN npm install -g pnpm
# Install production dependencies
ENV NODE_ENV=production
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --prod --frozen-lockfile

# Expose the HTTP port
EXPOSE 3000

ENTRYPOINT ["node", "/app/dist/index.js"]