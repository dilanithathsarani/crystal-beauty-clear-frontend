import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	function handleRegister() {
		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		setLoading(true);
		const payload = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			phone: formData.phone,
			password: formData.password,
		};

		axios
			.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", payload)
			.then((response) => {
				console.log("Registration successful", response.data);
				toast.success("Registration successful");
				navigate("/login");
			})
			.catch((error) => {
				console.log("Registration failed", error?.response?.data);
				toast.error(error?.response?.data?.message || "Registration failed");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<div className="w-full h-screen bg-[url(/signup.jpeg)] bg-cover bg-center flex">
			<div className="m-[-20px] h-full"></div>
			<div className="w-[50%] h-full flex justify-center items-center">
				<div className="w-[450px] h-auto py-8 px-4 backdrop-blur-xl shadow-xl rounded-xl flex flex-col items-center">
    				<h2 className="text-4xl font-bold text-black mb-6">Sign Up</h2>

					<input
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						className="w-full p-3 mb-4 rounded-xl border border-white bg-transparent text-black placeholder-gray-600 text-center focus:outline-none focus:ring-2 focus:ring-[#E41F7B]"
						type="text"
						placeholder="First Name"
					/>
					<input
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						className="w-full p-3 mb-4 rounded-xl border border-white bg-transparent text-black placeholder-gray-600 text-center focus:outline-none focus:ring-2 focus:ring-[#E41F7B]"
						type="text"
						placeholder="Last Name"
					/>
					<input
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-3 mb-4 rounded-xl border border-white bg-transparent text-black placeholder-gray-600 text-center focus:outline-none focus:ring-2 focus:ring-[#E41F7B]"
						type="email"
						placeholder="Email"
					/>
					<input
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className="w-full p-3 mb-4 rounded-xl border border-white bg-transparent text-black placeholder-gray-600 text-center focus:outline-none focus:ring-2 focus:ring-[#E41F7B]"
						type="text"
						placeholder="Phone"
					/>
					<input
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="w-full p-3 mb-4 rounded-xl border border-white bg-transparent text-black placeholder-gray-600 text-center focus:outline-none focus:ring-2 focus:ring-[#E41F7B]"
						type="password"
						placeholder="Password"
					/>
					<input
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						className="w-full p-3 mb-4 rounded-xl border border-white bg-transparent text-black placeholder-gray-600 text-center focus:outline-none focus:ring-2 focus:ring-[#E41F7B]"
						type="password"
						placeholder="Confirm Password"
					/>
					<button
						onClick={handleRegister}
						className="w-full p-3 mb-3 mt-3 bg-[#E41F7B] hover:bg-[#86003C] text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
					>
						{loading ? "Registering..." : "Register"}
					</button>
					<p className="text-black text-center m-[10px]">
						Already have an account?
						&nbsp;
						<span className="text-[#E41F7B] hover:text-[#FF8BA0]">
							<Link to={"/login"}>Login Now</Link>
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
