import axios from "axios";

const marketAPI = axios.create({
  baseUrl: "http://18.229.90.36:3000",
});

export default marketAPI;
