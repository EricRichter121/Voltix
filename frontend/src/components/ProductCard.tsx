import { PlusCircleIcon } from 'lucide-react'
import type { Product } from "../types/product.types"
import { Link } from 'react-router-dom'

function ProductCard({ product }: { product: Product }) {
  return (
    <div key={product.id} className="border rounded-lg p-4 shadow-md min-h-60 min-w-60 flex flex-col">
        <Link to={`/product/${product.id}`}>
            <div className="relative w-full min-h-60 bg-slate-100 shrink-0">
                <img 
                    src={product.imageUrl} 
                    alt="Product Image" 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    />
            </div>
            <h2 className="border-b pb-2 text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg text-right mb-4">${product.price.toFixed(2)}</p>
            <button className="btn btn-primary mt-auto flex items-center justify-center">
                <PlusCircleIcon className="size-5" />
                <span>Add to Cart</span>
            </button>
        </Link>
    </div>
  )
}

export default ProductCard