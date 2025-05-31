import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
	const [user, setUser] = useState(null);
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token != null) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					setUser(response.data.user);
				})
				.catch((e) => {
					console.log(e);
					setUser(null);
				});
		}
	}, []);

	return (
		<>
			{user == null ? (
				<div className="h-full flex justify-center items-center flex-row ">
					<Link
						to="/login"
						className="bg-[#000000] text-[#FF8BA0] text-base font-semibold p-2 rounded-md hover:bg-white"
					>
						Login
					</Link>
					<Link
						to="/register"
						className="bg-[#000000] text-[#FF8BA0] text-base font-semibold p-2 rounded-md hover:bg-white ml-4"
					>
						Register
					</Link>
				</div>
			) : (
				<div className="h-full flex justify-center items-center flex-row">
					<button
						className="bg-[#000000] text-[#FF8BA0] text-base font-semibold p-2 rounded-md hover:bg-white"
						onClick={() => {
							localStorage.removeItem("token");
							setUser(null);
							window.location = "/login";
						}}
					>
						Logout
					</button>
				</div>
			)}
		</>
	);
}
