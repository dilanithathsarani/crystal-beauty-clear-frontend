import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../utils/cart";

export default function ProductOverview() {
	const params = useParams();
	if (params.id == null) {
		window.location.href = "/products";
	}

	const [product, setProduct] = useState(null);
	const [status, setStatus] = useState("loading");
	const navigate = useNavigate();

	useEffect(() => {
		if (status === "loading") {
			axios
				.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${params.id}`)
				.then((res) => {
					setProduct(res.data.product);
					setStatus("loaded");
				})
				.catch(() => {
					toast.error("Product is not available!");
					setStatus("error");
				});
		}
	}, [status]);

	return (
		<div className="w-full min-h-screen bg-[#F8F6F4]">
			{status === "loading" && <Loader />}
			{status === "loaded" && (
				<div className="w-full flex flex-col lg:flex-row px-4 lg:px-16 py-10 gap-10">
					{/* Mobile Heading */}
					<h1 className="text-3xl font-bold text-center mb-6 text-[#E41F7B] lg:hidden">
						{product.name}
						<span className="block text-lg text-gray-500">
							{product.altNames.join(" | ")}
						</span>
					</h1>

					{/* Image Section */}
					<div className="w-full lg:w-[65%] mt-[2%]">
						<ImageSlider images={product.images} />
					</div>

					{/* Product Info */}
					<div className="w-full lg:w-1/2 flex flex-col justify-center px-4">
						{/* Desktop Heading */}
						<h1 className="hidden lg:block text-4xl font-bold text-[#E41F7B] text-center mb-6">
							{product.name}
							<span className="block text-xl text-gray-500 mt-2">
								{product.altNames.join(" | ")}
							</span>
						</h1>

						{/* Price */}
						<div className="text-center mb-6">
							{product.labeledPrice > product.price ? (
								<>
									<h2 className="text-3xl font-semibold text-[#E41F7B]">
										LKR: {product.price.toFixed(2)}
									</h2>
									<h2 className="text-xl line-through text-gray-400 mt-1">
										LKR: {product.labeledPrice.toFixed(2)}
									</h2>
								</>
							) : (
								<h2 className="text-3xl font-semibold text-[#E41F7B]">
									LKR: {product.price.toFixed(2)}
								</h2>
							)}
						</div>

						{/* Description */}
						<p className="text-lg text-center text-gray-600 mb-8">
							{product.description}
						</p>

						{/* Buttons */}
						<div className="flex justify-center gap-6">
							<button
								className="bg-[#FF8BA0] hover:bg-white text-white hover:text-[#E41F7B] border-2 border-[#FF8BA0] font-medium px-6 py-3 rounded-lg transition duration-300"
								onClick={() => {
									addToCart(product, 1);
									toast.success("Product added to cart");
									console.log(getCart());
								}}
							>
								Add to Cart
							</button>

							<button
								onClick={() => {
									navigate("/checkout", {
										state: {
											items: [
												{
													productId: product.productId,
													name: product.name,
													altNames: product.altNames,
													price: product.price,
													labeledPrice: product.labeledPrice,
													image: product.images[0],
													quantity: 1,
												},
											],
										},
									});
								}}
								className="bg-[#E41F7B] hover:bg-white text-white hover:text-[#FF8BA0] border-2 border-[#E41F7B] font-medium px-6 py-3 rounded-lg transition duration-300"
							>
								Buy Now
							</button>
						</div>
					</div>
				</div>
			)}

			{status === "error" && (
				<div className="w-full h-full flex justify-center items-center text-red-500 font-bold text-2xl mt-10">
					Product Not Found
				</div>
			)}
		</div>
	);
}
