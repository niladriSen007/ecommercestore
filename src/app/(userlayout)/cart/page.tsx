"use client"
import { useCartStore } from "@/store/useCart"

const Cart = () => {

  const {cartItems} = useCartStore((state) => ({
    cartItems: state.cartItems,
    addItemToCart: state.addItemToCart,
    removeItemFromCart: state.removeItemFromCart,
  }))

  return (
    <div>{cartItems?.length}</div>
  )
}
export default Cart