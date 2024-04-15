import { set } from "mongoose";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

interface CartItem {

  item: ProductType;
  quantity: number;
  color?: string; // ? means optional
  size?: string; // ? means optional
}

interface CartStore {
  cartItems: CartItem[];
  /* addItem: (item: CartItem) => void;
    removeItem: (idToRemove: string) => void;
    increaseQuantity: (idToIncrease: string) => void;
    decreaseQuantity: (idToDecrease: string) => void;
    clearCart: () => void; */
}

const cartStore = (set: any, get: any) => ({
  cartItems: [] as CartItem[],
  addItemToCart: (data: CartItem) => {
    const { item, quantity, color, size } = data;
    const currentItems = get().cartItems; // all the items already in cart
    const isExisting = currentItems.find(
      (cartItem: CartItem) => cartItem.item._id === item._id
    );

    if (isExisting) {
      return toast("Item already in cart");
    }

    set({ cartItems: [...currentItems, { item, quantity, color, size }] });
    toast.success("Item added to cart", { icon: "🛒" });
  },
  removeItemFromCart: (idToRemove: string) => {
    const remainingCartItems = get().cartItems.filter(
      (cartItem: CartItem) => cartItem.item._id !== idToRemove
    );

    set({ cartItems: remainingCartItems });
    toast.success("Item removed from cart", { icon: "🗑️" });
  },
  increaseQuantity: (idToIncrease: string) => {
    const newCartItems = get().cartItems.map((cartItem: CartItem) =>
      cartItem.item._id === idToIncrease
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    set({ cartItems: newCartItems });
    toast.success("Item quantity increased");
  },
  decreaseQuantity: (idToDecrease: string) => {
    const newCartItems = get().cartItems.map((cartItem: CartItem) =>
      cartItem.item._id === idToDecrease
        ? cartItem?.quantity == 1
          ? get().cartItems.filter(
              (cartItem: CartItem) => cartItem?.item?._id !== idToDecrease
            )
          : cartItem.quantity - 1
        : cartItem
    );
    set({ cartItems: newCartItems });
    toast.success("Item quantity decreased");
  },
  clearCart: () => set({ cartItems: [] }),
});

export const useCartStore = create(
  devtools(persist(cartStore, { name: "cart" }))
);
