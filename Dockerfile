FROM node

RUN mkdir -p /usr/src/app
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
ADD src /usr/src/app/src
ADD public /usr/src/app/public
RUN npm build
EXPOSE 3003
CMD [ "npm", "start" ]
