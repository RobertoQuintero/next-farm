import axios from "axios";


const belisarioApi = axios.create({
  baseURL:'/api'
})

export default belisarioApi;