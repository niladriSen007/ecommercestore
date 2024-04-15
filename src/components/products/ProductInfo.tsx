"use client";

import { useState } from "react";
/* import HeartFavorite from "./HeartFavorite"; */
import { Heart, MinusCircle, PlusCircle, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import WishlistOrBuy from "./WishlistOrBuy";
import { motion } from "framer-motion";
import { useUserProfileStore } from "@/store/store";
import { useCartStore } from "@/store/useCart";
import { useRouter } from "next/navigation";

/* import useCart from "@/lib/hooks/useCart"; */

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {

  const router = useRouter()
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo?.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo?.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const { signedInUser } = useUserProfileStore((state) => ({
    signedInUser: state.signedInUser,
    addOrRemoveFromWishlist: state.addOrRemoveFromWishlist,
  }));

  /* const cart = useCart() */

  const { addItemToCart, cartItems } = useCartStore((state) => ({
    cartItems: state.cartItems,
    addItemToCart: state.addItemToCart,
    removeItemFromCart: state.removeItemFromCart,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.1 }}
      className="max-w-[400px] flex flex-col gap-4"
    >
      <div className="flex justify-between  items-start">
        <p className=" font-bold text-5xl bg-gradient-to-t from-slate-800 leading-tight  to-[#043a5e] bg-clip-text text-transparent ">
          {productInfo?.title}
        </p>
        {/* <HeartFavorite product={productInfo} /> */}
        {signedInUser?.wishlist?.includes(productInfo?._id) ? (
          <div className="">
            <Button className="bg-zinc-200 p-2 rounded-full shadow-2xl hover:bg-zinc-300">
              <Heart fill="red" color="red" />
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Category:</p>
        <p className="text-base font-bold text-gray-400">
          {productInfo?.category}
        </p>
      </div>

      <p className="text-2xl font-semibold">₹ {productInfo?.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-lg text-gray-800">Description:</p>
        <p className="text-base text-gray-500 leading-snug">
          {productInfo?.description}
        </p>
      </div>

      {productInfo?.colors?.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Colors:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={` border border-[#83acc5] px-3 py-1 rounded-full cursor-pointer ${
                  selectedColor === color && "bg-[#83acc5]"
                } ${selectedColor === color && "text-white"}`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productInfo?.sizes?.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Sizes:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-[#83acc5] px-3 py-1 rounded-full cursor-pointer ${
                  selectedSize === size && "bg-[#83acc5] text-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <div className="flex items-center gap-6 my-3">
        {cartItems?.some((item) => item?.item?._id === productInfo?._id) ? (
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
             
                item: productInfo,
                quantity,
                color: selectedColor,
                size: selectedSize,
              });
            }}
            className=" bg-[#81b0ce] flex items-center gap-2 hover:bg-[#4598cc] transition-all duration-300 text-white py-2 text-base shadow-2xl px-4 rounded-full  "
          >
            {}
            <ShoppingBag />
            Add to Cart
          </Button>
        )}
        <WishlistOrBuy product={productInfo} />
      </div>
    </motion.div>
  );
};

export default ProductInfo;
