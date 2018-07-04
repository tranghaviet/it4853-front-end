// import axios from "axios";
const axios = require('axios');
// import { host, port } from '../config/els';
const els = require('../config/els');

const baseUrl = `http://${els.host}:${els.port}`;

console.log('Elasticsearch address is ' + baseUrl);

const axi = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// export default axi;
module.exports = axi;
