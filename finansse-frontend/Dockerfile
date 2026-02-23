# --- Stage 1: Build Stage
FROM node:24-slim AS builder

# Install deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build static files
RUN npm run build

# --- Stage 2: Production Stage
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

# optional
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
