import * as React from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

const StyledModal = styled(ModalUnstyled)`
	position: fixed;
	z-index: 1300;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Backdrop = styled("div")`
	z-index: -1;
	position: fixed;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	-webkit-tap-highlight-color: transparent;
`;

const style = {
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	p: 2,
	px: 4,
	pb: 3,
};

const initialState = {
	nickname: "",
	password: "",
	error: "",
};

export default function Auth() {
	const [open, setOpen] = React.useState(true);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [form, setForm] = React.useState(initialState);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:8081/FlightApp/Auth?cid=" + form.nickname + "&pwd=" + form.password)
			.then((res) => res.text())
			.then((data) => {
				if (data === "SUCCESS") {
					Cookies.set("cid", form.nickname);
					handleClose();
				} else {
					form.error = data;
				}
			});
	};
	const { nickname, password } = form;
	return (
		<div>
			<StyledModal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={open} onClose={handleClose} BackdropComponent={Backdrop}>
				<Box sx={{ backgroundColor: "white", padding: "1%", borderRadius: "5%" }}>
					<form onSubmit={handleSubmit} className="login-form">
						<label htmlFor="nickname">
							<h2>Enter Your Username </h2>
						</label>
						<input name="nickname" type="text" value={nickname} onChange={handleChange} placeholder="Username" required />
						<label htmlFor="password">
							<h2>Password </h2>
						</label>
						<input name="password" type="password" value={password} onChange={handleChange} placeholder="Password" required />
						<div className="auth__form-container_fields-content_button">
							<button onClick={handleSubmit}>Submit</button>
						</div>
					</form>
					<Typography color="red">{form.error}</Typography>
				</Box>
			</StyledModal>
		</div>
	);
}
