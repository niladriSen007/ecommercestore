"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, StarIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

import Collections from "@/components/collections/Collections";
import Products from "@/components/products/Products";

const page = () => {
  return (
    <div className="flex flex-col w-screen overflow-x-hidden scrollbar-hide" style={{overflowX:"hidden"}}>
      {/* /Hero section */}
      <>
        <div className="w-screen h-screen overflow-hidden flex  items-center relative top-0 scrollbar-hide">
          <div className="bg-[#ddecf5] w-1/2 h-screen flex flex-col items-center justify-center">
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-1/2 flex flex-col gap-4"
            >
              <section className="flex flex-col gap-1">
                <p className="font-bold text-6xl">NIKE AIR MAX 90 MESH</p>
                <p className="text-sm font-semibold text-zinc-500">
                  OLDER KIDS/SHOE(5-9)
                </p>
              </section>
              <section className="flex items-center gap-2 ">
                <aside className="flex items-center space-x-0.5">
                  <StarIcon size={20} fill="#afc4d1" className="" />
                  <Star size={20} fill="#afc4d1" className="" />
                  <Star size={20} fill="#afc4d1" className="" />
                  <Star size={20} fill="#afc4d1" className="" />
                  <Star size={20} fill="white" className="" />
                </aside>
                <aside className="flex gap-2 items-center text-base font-semibold text-zinc-400">
                  <p>4.0</p>
                  <p>|</p>
                  <p className="tracking-wider">1289 Reviews</p>
                </aside>
              </section>
              <p className="text-2xl font-bold">
                ₹ 9099.00 <span className="font-thin">(Limited edition)</span>
              </p>
              <section className="flex items-center gap-2">
                <Image
                  alt="shoe1"
                  src={"/i1.png"}
                  width={80}
                  height={80}
                  className=" cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 h-20 border border-zinc-300 rounded-lg object-cover"
                />
                <Image
                  alt="shoe1"
                  src={"/i2.png"}
                  width={80}
                  height={90}
                  className=" cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105  h-20 border border-zinc-300 rounded-lg"
                />
              </section>
              <Button className="bg-[#83acc5] flex items-center gap-2 hover:bg-[#4598cc] transition-all duration-300 text-white py-2 text-base shadow-2xl px-4 rounded-full mt-4 w-1/2">
                <ShoppingBag />
                Add to Cart
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-[#afc4d1] w-1/2 h-screen flex flex-col items-center justify-center pl-20"
          >
            <p className="text-[14rem] font-black text-white leading-snug">
              MESH
            </p>
            <p className="text-[10rem] font-black text-white ">(VR - 1)</p>
          </motion.div>
        </div>

        {/*  Hero image section */}
        <motion.div
          className="absolute bottom-1/5 left-1/4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Image
            alt="home"
            src="/homehd.png"
            width={900}
            height={900}
            className=" -rotate-[24deg] z-50 bg-transparent drop-shadow-2xl"
          />
        </motion.div>
      </>

      {/* Collections */}
         <Collections /> 

         <Products />
    </div>
  );
};
export default page;
