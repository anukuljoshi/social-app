import { Route, Routes } from "react-router-dom";
import { URLRoutes } from "./constants/routes";

import PrivateRoute from "./components/auth/PrivateRoute";

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
			<Route path={`${URLRoutes.SIGNUP}`} element={<SignUp />} />
			<Route path={`${URLRoutes.LOGIN}`} element={<LogIn />} />

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
