"use client"

import { useUserProfileStore } from "@/store/store";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Gallery = ({ productMedia,productId }: { productMedia: string[],productId : string }) => {
  const [mainImage, setMainImage] = useState(productMedia?.at(0));

  const { signedInUser  } = useUserProfileStore((state) => ({
    signedInUser: state.signedInUser,
  }));

    console.log(signedInUser?.wishlist)

  return (
    <div className="flex flex-col gap-4 relative">
      <Image
        src={mainImage as string}
        width={4800}
        height={4800}
        alt="product"
        className="w-[600px]  rounded-lg shadow-2xl object-cover"
      />
      {/* {
        signedInUser?._id && signedInUser?.wishlist?.includes(productId) && (
          <div className="absolute right-3 top-3">
            <Button className="bg-zinc-200 p-2 rounded-full shadow-2xl hover:bg-zinc-300">
              <Heart fill="red" color="red" />
            </Button>
          </div>
        )
      } */}
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {productMedia?.map((image, index) => (
          <Image
            key={index}
            src={image}
            height={200}
            width={200}
            alt="product"
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${mainImage === image ? "border-2 border-zinc-300" : ""}`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;