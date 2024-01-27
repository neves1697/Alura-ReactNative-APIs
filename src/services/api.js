import axios from "axios";

//conectando com a Web Api

const api = axios.create({
    baseURL: "http://192.168.31.111:3000/"
});

export default api;