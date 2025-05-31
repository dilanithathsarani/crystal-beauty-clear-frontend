import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/overview/${product.productId}`}
      className="w-[250px] m-4 h-[360px] rounded-2xl shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105 hover:shadow-pink-300"
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-[220px] object-cover"
      />
      <div className="h-[140px] p-4 flex flex-col justify-between">
        <p className="text-sm text-gray-400">{product.productId}</p>
        <p className="text-lg font-semibold text-black">{product.name}</p>
        <p className="text-lg font-bold text-[#FF8BA0]">
          LKR.{product.price.toFixed(2)}{" "}
          {product.price < product.labeledPrice && (
            <span className="line-through text-sm text-gray-400 ml-2">
            LKR.{product.labeledPrice.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
