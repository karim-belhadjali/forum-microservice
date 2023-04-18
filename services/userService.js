// services/userService.js
const axios = require('axios');

const USER_SERVICE_BASE_URL = 'http://zuul-gateway-host:port/api/users';

exports.getUserById = async (userId) => {
    try {
        const response = await axios.get(`${USER_SERVICE_BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
