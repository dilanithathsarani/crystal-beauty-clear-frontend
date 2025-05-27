import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/product-card"

export default function ProductsPage(){
    const [productList, setProductList] = useState([])
    const [productsLoaded,setProductsLoaded] = useState(false)
    const [search, setSearch] = useState(" ")
    useEffect(
        ()=>{
            if(!productsLoaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/").then(
                    (res)=>{
                        setProductList(res.data)
                        setProductsLoaded(true)
                    }
                )
            }
            
        },[productsLoaded]
    )
    function searchProducts(){
        if(search.length > 0){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/search/"+search).then(
                (res)=>{
                    setProductList(res.data.products)
                }
            )
        }
    }
    return(
       <div className="h-full w-full ">
            <div className="w-full h-[50px] flex items-center justify-center">
                <input type="text" placeholder="Search" value={search} className="w-[300px] h-[30px] border-2 border-gray-300 rounded-md p-2" onChange={(e)=>{setSearch(e.target.value)}}/>
                <button className="bg-blue-500 text-white p-2 rounded-md ml-2" onClick={()=>{
                    searchProducts()
                }}>Search</button>
                <button className="bg-blue-500 text-white p-2 rounded-md ml-2" onClick={()=>{
                    setProductsLoaded(false)
                }
                }>Reset</button>
            </div>
            {
                productsLoaded?
                <div className="w-full h-full flex flex-wrap justify-center">
                    {
                        productList.map(
                            (product)=>{
                                return(
                                    <ProductCard key={product.productId} product={product}/>
                                )
                                
                            }
                        )
                    }
                </div>
                :
                <Loader/>
            }
       </div>
    )
}