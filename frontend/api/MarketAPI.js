import axios from 'axios';

const marketAPI = axios.create({
    baseUrl: "localhost:3000"
});

export default marketAPI;