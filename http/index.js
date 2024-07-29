import axios from 'axios'
import {nextConfig} from "../next.config";
const dotenv = require('dotenv')


const $host = axios.create({
    baseURL: nextConfig.URL
})

export {
    $host
}
