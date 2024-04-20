"use client"
import { useCartStore } from "@/store/useCart";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

const page = () => {
  const { clearCart } = useCartStore()
  return (
    <>
      <div className="w-screen gap-3 h-screen flex flex-col items-center justify-center">
      <CircleCheckBig color="green" size={52} />
        <h2 className="text-4xl">Payment Success</h2>
        <p className="text-xl text-gray-500">Thank you for your purchase</p>
        <Link href="/" className="bg-green-600 px-4 py-2 text-white rounded-md" onClick={clearCart}>Continue Shopping</Link>
      </div>
    </>
  );
};
export default page;
