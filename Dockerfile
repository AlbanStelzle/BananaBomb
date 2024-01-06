FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

# Si on utilise pas 'docker-compose up -d' :
# docker build -t ifront .
# docker run -d --rm -p 5173:5173 --name cfront ifront
