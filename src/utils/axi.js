import axios from "axios";
import { host, port } from "../config/els";

const baseUrl = `http://${host}:${port}`;

console.log('Elasticsearch address is ' + baseUrl);

const axi = axios.create({
  baseURL: baseUrl,
});

axi.defaults.headers.common['Accept'] = 'application/json';

export default axi;
