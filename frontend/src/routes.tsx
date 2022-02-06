import { Route, Routes } from 'react-router-dom';
import HomePage from './pages';
import PostIndex from './pages/posts';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/posts"} element={<PostIndex />} />
            <Route path={"/users"} element={<HomePage />} />
        </Routes>
    );
};

export default MainRoutes;
