"use client";
import { useCartStore } from "@/store/useCart";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItemFromCart } =
    useCartStore((state) => ({
      cartItems: state.cartItems,
      addItemToCart: state.addItemToCart,
      removeItemFromCart: state.removeItemFromCart,
      increaseQuantity: state.increaseQuantity,
      decreaseQuantity: state.decreaseQuantity,
    }));

  const totalRounded = cartItems
    ?.reduce(
      (acc, cartItem) => acc + cartItem?.item?.price * cartItem?.quantity,
      0
    )
    .toFixed(2);

  return (
    <div className="flex gap-20 py-44  mx-[12%] max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-4xl font-black">Shopping Cart</p>
        <hr className="my-6 border border-black" />
        <div className="flex items-center justify-between text-lg w-[88%] pl-4 ">
          <p className="text-heading4-bold">Image</p>
          <p className="text-heading4-bold">Product</p>
          <p className="text-heading4-bold">Quantity</p>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div>
            {cartItems?.map((cartItem) => (
              <div className="w-full flex gap-12 max-sm:flex-col max-sm:gap-3  hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between">
                <div className="flex gap-4 items-center">
                  <Image
                    src={cartItem?.item?.media[0]}
                    width={2400}
                    height={2400}
                    className="rounded-lg w-64 h-64 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-2 ml-4">
                    <p className="text-xl font-medium w-80 ">
                      Product name :{" "}
                      <span className="text-zinc-500 text-lg font-normal ">
                        {cartItem?.item?.title}
                      </span>
                    </p>
                    {cartItem?.color && (
                      <div className="text-xl font-medium flex items-center gap-2">
                       <span> Color :{" "}</span>
                        <div className="text-zinc-500 text-lg font-normal flex items-center gap-2">
                          <span>{cartItem?.color}</span>
                          <div className={`w-4 h-4 rounded-full bg-${cartItem?.color?.toLowerCase()}-600`}></div>
                        </div>
                      </div>
                    )}
                    {cartItem.size && (
                    /*   <p className="text-small-medium">{cartItem.size}</p> */
                      <p className="text-xl font-medium">
                      Size :{" "}
                      <span className="text-zinc-500 text-lg font-normal ">
                        {cartItem.size}
                      </span>
                    </p>
                    )}
                   
                    <p className="text-xl font-medium">
                      Price :{" "}
                      <span className="text-zinc-500 text-lg font-normal ">
                      ₹{cartItem?.item?.price}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => decreaseQuantity(cartItem?.item?._id)}
                  />
                  <p className="text-body-bold">{cartItem?.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => increaseQuantity(cartItem?.item?._id)}
                  />
                </div>

                <Trash
                  fill="red"
                  color="red"
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => removeItemFromCart(cartItem?.item?._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full h-fit flex flex-col gap-8 bg-gray-100 rounded-lg px-4 py-5 border border-zinc-300">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`(${cartItems?.length} ${
            cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>$ {totalRounded}</span>
        </div>
        <button
          className="border rounded-lg font-bold bg-green-500 py-3 w-full transition-all duration-300 hover:bg-green-600 text-white hover:text-white"
          /*  onClick={handleCheckout} */
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
export default Cart;
