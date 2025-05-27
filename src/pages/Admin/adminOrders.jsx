import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
	const [displayingOrder, setDisplayingOrder] = useState(null);

	useEffect(() => {
		if (!loaded) {
			const token = localStorage.getItem("token");
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					setOrders(response.data);
					setLoaded(true);
					console.log(response.data);
				});
		}
	}, [loaded]);
	/*
    {
    "_id": "68179297609566291e7ccfc1",
    "orderId": "ORD0007",
    "email": "customer@gmail.com",
    "name": "Dilshan X",
    "address": "abc,456",
    "status": "Pending",
    "phoneNumber": "0777123789",
    "billItems": [
        {
            "productId": "COSM24003",
            "productName": "AquaFresh Face Wash",
            "image": "https://acfihbfmgdmhzxvboogf.supabase.co/storage/v1/object/public/images/174515966319584f4fd3735fd65a04e6c05bc45d72df7.jpg",
            "quantity": 2,
            "price": 499,
            "_id": "68179297609566291e7ccfc2"
        },
        {
            "productId": "COSM24004",
            "productName": "SunGuard SPF 50+",
            "image": "https://acfihbfmgdmhzxvboogf.supabase.co/storage/v1/object/public/images/1745159690195619e443b79141a8e7e080f38abaa5774.jpg",
            "quantity": 2,
            "price": 749,
            "_id": "68179297609566291e7ccfc3"
        }
    ],
    "total": 2496,
    "date": "2025-05-04T16:15:19.185Z",
    "__v": 0
}
    */

    function changeOrderStatus(orderId,status){
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/"+orderId, {
            status: status
        },{
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(
            ()=>{
                toast.success("Order status changed successfully");
                setLoaded(false)
            }
        )
        
    }

	return (
		<div className="w-full h-full ">
			{loaded ? (
				<div className="w-full h-full">
					<table className="w-full">
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Customer Email</th>
								<th>Customer Name</th>
								<th>Address</th>
								<th>Phone Number</th>
								<th>Status</th>
								<th>Total</th>
								<th>Date</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => {
								return (
									<tr
										key={order.orderId}
										className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100 "
									>
										<td className="p-2">{order.orderId}</td>
										<td className="p-2">{order.email}</td>
										<td className="p-2">{order.name}</td>
										<td className="p-2">{order.address}</td>
										<td className="p-2">{order.phoneNumber}</td>
										<td className="p-2">
											<select value={order.status} className="z-[50]" onChange={
                                                (e)=>{
                                                    changeOrderStatus(order.orderId,e.target.value)
                                                }
                                            }>
												<option value={"Pending"}>Pending</option>
												<option value={"Delivered"}>Delivered</option>
												<option value={"Cancelled"}>Cancelled</option>
												<option value={"Processing"}>Processing</option>
											</select>
										</td>
										<td className="p-2">{order.total.toFixed(2)}</td>
										<td className="p-2">
											{new Date(order.date).toDateString()}
										</td>
										<td className="p-2">
											<button
												className="bg-gray-700 text-white p-2 rounded-lg"
												onClick={() => {
													setModalIsDisplaying(true);
													setDisplayingOrder(order);
												}}
											>
												Details
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{modalIsDisplaying && (
						<div className="fixed bg-[#00000070] w-full h-full top-0 left-0 flex justify-center items-center">
							<div className="w-[600px] max-w-[600px] h-[600px] max-h-[600px] bg-white relative">
								<div className="w-full h-[150px] ">
									<h1 className="text-sm font-bold  p-2">
										Order ID: {displayingOrder.orderId}
									</h1>
									<h1 className="text-sm font-bold  p-2">
										Order Date: {new Date(displayingOrder.date).toDateString()}
									</h1>
									<h1 className="text-sm font-bold  p-2">
										Order Status: {displayingOrder.status}
									</h1>
									<h1 className="text-sm font-bold  p-2">
										Order Total: {displayingOrder.total.toFixed(2)}
									</h1>
								</div>
								<div className="w-full h-[450px] max-h-[450px] overflow-y-scroll">
									{displayingOrder.billItems.map((item, index) => {
										return (
											<div
												key={index}
												className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative"
											>
												<img
													src={item.image}
													className="h-full aspect-square object-cover"
												/>
												<div className="h-full max-w-[300px] w-[300px] overflow-hidden">
													<h1 className="text-xl font-bold">
														{item.productName}
													</h1>
													<h2 className="text-lg text-gray-500">
														LKR: {item.price.toFixed(2)}
													</h2>
													<h2 className="text-lg text-gray-500">
														Quantity: {item.quantity}
													</h2>
												</div>
											</div>
										);
									})}
								</div>
								<button
									className="w-[40px] absolute right-[-20px] top-[-20px] h-[40px] rounded-full  bg-white shadow shadow-black flex justify-center items-center"
									onClick={() => {
										setModalIsDisplaying(false);
									}}
								>
									<IoCloseSharp />
								</button>
							</div>
						</div>
					)}
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}
