import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { URLRoutes } from "../../constants/routes";
import { IStoreState } from "../../redux/store";

const PrivateRoute = () => {
	const { user } = useSelector((state: IStoreState) => state.auth);
	return user ? <Outlet /> : <Navigate to={`${URLRoutes.LOGIN}`} />;
};

export default PrivateRoute;
