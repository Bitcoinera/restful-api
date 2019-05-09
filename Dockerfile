FROM node:10.15
# minimal
# COPY ./* ./
# WORKDIR /
# RUN npm i

#RUN (cd app; npm install;)

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["node", "app.js"]
