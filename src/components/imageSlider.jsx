import { useState } from "react";

export default function ImageSlider({ images }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div className="bg-white w-[70%] aspect-square rounded-2xl shadow-xl relative overflow-hidden ">
        <img
          src={activeImage}
          className="w-full h-full object-cover rounded-2xl"
          alt="Active"
        />

        <div className="hidden lg:flex h-[100px] w-full bg-white/30 backdrop-blur-md absolute bottom-0 left-0 justify-center items-center gap-2 p-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => setActiveImage(image)}
              className={`h-full aspect-square cursor-pointer rounded-lg transition-all duration-300 border-2 ${
                activeImage === image
                  ? "border-[#E41F7B] scale-105"
                  : "border-transparent hover:opacity-80"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-[-100px] w-full h-[100px] flex lg:hidden justify-center items-center gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => setActiveImage(image)}
              className={`h-[70px] aspect-square cursor-pointer rounded-full transition-all duration-300 border-2 ${
                activeImage === image
                  ? "border-[#E41F7B] scale-105"
                  : "border-gray-300 hover:opacity-80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
