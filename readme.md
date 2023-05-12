# Node.js Eureka Client Application

This is a Node.js application designed to register with a Eureka server for service discovery.

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Docker

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Clone this repository:
   ```
   git clone https://karim-belhadjali/forum-microservice.git
   ```
2. Navigate into the project directory:
   ```
   cd your-project-directory
   ```
3. Install the project dependencies:
   ```
   npm install
   ```

## Running the Eureka Server

Before running this Node.js application, ensure the Eureka server is up and running.

1. Navigate to the Eureka server Docker directory:
   ```
   cd path-to-eureka-docker-directory
   ```
2. Start the Eureka server using Docker:
   ```
   docker-compose up
   ```

## Running the Node.js Application

Once the Eureka server is running, you can start the Node.js application.

1. Navigate back to the project directory:
   ```
   cd path-to-your-project-directory
   ```
2. Start the application:
   ```
   npm start
   ```

## Error Handling

The application has a built-in mechanism to handle `ECONNREFUSED` errors. In case the Eureka server isn't ready when the application starts, it will retry the connection every 5 seconds, for a maximum of 5 attempts.
