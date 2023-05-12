// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Eureka = require('eureka-js-client').Eureka;
const eurekaConfig = require('./eureka-config');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

setTimeout(() => {
    // Register with Eureka server
    const client = new Eureka(eurekaConfig);

    client.start((error) => {
        console.log(error || 'Node app registered with Eureka.');
    });


    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    const PORT = process.env.PORT || 3000;

    const forumRoutes = require('./routes/forum');

    app.use('/api/forum', forumRoutes);

    const MONGODB_URI = 'mongodb://localhost:27017/forumdb';



    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (error) => {
        console.error('Mongoose connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected from MongoDB');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        client.getInstancesByAppId('nodeapp', (error, instances) => {
            console.log(instances);
        });
    });
}, 5000);



