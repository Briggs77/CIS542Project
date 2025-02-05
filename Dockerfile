FROM node:18
#
WORKDIR /app
COPY nextjs/package*.json ./
RUN npm install
COPY nextjs ./
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build --verbose || { echo 'npm build failed'; exit 1; }
EXPOSE 3000

CMD ["npm", "run", "start"]
