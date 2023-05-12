// eureka-config.js
module.exports = {
    instance: {
        app: 'nodeapp',
        instanceId: `nodeapp:${process.env.HOSTNAME || 'localhost'}:${process.env.PORT}`,
        hostName: process.env.HOSTNAME || 'localhost',
        ipAddr: process.env.HOSTNAME || '127.0.0.1',
        statusPageUrl: `http://${process.env.HOSTNAME || 'localhost'}:${process.env.PORT}/info`,
        port: {
            $: process.env.PORT,
            '@enabled': 'true',
        },
        vipAddress: 'nodeapp',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        serviceUrls: {
            default: [`http://eurekaserver:8761/eureka/apps/`],
        },
    },
};
