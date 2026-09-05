import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useAddToCart } from "../hooks/useCart";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function ProductPage() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(id!);

  const { data: user } = useCurrentUser();
  const { mutate: addToCart, isPending } = useAddToCart();

  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError || !product) {
    return <div>Product not found.</div>;
  }
  const handleAddToCart = () => {
    addToCart({
      userId: user.id,
      productId: product.id,
    });
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-gray-100">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-medium text-gray-100">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 leading-7 text-gray-100">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={!user || isPending}
            className="mt-6 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-600/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Adding..." : "Add to cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
