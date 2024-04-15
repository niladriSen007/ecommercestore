"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BugPlay, Feather, Heart } from "lucide-react";
import axios from "axios";
import { useUserProfileStore } from "@/store/store";

interface WishlistOrBuyProps {
  isWishListed?: Boolean;
  setIsWishListed?: Dispatch<SetStateAction<Boolean>> | any;

  product: ProductType;
}

const WishlistOrBuy = ({
  isWishListed,
  setIsWishListed,
  
  product,
}: WishlistOrBuyProps) => {
  const [userDetails, setUserDetails] = useState<UserType>();
  const [loading, setLoading] = useState<Boolean>(false);

  const { signedInUser ,addOrRemoveFromWishlist } = useUserProfileStore((state) => ({
    signedInUser: state.signedInUser,
    addOrRemoveFromWishlist: state.addOrRemoveFromWishlist,
  }));
  


  console.log((signedInUser?._id),"User SignedIn")


  const getUserDetails = async () => {
    setLoading(true);
    try {

      console.log(signedInUser?._id,"User")
      const { data } = await axios.get(`/api/user/profile/${signedInUser?._id?.toString()}`);
      setUserDetails(data?.user);
      setIsWishListed(data?.user?.wishlist?.includes(product?._id));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleWishList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/user/wishlist`, {
        userId: signedInUser?._id,
        productId: product?._id,
      });
      addOrRemoveFromWishlist(product?._id);
      
      getUserDetails();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [signedInUser]);

  return (
    <>
      {loading ? (
        <Button
          onClick={handleWishList}
          className=" bg-violet-500 flex items-center gap-2 hover:bg-violet-600 transition-all duration-300 text-white py-2 text-base shadow-2xl px-8 rounded-full  "
        >
          <Feather /> Fetching
        </Button>
      ) : userDetails?.wishlist?.includes(product?._id) ? (
        <>
          <Button
            onClick={handleWishList}
            className=" bg-green-500 flex items-center gap-2 hover:bg-green-600 transition-all duration-300 text-white py-2 text-base shadow-2xl px-8 rounded-full  "
          >
            <BugPlay />
            Buy Now
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={handleWishList}
            className=" bg-red-500 flex items-center gap-2 hover:bg-red-700 transition-all duration-300 text-white py-2 text-base shadow-2xl px-4 rounded-full  "
          >
            <Heart />
            Add to Wishlist
          </Button>
        </>
      )}
    </>
  );
};
export default WishlistOrBuy;
