FROM node:18

WORKDIR /app

COPY nextjs/package*.json ./

RUN npm install

COPY nextjs/src ./src
COPY nextjs/public ./public
COPY nextjs/next.config.ts ./

RUN npm run build || { echo 'npm build failed'; exit 1; }

EXPOSE 3000

CMD ["npm", "run", "start"]
