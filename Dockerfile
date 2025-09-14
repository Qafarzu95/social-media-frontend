# ------------------------------
# Build stage
# ------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build && ls -la dist

# ------------------------------
# Production stage
# ------------------------------
FROM nginx:alpine
ARG PORT
ENV PORT $PORT

RUN apk add --no-cache gettext

# Build klasörünü Nginx'e kopyala
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf.template

EXPOSE $PORT

# Nginx başlatmadan önce envsubst ile $PORT'u default.conf'a uygula
CMD envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
