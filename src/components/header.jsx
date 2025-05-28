import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="h-[70px] w-full flex justify-between items-center px-4 lg:px-8 relative bg-gradient-to-r from-[#000000] via-[#86003C] via-[#FF8BA0] to-white">
			
			<RxHamburgerMenu
				className="lg:hidden text-3xl text-[#FF8BA0]"
				onClick={() => setIsOpen(true)}
			/>

			<div className="hidden lg:flex gap-8 text-[#FF8BA0] text-lg font-semibold">
				<Link to="/" className="hover:text-white transition">Home</Link>
				<Link to="/products" className="hover:text-white transition">Products</Link>
				<Link to="/contact" className="hover:text-white transition">Contact Us</Link>
				<Link to="/reviews" className="hover:text-white transition">Reviews</Link>
			</div>

			<div className="flex items-center gap-6">
				<UserData />
				<Link to="/cart" className="text-2xl text-[#FF8BA0] hover:text-black/70 transition">
					<BsCart4 />
				</Link>
			</div>

			{isOpen && (
				<div className="fixed inset-0 z-50 bg-black/60 flex">
					<div className="w-[250px] bg-[#000000] text-[#FF8BA0] p-6 flex flex-col">
						<RxHamburgerMenu
							className="text-3xl mb-6 hover:text-white cursor-pointer"
							onClick={() => setIsOpen(false)}
						/>
						<Link to="/" className="my-3 text-lg hover:text-white" onClick={() => setIsOpen(false)}>Home</Link>
						<Link to="/products" className="my-3 text-lg hover:text-white" onClick={() => setIsOpen(false)}>Products</Link>
						<Link to="/contact" className="my-3 text-lg hover:text-white" onClick={() => setIsOpen(false)}>Contact Us</Link>
						<Link to="/reviews" className="my-3 text-lg hover:text-white" onClick={() => setIsOpen(false)}>Reviews</Link>
						<Link to="/cart" className="my-3 text-lg hover:text-white" onClick={() => setIsOpen(false)}>Cart</Link>
					</div>
				</div>
			)}
		</header>
	);
}
