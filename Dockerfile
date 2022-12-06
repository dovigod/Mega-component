# ARG BASE_IMAGE=node:14
# FROM $BASE_IMAGE

# WORKDIR /app

# COPY package.json /app/pacakge.json

# RUN npm install && mv node_modules /node_modules && npm install

# COPY . ./app

# EXPOSE 5137

# CMD ["npm" , "dev"]
# # RUN npm run dev

ARG BASE_IMAGE=node

FROM node:14
# tell which file in local sholud go in?
# first . <- path outside of image, where files should be copied (local)
# second . <- path inside of image, where files should be stored
# COPY . /app


WORKDIR /app

# since we changed work dir to /app , now default points to /app
# COPY . ./
COPY . /app

# will be executed in docker working directory
# default root
RUN npm install

# all these instructions are for setting up the image
# so do not RUN npm run dev



# has internal network
# does not expose to our local machine
# let docker know when container start, 
# expose centain port to our local system
EXPOSE 3000
# to run 
CMD ["npm", "run", "dev"]
