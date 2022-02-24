import { Navigate, Outlet } from "react-router-dom";

import { URLRoutes } from "../../constants/routes";

const PrivateRoute = () => {
	const access = localStorage.getItem("access");

	return Boolean(access) ? (
		<Outlet />
	) : (
		<Navigate to={`/${URLRoutes.LOGIN}`} />
	);
};

export default PrivateRoute;
