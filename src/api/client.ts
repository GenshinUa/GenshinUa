import axios from "axios";

const instance = axios.create({
    baseURL: 'https://genshin.forevka.dev/api/',
    timeout: 60000,
    headers: {
        'Authorization': 'Bearer 2de17243be7d27d99acb7b031f3cb2335ccd93769f5a29a1928d0b5593ae7dbf079607a99b636d758bf1f8687e9e694f2a16f4b985801ac1dbc8ff5a7a45edabd7a2cb68d9dbd9838ca0f357d5f600d7205376ed25d755d55999b1aaae5901dd554861216afe64013c757366709038292721d7e2df031123abcecfd5ecd3d3fa'
    }
});

export default instance;