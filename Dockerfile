# Stage 1: Use an official Node.js runtime as a parent image
FROM node:14 AS build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Stage 2: Use MongoDB as the parent image
FROM mongo:latest

# Copy the Node.js app from the previous stage
COPY --from=build /app /app

# Install Node.js
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Make port 3000 and 27017 available to the world outside this container
EXPOSE 3000
EXPOSE 27017

# Define environment variable
ENV EUREKA_HOST eureka

# Run MongoDB and the Node.js app
CMD mongod --fork --logpath /var/log/mongodb.log && cd /app && npm start
