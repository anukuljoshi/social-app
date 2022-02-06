import { useSelector, useDispatch } from "react-redux";

import {
	AppBar,
	Container,
	Grid,
	IconButton,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

// redux
import { changeThemeAction } from "../../redux/actions/theme";

// typescript
import { IStoreState } from "../../redux/store";
import { Link } from "react-router-dom";

const Navbar = () => {
	const dispatch = useDispatch();
	const { login, user } = useSelector((state: IStoreState) => state.auth);
	const { mode } = useSelector((state: IStoreState) => state.theme);

	const changeTheme = () => {
		dispatch(changeThemeAction());
	};

	return (
		<AppBar color={"secondary"}>
			<Toolbar>
				<Grid
					container
					component={Container}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Grid item xs={8} md={4}>
						<Link to={"/"}>
							<Typography
								variant="h6"
								component="div"
								noWrap
								sx={{ fontWeight: "medium" }}
							>
								Social App
							</Typography>
						</Link>
					</Grid>
					<Grid
						container
						xs={4}
						md={8}
						justifyContent={"end"}
						alignItems={"center"}
					>
						<IconButton onClick={changeTheme}>
							{mode === "light" ? <DarkMode /> : <LightMode />}
						</IconButton>
						<Stack direction={"row"} gap={2}>
							{login ? (
								<Link to={`/profile/${user.username}`}>
									<Typography
										variant="body1"
										component="div"
										noWrap
									>
										{user.username}
									</Typography>
								</Link>
							) : (
								<>
									<Link to={"/signup"}>
										<Typography
											variant="body1"
											component="div"
											noWrap
										>
											Sign Up
										</Typography>
									</Link>
									<Link to={"/login"}>
										<Typography
											variant="body1"
											component="div"
											noWrap
										>
											Log In
										</Typography>
									</Link>
								</>
							)}
						</Stack>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
