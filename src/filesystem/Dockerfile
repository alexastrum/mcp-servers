FROM node:22.12-alpine AS builder

WORKDIR /app

COPY src/filesystem /app
COPY tsconfig.json /tsconfig.json

# Install pnpm
RUN npm install -g pnpm

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

# Install pnpm
RUN npm install -g pnpm
# Install production dependencies
ENV NODE_ENV=production
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --prod --frozen-lockfile

ENTRYPOINT ["node", "/app/dist/index.js"]