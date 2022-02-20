import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import { BASE_API_URL } from "../constants/api";

import { loginUserAction, logoutUserAction } from "../redux/actions/auth";
import { IStoreState } from "../redux/store";

const useAxios = () => {
	const dispatch = useDispatch();
	const { access, refresh } = useSelector((state: IStoreState) => state.auth);

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

		const res = await axios.post(
			`${BASE_API_URL}/api/users/token/refresh/`,
			{
				refresh: refresh,
			}
		);

		if (res.status === 200) {
			dispatch(loginUserAction(res.data));
			req.headers!.Authorization = `Bearer ${res.data.access}`;
			return req;
		} else {
			dispatch(logoutUserAction());
		}
	});

	return axiosInstance;
};

export default useAxios;
