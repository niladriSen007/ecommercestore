import { getProducts } from "@/lib/actions/action";
import { Button } from "../ui/button";
import Image from "next/image";
import { LeafyGreen, ShoppingBag } from "lucide-react";
import ProductCard from "./ProductCard";

const Products = async() => {

    const products = await getProducts();

  return (
    <>
      <section className="my-24 mx-auto">
        <p className="text-6xl text-center text-black mb-12">Our Featured Products</p>
        <section className="grid grid-cols-4 gap-16">
          {products?.length == 0 ? (
            <p>No products available</p>
          ) : (
            products?.slice(0,8)?.map((product: ProductType) => (
              <ProductCard key={product?._id} product={product} />
            ))
          )}
        </section>
      </section>
    </>
  )
}
export default Products