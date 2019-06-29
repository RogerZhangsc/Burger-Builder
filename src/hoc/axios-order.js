import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-project-1543197351382.firebaseio.com/',

})

export default instance;