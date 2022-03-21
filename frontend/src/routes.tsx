import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/auth/PrivateRoute";
import UnauthRoute from "./components/auth/UnauthRoute";

import HomePage from "./pages";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import UserDetail from "./pages/users/detail";
import UserUpdate from "./pages/users/update";
import NotFoundPage from "./pages/errors/not-found";

import { URLRoutes } from "./constants/routes";

const MainRoutes = () => {
	return (
		<Routes>
			{/* home */}
			<Route path={""} element={<PrivateRoute />}>
				<Route path={""} element={<HomePage />} />
			</Route>

			{/* auth */}
			<Route path={`${URLRoutes.SIGNUP}`} element={<UnauthRoute />}>
				<Route path={""} element={<SignUp />} />
			</Route>
			<Route path={`${URLRoutes.LOGIN}`} element={<UnauthRoute />}>
				<Route path={""} element={<LogIn />} />
			</Route>

			{/* users */}
			<Route path={`${URLRoutes.USERS}`} element={<PrivateRoute />}>
				<Route path={""} element={<NotFoundPage />} />
				<Route path={":username"} element={<UserDetail />} />
				<Route path={":username/update"} element={<UserUpdate />} />
			</Route>

			<Route path={"*"} element={<NotFoundPage />} />
		</Routes>
	);
};

export default MainRoutes;
