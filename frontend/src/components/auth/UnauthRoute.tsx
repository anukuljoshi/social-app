import { Navigate, Outlet } from "react-router-dom";

const UnauthRoute = () => {
	const access = localStorage.getItem("access");
	return Boolean(access) ? <Navigate to={"/"} /> : <Outlet />;
};

export default UnauthRoute;
