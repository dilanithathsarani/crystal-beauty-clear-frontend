import { useState } from "react"

export default function ImageSlider(props){
    const images = props.images
    const [activeImage , setActiveImage] = useState(images[0])

    return(
        <div className="w-full h-full  flex justify-center items-center">
            <div className="bg-green-900 w-[70%] aspect-square relative">
                <img src={activeImage} className="w-full h-full object-cover"/>
                <div className="hidden lg:flex h-[100px] w-full backdrop-blur-3xl absolute bottom-0 left-0 justify-center items-center">
                    {
                        images.map(
                            (image,index)=>{
                                return(
                                    <img key={index} src={image} className="h-full aspect-square mx-[5px] cursor-pointer" onClick={
                                        ()=>{
                                            setActiveImage(image)
                                        }
                                    }/>
                                )                                
                            }
                        )
                    }
                </div>
                <div className="absolute bottom-[-100px] w-full h-[100px] flex lg:hidden justify-center items-center">
                    {
                        images.map(
                            (image,index)=>{
                                return(
                                    <img key={index} src={image} className="h-[70px] aspect-square mx-[5px] rounded-full cursor-pointer" onClick={
                                        ()=>{
                                            setActiveImage(image)
                                        }
                                    }/>
                                )                                
                            }
                        )
                    }
                </div>

            </div>
        </div>
    )
}