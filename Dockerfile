FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./

RUN npm install

# add app
COPY . .

EXPOSE 4000
# start app
CMD ["npm", "start"]