"use client";
import { Button } from "@/components/ui/button";
import { getUserOrders } from "@/lib/actions/action";
import { useUserProfileStore } from "@/store/store";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const page = () => {
  const { signedInUser } = useUserProfileStore((state) => ({
    signedInUser: state.signedInUser,
  }));

  const [orders, setOrders] = useState<ProductType[]>([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${signedInUser._id}`
      );
      setOrders(data.orders);
      console.log(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [signedInUser]);

  return (
    <div className=" mt-40 flex flex-col mx-40">
      <div className="text-center text-6xl mb-12 underline">Your Orders</div>
      <div className="flex flex-col gap-8 my-6 ">
        {orders?.map((order: any) => (
          <div className="border-b border-gray-400 p-2 pb-4">
            <p className="mb-3">Order ID : {order?._id}</p>
            <div
              key={order._id}
              className="flex flex-col gap-8  border-gray-300 "
            >
              {order?.products?.map((product: any) => (
                <div className="flex gap-8  pb-5 border-gray-300 ">
                  <Image
                    className="w-40 h-40 object-cover rounded-lg border border-zinc-300 cursor-pointer"
                    src={product?.product?.media?.at(0) as string}
                    alt={product.title}
                    width={2400}
                    height={2400}
                  />
                  <div className="flex flex-col gap-3 w-3/5 ">
                    <p className="">
                      <span className="text-xl "> Product name :</span>{" "}
                      <span className="text-gray-500">
                        {product?.product?.title}
                      </span>
                    </p>
                    <p className=" ">
                      <span className="text-xl "> Color :</span>{" "}
                      <span className="text-gray-500">{product?.color}</span>
                    </p>
                    <section className="flex flex-col gap-3">
                      <p className=" ">
                        {" "}
                        <span className="text-xl "> Size :</span>{" "}
                        <span className="text-gray-500">{product?.size}</span>
                      </p>
                      <p className=" ">
                        <span className="text-xl "> Quantity :</span>{" "}
                        <span className="text-gray-500">
                          {product?.quantity}
                        </span>
                      </p>
                    </section>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className=" ">
                <span className="text-xl "> Total :</span>{" "}
                <span className="text-gray-500">₹ {order?.totalAmount}</span>
              </p>
              <p className=" ">
                <span className="text-xl "> Shipping address :</span>{" "}
                <span className="text-gray-500">
                  {order?.shippingAddress?.street},
                  {order?.shippingAddress?.city},{order?.shippingAddress?.state}
                  ,{order?.shippingAddress?.postalCode},
                  {order?.shippingAddress?.country}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {orders?.length > 1 && <div className="flex justify-end my-6 ">
        <Button className="bg-green-500 hover:bg-green-600 ">
          Continue Shopping
        </Button>
      </div>}
    </div>
  );
};
export default page;


export const dynamic = "force-dynamic";