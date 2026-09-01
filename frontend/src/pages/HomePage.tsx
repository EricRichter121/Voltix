import { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
// import { PlusCircleIcon } from 'lucide-react'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  console.log('Products:', products);
  
  try {
    products.map((product) => {
      console.log('imageUrl: ', product.imageUrl);
      
    })
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="container mx-auto p-4 max-w-6xl ">

      <div className="mb-6">
        {loading ? (
          <h2 className="text-center text-xl font-semibold">Loading products...</h2>
        ) : (
          <h2 className="text-center text-2xl font-semibold">Products</h2>
        )
      }
      </div>

      {error && <p className="alert alert-error">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
      </div>
    </main>
  )
}

export default HomePage