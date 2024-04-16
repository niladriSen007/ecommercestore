"use client";
import { Heart, LeafyGreen, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserProfileStore } from "@/store/store";
import WishlistOrBuy from "./WishlistOrBuy";
import { useCartStore } from "@/store/useCart";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const [isWishListed, setIsWishListed] = useState<Boolean>(true);

  const { signedInUser  } = useUserProfileStore((state) => ({
    signedInUser: state.signedInUser,
  }));

  const { addItemToCart, cartItems } = useCartStore((state) => ({
    cartItems: state.cartItems,
    addItemToCart: state.addItemToCart,
    removeItemFromCart: state.removeItemFromCart,
  }));

  /* console.log(signedInUser,"User data") */

  return (
    <div key={product?._id} className="flex flex-col gap-2 relative">
      {parseInt(product?.price?.toString()) > 10000 && (
        <div className="shadow-2xl absolute top-2 left-2 bg-zinc-200 text-blue-400 rounded-full px-2 flex gap-1 items-center">
          <LeafyGreen size={16} /> Limited Edition
        </div>
      )}
      {
        isWishListed && (
          <div className="absolute right-3 top-3">

          <Heart fill="red" color="red" />
          </div>
        )
      }

      <Image
        className="w-80 h-64 object-cover rounded-lg border border-zinc-300 cursor-pointer"
        src={product?.media?.at(index) as string}
        alt={product.title}
        width={2400}
        height={2400}
        onClick={() => router.push(`/products/${product._id}`)}
        onMouseLeave={() => setIndex(0)}
        onMouseOver={() => {
          if (index < product.media.length - 1) {
            setIndex(index + 1);
          } else {
            setIndex(0);
          }
        }}
      />
      <p className=" text-black font-medium text-lg ">
        {product?.title?.slice(0, 20)}
      </p>
      <p className="text-sm text-black font-medium">
        ₹ {product?.price} (
        {Math.round(parseInt(product?.price.toString()) / 1000)}% off)
      </p>
      <div className="flex items-center gap-4">
      {cartItems?.some((item) => item?.item?._id === product?._id) ? (
          <>
            <Button onClick={()=>router.push("/cart")} className=" bg-orange-500 flex items-center gap-2 hover:bg-orange-600 transition-all duration-300 text-white py-2 text-base shadow-2xl px-4 rounded-full  ">
              
              <ShoppingBag />
              Go to Cart
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              addItemToCart({
             
                item: product,
                quantity : 1,
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
       { signedInUser && <WishlistOrBuy {...{ isWishListed, setIsWishListed,signedInUser,product }} />}
      </div>
    </div>
  );
};
export default ProductCard;
