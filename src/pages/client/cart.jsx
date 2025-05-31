import { TbTrash } from "react-icons/tb";
import getCart, {
	addToCart,
	getTotal,
	getTotalForLabelledPrice,
	removeFromCart,
} from "../../utils/cart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
	const [cartLoaded, setCartLoaded] = useState(false);
	const [cart, setCart] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!cartLoaded) {
			const cart = getCart();
			setCart(cart);
			setCartLoaded(true);
		}
	}, [cartLoaded]);

	return (
		<div className="min-h-screen w-full bg-[#F8F6F4] p-6 flex justify-center">
			<div className="w-full max-w-4xl">
				<h1 className="text-3xl font-bold text-black mb-6 text-center">Your Shopping Cart</h1>

				{cart.length === 0 ? (
					<div className="text-center text-gray-500 text-lg">
						Your cart is empty 🛒
					</div>
				) : (
					<>
						<div className="space-y-4">
							{cart.map((item, index) => (
								<div
									key={index}
									className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow p-4 relative"
								>
									<button
										className="absolute top-2 right-2 text-white bg-[#FF8BA0] hover:bg-[#E41F7B] p-2 rounded-full"
										onClick={() => {
											removeFromCart(item.productId);
											setCartLoaded(false);
										}}
									>
										<TbTrash />
									</button>

									<img
										src={item.image}
										className="w-24 h-24 object-cover rounded-md"
										alt={item.name}
									/>

									<div className="flex-1 lg:ml-6 mt-4 lg:mt-0 w-full">
										<h2 className="text-lg font-semibold">{item.name}</h2>
										<p className="text-sm text-gray-500">
											{item.altNames.join(" | ")}
										</p>
										<p className="text-sm text-gray-500">LKR {item.price.toFixed(2)}</p>
									</div>

									<div className="flex items-center mt-4 lg:mt-0">
										<button
											onClick={() => {
												addToCart(item, -1);
												setCartLoaded(false);
											}}
											className="bg-[#E41F7B] text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:bg-[#c21768] transition"
										>
											-
										</button>
										<span className="mx-3 font-bold text-lg">{item.quantity}</span>
										<button
											onClick={() => {
												addToCart(item, 1);
												setCartLoaded(false);
											}}
											className="bg-[#E41F7B] text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:bg-[#c21768] transition"
										>
											+
										</button>
									</div>

									<div className="mt-4 lg:mt-0 text-right w-24 font-semibold text-gray-700">
										LKR {(item.price * item.quantity).toFixed(2)}
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 bg-white rounded-xl shadow p-6 space-y-2">
							<div className="flex justify-between text-lg">
								<span className="text-gray-600">Subtotal:</span>
								<span>LKR {getTotalForLabelledPrice().toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-lg">
								<span className="text-gray-600">Discount:</span>
								<span className="text-[#FF8BA0]">
									- LKR {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between text-xl font-bold border-t pt-4 border-dashed border-[#E41F7B]">
								<span>Net Total:</span>
								<span className="text-[#E41F7B]">LKR {getTotal().toFixed(2)}</span>
							</div>
						</div>

						<div className="flex justify-end mt-6 gap-4">
							<button
								onClick={() => navigate("/products")}
								className="px-5 py-2 rounded-lg bg-white border border-[#FF8BA0] text-[#FF8BA0] hover:bg-[#FF8BA0] hover:text-white transition"
							>
								Continue Shopping
							</button>

							<button
								onClick={() =>
									navigate("/checkout", {
										state: { items: cart },
									})
								}
								className="px-6 py-2 rounded-lg bg-[#E41F7B] text-white hover:bg-[#c21768] transition font-medium"
							>
								Proceed to Checkout
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
