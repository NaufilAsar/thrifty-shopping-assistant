# Stage 1: Build the Angular application
FROM node:16.10 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the built Angular application
FROM nginx:alpine

COPY --from=builder /app/dist/major-project/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

