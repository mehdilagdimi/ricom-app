import axios from "axios"

const axiosConfig = () =>{
  const apiUrl = "http://localhost/ricom%20api/api/";
  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url);
      const allowedOrigins = [apiUrl];
      const token = jwt;
      if (allowedOrigins.includes(origin)) {
        // config.headers.authorization = `Bearer ${token}`;
        config.withCredentials = true;
      }
      return config;
    }, 
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (config) => {
      const { origin } = new URL(config.url);
      const allowedOrigins = [apiUrl];
      const token = jwt;
      if (allowedOrigins.includes(origin)) {
        // config.headers.authorization = `Bearer ${token}`;
        config.withCredentials = true;
      }
      return config;
    }, 
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default axiosConfig;