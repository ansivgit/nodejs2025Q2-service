# ---- Build stage ----
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Prod stage ----
FROM node:22-alpine AS runner

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /usr/src/app/dist ./dist

USER node

EXPOSE 4000

CMD ["node", "dist/main.js"]
