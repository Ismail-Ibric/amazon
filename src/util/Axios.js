import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:5001/amaz0ne/us-central1/api"
  baseURL: "https://us-central1-amaz0ne.cloudfunctions.net/api"
});

export default instance;