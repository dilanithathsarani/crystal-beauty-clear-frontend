import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import Review from "./client/reviews";
import ContactUs from "./client/contactUs";

export default function HomePage(){
    return(
        <div className="w-full h-screen bg-[#F8F6F4]">
            <Header/>
            <div className="w-full h-[calc(100vh-70px)] min-h-[calc(100vh-70px)]  ">
                <Routes path="/*">
                    <Route path="/" element={<h1>Home page</h1>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/reviews" element={<Review/>}/>
                    <Route path="/contact" element={<ContactUs/>}/>
                    <Route path="/overview/:id" element={<ProductOverview/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/*" element={<h1>404 Not found</h1>}/>
                </Routes>
            </div>
        </div>
    )
}