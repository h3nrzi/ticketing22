import axios from "axios";
import https from "https";

const baseURL = "https://ticketing.dev";

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
	httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

export default axiosInstance;
