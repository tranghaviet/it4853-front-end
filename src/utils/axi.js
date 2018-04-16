const axios = require('axios');
const configEls = require('../config/els');

const baseUrl = `http://${configEls.host}:${configEls.port}`;

console.log('Elasticsearch address is ' + baseUrl);

const axi = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
});

module.exports = axi;
