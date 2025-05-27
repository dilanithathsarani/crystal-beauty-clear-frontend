import { TbTrash } from "react-icons/tb"
import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CartPage(){
    const [cartLoaded , setCartLoaded] = useState(false)
    const [cart , setCart] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        if(cartLoaded == false){
            const cart = getCart()
            setCart(cart)
            setCartLoaded(true)
        }
    },[cartLoaded])
    return(
        <div className="w-full h-full flex justify-center p-[40px] ">
            <div className="w-full lg:w-[700px]">
                {
                    cart.map((item , index)=>{
                        return(
                            <div key={index} className="w-full lg:h-[100px] bg-white shadow-2xl my-[5px] flex lg:flex-row flex-col justify-between items-center relative">
                                <button className="absolute right-4 lg:right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer" 
                                onClick={()=>{
                                    removeFromCart(item.productId)
                                    setCartLoaded(false)
                                }}>
                                    <TbTrash  />
                                </button>
                                <img src={item.image} className="h-[100px] lg:h-full aspect-square object-cover"/>
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                    <h1 className="text-xl font-bold">{item.name}</h1>
                                    <h2 className="text-lg text-gray-500">{item.altNames.join(" | ")}</h2>
                                    <h2 className="text-lg text-gray-500">LKR: {item.price.toFixed(2)}</h2>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                    onClick={()=>{
                                        addToCart(item,-1)
                                        setCartLoaded(false)
                                    }}>-</button>
                                        <h1 className="text-xl font-bold">{item.quantity}</h1>
                                    <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                    onClick={()=>{
                                        addToCart(item,1)
                                        setCartLoaded(false)
                                    }}>+</button>

                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <h1 className="text-xl w-full text-end pr-2">{(item.price * item.quantity).toFixed(2)}</h1>
                                </div>
                            </div>
                        )

                    })
                }
                <div className="w-full  flex justify-end">
                    <h1 className="w-[100px] text-xl  text-end pr-2">Total</h1>
                    <h1 className="w-[100px] text-xl  text-end pr-2">{getTotalForLabelledPrice().toFixed(2)}</h1>
                </div>
                <div className="w-full  flex justify-end">
                    <h1 className="w-[100px] text-xl  text-end pr-2">Discount</h1>
                    <h1 className="w-[100px] text-xl border-b-[2px] text-end pr-2">{(getTotalForLabelledPrice()-getTotal()).toFixed(2)}</h1>
                </div>
                <div className="w-full  flex justify-end">
                    <h1 className="w-[100px] text-xl  text-end pr-2">Net total</h1>
                    <h1 className="w-[100px] text-xl  text-end pr-2 border-b-[4px] border-double ">{getTotal().toFixed(2)}</h1>
                </div>
                <div className="w-full  flex justify-end mt-4">
                    <button className="w-[170px] text-xl  text-center shadow pr-2 bg-pink-400 text-white h-[40px] rounded-lg cursor-pointer" onClick={()=>{
                        navigate("/checkout",
                            {
                                state : {
                                    items : cart
                                }
                            }
                        )
                    }}>Checkout</button>
                </div>
            </div>
        </div>
    )
}