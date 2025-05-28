import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loadingEmailLogin, setLoadingEmailLogin] = useState(false);
	const [loadingGoogleLogin, setLoadingGoogleLogin] = useState(false);
	const navigate = useNavigate();

	const loginWithGoogle = useGoogleLogin({
		onSuccess: (res) => {
			setLoadingGoogleLogin(true);
			axios
				.post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
					accessToken: res.access_token,
				})
				.then((response) => {
					toast.success("Login successful");
					localStorage.setItem("token", response.data.token);
					const user = response.data.user;
					navigate(user.role === "admin" ? "/admin" : "/");
				})
				.catch((error) => {
					toast.error("Google login failed");
				})
				.finally(() => {
					setLoadingGoogleLogin(false);
				});
		},
	});

	function handleLogin() {
		setLoadingEmailLogin(true);
		axios
			.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
				email,
				password,
			})
			.then((response) => {
				toast.success("Login successful");
				localStorage.setItem("token", response.data.token);
				const user = response.data.user;
				navigate(user.role === "admin" ? "/admin" : "/");
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || "Login failed");
			})
			.finally(() => {
				setLoadingEmailLogin(false);
			});
	}

	return (
		<div
			className="w-full h-screen bg-cover bg-center flex items-center justify-start px-25"
			style={{ backgroundImage: "url('/log.jpeg')" }}
		>
			<div className="w-[90%] h-[65%] max-w-[450px] py-8 px-4 backdrop-blur-4xl shadow-2xl rounded-xl flex flex-col items-center">
				<h2 className="text-4xl font-bold text-center text-black mb-6">Login</h2>

				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					className="w-full p-3 mb-4 rounded-xl border border-white bg-transparent text-black placeholder-gray-600 text-center focus:outline-none focus:ring-2 focus:ring-[#E41F7B]"
				/>

				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="w-full p-3 mb-4 rounded-xl border border-white bg-transparent text-black placeholder-gray-600 text-center focus:outline-none focus:ring-2 focus:ring-[#E41F7B]"
				/>

				<button
					onClick={handleLogin}
					disabled={loadingEmailLogin || loadingGoogleLogin}
					className="w-full p-3 mb-4 bg-[#E41F7B] hover:bg-[#86003C] text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
				>
					{loadingEmailLogin ? "Loading..." : "Login"}
				</button>

				<button
					onClick={loginWithGoogle}
					disabled={loadingGoogleLogin || loadingEmailLogin}
					className="w-full p-3 mb-6 flex items-center justify-center gap-2 border border-black/40 hover:bg-[#86003C] hover:text-white text-black transition-all duration-300 rounded-xl disabled:opacity-50"
				>
					<GrGoogle className="text-xl" />
					{loadingGoogleLogin ? "Loading..." : "Login with Google"}
				</button>

				<div className="text-center text-m text-black mb-2">
					Don't have an account?{" "}
					<Link to="/register" className="text-[#E41F7B] hover:text-[#FF8BA0] ">
						Register Now
					</Link>
				</div>
				<div className="text-center text-m text-black">
					Forgot your password?{" "}
					<Link to="/forget" className="text-[#E41F7B] hover:text-[#FF8BA0] ">
						Reset Password
					</Link>
				</div>
			</div>
		</div>
	);
}
