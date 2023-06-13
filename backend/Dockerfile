FROM node:18-alpine3.16

COPY . /backend
WORKDIR /backend
RUN npm install
CMD ["sh", "-c", "sleep 15 && node index.js"]

EXPOSE 3000
