import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { BASE_API_URL } from "../constants/api";

const access = localStorage.getItem("access");
const refresh = localStorage.getItem("refresh");

const axiosInstance = axios.create({
	baseURL: `${BASE_API_URL}/api`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${access}`,
	},
});

axiosInstance.interceptors.request.use(async (req) => {
	const user: any = jwt_decode(access!);
	const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

	if (!isExpired) {
		return req;
	}

	const res = await axios.post(`${BASE_API_URL}/api/users/token/refresh/`, {
		refresh: refresh,
	});

	if (res.status === 200) {
		localStorage.setItem("access", res.data.access);
		localStorage.setItem("refresh", res.data.refresh);
		req.headers!.Authorization = `Bearer ${res.data.access}`;
	}

	return req;
});

export default axiosInstance;
