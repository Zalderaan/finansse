# --- Base image ---
FROM node:24-slim AS builder

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma/ ./prisma/

# Install ALL dependencies
RUN npm ci

# Copy source
COPY tsconfig*.json ./
COPY src/ ./src/

# Generate prisma client
# DATABASE_URL is not needed to generate the client, but prisma.config.ts calls env() which fails without it
ARG DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder
RUN npx prisma generate

# Compile TypeScript
RUN npm run build

# --- Stage 2: Production ---
FROM node:24-slim AS production

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# install deps, skip dev deps
RUN npm ci --omit=dev

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Copy generated prisma client
COPY --from=builder /app/src/generated ./src/generated

# Copy prisma schema for prisma operatins at runtime
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/index.js"]