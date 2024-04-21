"use client";

import WishlistOrBuy from "@/components/products/WishlistOrBuy";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/actions/action";
import { useUserProfileStore } from "@/store/store";
import { useCartStore } from "@/store/useCart";
import { ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { signedInUser } = useUserProfileStore((state) => ({
    signedInUser: state.signedInUser,
  }));
  const [isWishListed, setIsWishListed] = useState<Boolean>(true);

  const { addItemToCart, cartItems } = useCartStore((state) => ({
    cartItems: state.cartItems,
    addItemToCart: state.addItemToCart,
    removeItemFromCart: state.removeItemFromCart,
  }));

  const [wishlistedProducts, setIsWishListedProducts] = useState<any[]>([]);
  const router = useRouter();

  const fetchWishlistedProducts = async () => {
    const products = await Promise.all(
      signedInUser?.wishlist?.map(async (pId) => await getProduct(pId))
    );
    setIsWishListedProducts(products);
  };

  useEffect(() => {
    fetchWishlistedProducts();
  }, [signedInUser, wishlistedProducts]);

  return (
    <div className="py-44 pl-40 pr-24">
      <div className="text-center text-6xl  mb-16 underline">Your wishlist</div>
      <div className="flex flex-col gap-8">
        {wishlistedProducts?.map((product: ProductType) => (
          <div key={product._id} className="flex gap-8 border-b pb-5 border-gray-300 ">
            <Image
              className="w-80 h-64 object-cover rounded-lg border border-zinc-300 cursor-pointer"
              src={product?.media?.at(0) as string}
              alt={product.title}
              width={2400}
              height={2400}
              onClick={() => router.push(`/products/${product._id}`)}
            />
            <div className="flex flex-col gap-3 w-3/5 " >
              <p className=" text-black  text-2xl">
                {product?.title}
              </p>
              <p className=" text-gray-400 font-thin  text-base">
                {product?.description}
              </p>
             <section className="flex items-center gap-3">
             <aside className="flex items-center space-x-0.5">
                  <Star size={20} fill="#afc4d1" color="#808080" />
                  <Star size={20} fill="#afc4d1" color="#808080"  />
                  <Star size={20} fill="#afc4d1" color="#808080"  />
                  <Star size={20} fill="#afc4d1" color="#808080"  />
                  <Star size={20} fill="white" color="#808080"  />
                </aside>
                <aside className="flex gap-2 items-center text-base font-semibold text-zinc-400">
                  <p>4.2</p>
                  <p>|</p>
                  <p className="tracking-wider">1289 Reviews</p>
                </aside>
             </section>
              <p className=" text-gray-600 font-thin  text-base ">
              ₹ {product?.price}
              </p>

              <div className="flex items-center gap-4">
                {cartItems?.some((item) => item?.item?._id === product?._id) ? (
                  <>
                    <Button
                      onClick={() => router.push("/cart")}
                      className=" bg-orange-500 flex items-center gap-2 hover:bg-orange-600 transition-all duration-300 text-white py-2 text-base shadow-2xl px-4 rounded-full  "
                    >
                      <ShoppingBag />
                      Go to Cart
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      addItemToCart({
                        item: product,
                        quantity: 1,
                        color: product?.colors[0],
                        size: product?.sizes[0],
                      });
                    }}
                    className=" bg-[#81b0ce] flex items-center gap-2 hover:bg-[#4598cc] transition-all duration-300 text-white py-2 text-base shadow-2xl px-4 rounded-full  "
                  >
                    {}
                    <ShoppingBag />
                    Add to Cart
                  </Button>
                )}
                {signedInUser && (
                  <WishlistOrBuy
                    {...{
                      isWishListed,
                      setIsWishListed,
                      signedInUser,
                      product,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default page;
