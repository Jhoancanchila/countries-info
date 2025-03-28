# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app

# 1. Copiar solo lo necesario para instalar dependencias
COPY package.json package-lock.json ./
RUN npm install --production=false --legacy-peer-deps

# 2. Copiar configuración
COPY vite.config.ts .
COPY tailwind.config.js .
COPY postcss.config.js .
COPY tsconfig*.json .

# 3. Copiar solo archivos necesarios para producción (excluyendo tests)
COPY src ./src
RUN find src -name "*.test.*" -delete  # Elimina archivos de test

COPY public ./public
COPY index.html .

# 4. Build
RUN npm run build

# Etapa de producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]