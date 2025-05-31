import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";
import { AiOutlineClose } from "react-icons/ai"; // Importing the icon

export default function ProductsPage() {
	const [productList, setProductList] = useState([]);
	const [productsLoaded, setProductsLoaded] = useState(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (!productsLoaded) {
			axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then((res) => {
				setProductList(res.data);
				setProductsLoaded(true);
			});
		}
	}, [productsLoaded]);

	function searchProducts() {
		if (search.trim().length > 0) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search)
				.then((res) => {
					setProductList(res.data.products);
				});
		}
	}

	return (
		<div className="min-h-screen w-full bg-[#F8F6F4] py-10 px-4">
			{/* Search Section */}
			<div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
				<div className="relative w-full sm:w-[300px]">
					<input
						type="text"
						placeholder="Search products..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full h-[40px] border border-[#FF8BA0] rounded-md px-4 pr-10 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E41F7B]"
					/>
					{search && (
						<AiOutlineClose
							onClick={() => setSearch("")}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#E41F7B] cursor-pointer hover:text-red-600"
							size={18}
						/>
					)}
				</div>

				<button
					className="bg-[#E41F7B] text-white font-medium px-4 py-2 rounded-md hover:bg-white hover:text-[#E41F7B] border-2 border-[#E41F7B] transition-all duration-300"
					onClick={searchProducts}
				>
					Search
				</button>
				<button
					className="bg-[#FF8BA0] text-white font-medium px-4 py-2 rounded-md hover:bg-white hover:text-[#FF8BA0] border-2 border-[#FF8BA0] transition-all duration-300"
					onClick={() => setProductsLoaded(false)}
				>
					Reset
				</button>
			</div>

			{/* Product Grid */}
			{productsLoaded ? (
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 place-items-center">
					{productList.map((product) => (
						<ProductCard key={product.productId} product={product} />
					))}
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}
