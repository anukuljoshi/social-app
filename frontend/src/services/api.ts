import dayjs from "dayjs";
import axios from "axios";

import { BASE_API_URL } from "../constants/api";
import jwtDecode from "jwt-decode";

const axiosInstance = axios.create({
	baseURL: `${BASE_API_URL}/api`,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(async (req) => {
	const access = localStorage.getItem("access");
	const refresh = localStorage.getItem("refresh");

	if (!access) {
		localStorage.removeItem("access");
		localStorage.removeItem("refresh");
		return req;
	}

	const user: ITokenUser = jwtDecode(access);
	const isExpired = dayjs().unix() >= user.exp;

	if (!isExpired) {
		req.headers!.Authorization = `Bearer ${access}`;
		return req;
	}

	const res = await axios.post(`${BASE_API_URL}/api/users/token/refresh/`, {
		refresh: refresh,
	});

	if (res.status !== 200) {
		localStorage.removeItem("access");
		localStorage.removeItem("refresh");
		return req;
	}

	localStorage.setItem("access", res.data.access);
	localStorage.setItem("refresh", res.data.refresh);

	req.headers!.Authorization = `Bearer ${res.data.access}`;
	return req;
});

axiosInstance.interceptors.response.use(
	(res) => {
		return res;
	},
	(error) => {
		if (error.response.status === 401) {
			localStorage.removeItem("access");
			localStorage.removeItem("refresh");
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
