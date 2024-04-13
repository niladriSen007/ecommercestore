import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/actions/action";
import { LeafyGreen, ShoppingBag } from "lucide-react";
import Image from "next/image";

const page = async() => {

    const products = await getProducts();


  return (
    <>
      <section className="py-48 mx-40 ">
        <p className="text-6xl text-center text-black mb-12">Our Products</p>
        <section className="grid grid-cols-4 gap-24 place-items-center">
          {products?.length == 0 ? (
            <p>No products available</p>
          ) : (
            products?.map((product: ProductType) => (
              <div
                key={product?._id}
                className="flex flex-col gap-2 relative"
              >
                { parseInt(product?.price.toString()) > 10000 && <div className="shadow-2xl absolute top-2 left-2 bg-zinc-200 text-blue-400 rounded-full px-2 flex gap-1 items-center">
                  <LeafyGreen size={16} /> New Arrival
                </div>}
                 <Image
                  className="w-64 h-64 object-cover rounded-lg border border-zinc-300"
                  src={product.media.at(0) as string}
                  alt={product.title}
                  width={2400}
                  height={2400}
                /> 
                <p className=" text-black font-medium text-lg ">{product.title.slice(0,20)}</p>
                <p className="text-xs text-black font-medium">₹ {product.price}</p>
                <Button className=" bg-[#81b0ce] flex items-center gap-2 hover:bg-[#4598cc] transition-all duration-300 text-white py-2 text-base shadow-2xl px-4 rounded-full  ">
                <ShoppingBag />
                Add to Cart
              </Button>
              </div>
            ))
          )}
        </section>
      </section>
    </>
  )
}
export default page