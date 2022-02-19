import { Route, Routes } from "react-router-dom";
import { URLRoutes } from "./constants/routes";

import PrivateRoute from "./components/auth/PrivateRoute";
import UnauthRoute from "./components/auth/UnauthRoute";

import HomePage from "./pages";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import PostIndex from "./pages/posts";
import UserIndex from "./pages/users";

const MainRoutes = () => {
	return (
		<Routes>
			{/* home */}
			<Route path={"/"} element={<PrivateRoute />}>
				<Route path={""} element={<HomePage />} />
			</Route>

			{/* auth */}
			<Route path={`${URLRoutes.SIGNUP}`} element={<UnauthRoute />}>
				<Route path={""} element={<SignUp />} />
			</Route>
			<Route path={`${URLRoutes.LOGIN}`} element={<UnauthRoute />}>
				<Route path={""} element={<LogIn />} />
			</Route>

			{/* post */}
			<Route path={`${URLRoutes.POSTS}`} element={<PrivateRoute />}>
				<Route path={""} element={<PostIndex />} />
			</Route>

			{/* users */}
			<Route path={`${URLRoutes.USERS}`} element={<PrivateRoute />}>
				<Route path={""} element={<UserIndex />} />
			</Route>
		</Routes>
	);
};

export default MainRoutes;
