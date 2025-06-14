# Étape de build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

<<<<<<< HEAD
=======
# 🔐 Injection de variables d’environnement
ENV REACT_APP_ENABLE_MIRAGE=true \
    NODE_ENV=production

>>>>>>> origin/master
COPY . .

RUN npm run build

# Étape de production
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
