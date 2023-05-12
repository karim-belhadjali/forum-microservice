#!/bin/sh
# entrypoint.sh

# Start MongoDB in the background
mongod --fork --logpath /var/log/mongodb.log --bind_ip_all

# Start Node.js application
cd /app
npm start