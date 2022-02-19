import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { IStoreState } from "../../redux/store";

const UnauthRoute = () => {
	const { user } = useSelector((state: IStoreState) => state.auth);
	return user ? <Navigate to={"/"} /> : <Outlet />;
};

export default UnauthRoute;
