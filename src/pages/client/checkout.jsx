import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
	const location = useLocation();
	const [cart, setCart] = useState(location.state.items);
	const [cartRefresh, setCartRefresh] = useState(false);
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const navigate = useNavigate();

	function placeOrder() {
		const orderData = {
			name,
			address,
			phoneNumber: phone,
			billItems: cart.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
			})),
		};
		const token = localStorage.getItem("token");
		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/api/order`, orderData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				toast.success("Order placed successfully");
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
				toast.error("Order placement failed");
			});
	}

	function getTotal() {
		return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
	}

	function getTotalForLabelledPrice() {
		return cart.reduce((acc, item) => acc + item.labeledPrice * item.quantity, 0);
	}

	return (
		<div className="w-full min-h-screen bg-[#F8F6F4] flex justify-center py-10 px-4">
			<div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 space-y-6">
				<h1 className="text-3xl font-bold text-[#E41F7B]">Checkout</h1>

				{/* Cart Items */}
				{cart.map((item, index) => (
					<div
						key={index}
						className="flex flex-col lg:flex-row items-center bg-[#FF8BA0]/10 border border-[#FF8BA0] rounded-lg p-4 relative"
					>
						<button
							onClick={() => {
								setCart(cart.filter((p) => p.productId !== item.productId));
							}}
							className="absolute top-2 right-2 text-white bg-[#E41F7B] p-2 rounded-full"
						>
							<TbTrash />
						</button>
						<img src={item.image} alt="product" className="w-24 h-24 object-cover rounded-lg" />
						<div className="flex-1 px-4">
							<h2 className="text-xl font-semibold">{item.name}</h2>
							<p className="text-gray-500 text-sm">{item.altNames.join(" | ")}</p>
							<p className="text-sm">LKR {item.price.toFixed(2)}</p>
						</div>
						<div className="flex items-center space-x-2">
							<button
								onClick={() => {
									const newCart = [...cart];
									newCart[index].quantity = Math.max(1, newCart[index].quantity - 1);
									setCart(newCart);
									setCartRefresh(!cartRefresh);
								}}
								className="w-8 h-8 bg-[#E41F7B] text-white rounded-full"
							>
								-
							</button>
							<span className="font-bold">{item.quantity}</span>
							<button
								onClick={() => {
									const newCart = [...cart];
									newCart[index].quantity += 1;
									setCart(newCart);
									setCartRefresh(!cartRefresh);
								}}
								className="w-8 h-8 bg-[#E41F7B] text-white rounded-full"
							>
								+
							</button>
						</div>
						<div className="w-24 text-right font-semibold">
							LKR {(item.price * item.quantity).toFixed(2)}
						</div>
					</div>
				))}

				{/* Summary */}
				<div className="space-y-1 text-right">
					<p>Total: <span className="font-semibold">LKR {getTotalForLabelledPrice().toFixed(2)}</span></p>
					<p>Discount: <span className="font-semibold">LKR {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}</span></p>
					<p className="text-xl border-t pt-2">Net Total: <span className="font-bold text-[#E41F7B]">LKR {getTotal().toFixed(2)}</span></p>
				</div>

				{/* Input Fields */}
				<div className="space-y-4">
					<input
						type="text"
						placeholder="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full border-b-2 py-2 focus:outline-none"
					/>
					<input
						type="text"
						placeholder="Phone Number"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="w-full border-b-2 py-2 focus:outline-none"
					/>
					<textarea
						placeholder="Delivery Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="w-full border-b-2 py-2 focus:outline-none"
					></textarea>
				</div>

				{/* Place Order Button */}
				<div className="text-right">
					<button
						onClick={placeOrder}
						className="bg-[#E41F7B] text-white px-6 py-2 rounded-lg hover:bg-[#c21768] transition"
					>
						Place Order
					</button>
				</div>
			</div>
		</div>
	);
}
