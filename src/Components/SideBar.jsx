import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListItem, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import Button from "@mui/material/Button";
import FlightIcon from "@mui/icons-material/Flight";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Container from "./Container";
import Auth from "./Auth";
import Cookies from "js-cookie";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [isAuth, setAuth] = React.useState(false);
	const [isLogin, setIsLogin] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleUser = (e) => {
		e.preventDefault();
		setAuth(true);
		setIsLogin(true);
	};

	const handleLogOut = (e) => {
		e.preventDefault();
		setAuth(false);
		Cookies.remove("cid");
		setIsLogin(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
						Travel Thru Air
					</Typography>
					{/* {Cookies.get("cid") == null ? ( */}
					{isLogin && (
						<Button color="inherit" onClick={handleLogOut}>
							Logout
						</Button>
					) }
					{!isLogin && (
						<Button color="inherit" onClick={handleUser}>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
				</DrawerHeader>
				<Divider />
				<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader">
					<ListItemButton
						key="Flight"
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<FlightIcon />
						</ListItemIcon>
						<ListItemText primary="Flight" sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>

					<ListItemButton
						key="Special Deals"
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<LocalOfferIcon />
						</ListItemIcon>
						<ListItemText primary="Special Deals" sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>

					<ListItemButton
						key="Account"
						sx={{
							minHeight: 4,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}
						onClick={handleUser}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText primary="Account" sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</List>
			</Drawer>
			{isAuth &&  (
				<div>
					<Auth />
				</div>
			)}
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Container />
			</Box>
		</Box>
	);
}
