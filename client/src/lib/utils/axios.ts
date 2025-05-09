import axios from "axios";

const baseURL = "http://ticketing.dev";

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
	// httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

export default axiosInstance;
