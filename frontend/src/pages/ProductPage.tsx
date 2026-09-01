import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";


export default function ProductPage() {
   const { id } = useParams();

  const {
      data: product,
      isLoading,
      isError,
  } = useProduct(id!);

  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (isError || !product) {
      return <div>Product not found.</div>;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Product image */}
        <div className="overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          {/* <p className="mb-2 text-sm text-gray-500">Electronics</p> */}

          <h1 className="text-3xl font-semibold text-gray-100">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-medium text-gray-100">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 leading-7 text-gray-100">
            {product.description}
          </p>

          {/* Quantity */}
          {/* <div className="mt-8 flex items-center gap-3">
            <span className="text-sm font-medium">Quantity</span>

            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-200 hover:bg-gray-100"
              >
                −
              </button>

              <span className="w-10 text-center">{product.quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-gray-200 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div> */}

          <button className="mt-6 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-600/80">
            Add to cart
          </button>

          {/* Specifications */}
          {/* <div className="mt-10 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold">Specifications</h2>

            <dl className="mt-4 space-y-3">
              {product.specs.map(([name, value]) => (
                <div
                  key={name}
                  className="flex justify-between border-b border-gray-100 pb-2 text-sm"
                >
                  <dt className="text-gray-500">{name}</dt>
                  <dd className="font-medium text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div> */}
        </div>
      </div>
    </main>
  );
}