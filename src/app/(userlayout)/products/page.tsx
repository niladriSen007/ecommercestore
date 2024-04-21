import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/actions/action";
import { LeafyGreen, ShoppingBag } from "lucide-react";
import Image from "next/image";

const page = async() => {

    const products = await getProducts();


  return (
    <>
      <section className="py-48 mx-40 ">
        <p className="text-6xl text-center text-black mb-12 underline">Our Products</p>
        <section className="grid grid-cols-4 gap-24 place-items-center">
          {products?.length == 0 ? (
            <p>No products available</p>
          ) : (
            products?.map((product: ProductType) => (
              <ProductCard key={product?._id} product={product}  />
            ))
          )}
        </section>
      </section>
    </>
  )
}
export default page