"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCartStore } from "@/store/useCart";
import { motion } from "framer-motion";
import {
  Contact2,
  Home,
  ListOrdered,
  Search,
  ShoppingBasket,
  ShoppingCart,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import SearchComponent from "../common/SearchComponent";
import { useState } from "react";

const Navbar = () => {
  const { cartItems } = useCartStore();
  const [serarchQuery,setSearchQuery] = useState("")
  const [showSearch,setShowSearch] = useState(false)


  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="absolute  flex justify-between items-center w-4/5 z-50 top-8 left-[10%] bg-gradient-to-br from-zinc-100 to-[#c8eaff]  border-2 shadow-xl border-[#c1ced6] px-12 py-4 rounded-2xl bg-blend-saturation text-[#8BAABD]"
    >
      <div className="bg-transparent">
        <Image
          src={"/logo2.jpg"}
          alt="logo"
          width={52}
          height={44}
          className="bg-transparent"
        />
      </div>
      <div className="">
        <div className="flex items-center justify-between gap-24 font-semibold leading-6">
          <Link href="/" className="flex justify-center items-start gap-2">
            <Home size={20} />
            Home
          </Link>
          <Link
            href="/products"
            className="flex justify-center items-start gap-2"
          >
            <ShoppingBasket />
            Products
          </Link>
         { !showSearch && <p className="flex cursor-pointer justify-center items-start gap-2" onClick={()=>setShowSearch(true)}>
                <Search />
                Search
              </p>}
          { showSearch && <Dialog>
            <DialogTrigger>
              {" "}
              <p className="flex  justify-center items-start gap-2">
                <Search />
                Search
              </p>
            </DialogTrigger>
            <DialogContent className=" ">
             <div className=" mt-6   flex items-center w-full  border-b-2 border-gray-400">
               <Search color="gray" />
             <input
                type="text"
                placeholder="Search products here..."
                className=" outline-none px-3 py-2  w-full rounded-full"
                onChange={e=>setSearchQuery(e.target.value)}
              />
             </div>
           { serarchQuery?.length > 2 &&  <SearchComponent {...{serarchQuery,setSearchQuery,setShowSearch}} />}
            </DialogContent>
          </Dialog>}

          <Link href="/wishlist" className="flex  justify-center items-start gap-2">
            <Store />
            Wishlist
          </Link>
          <Link href="/orders" className="flex  justify-center items-start gap-2">
            <ListOrdered />
            Orders
          </Link>
        </div>
      </div>
      <div className="flex gap-10 items-center px-8 relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Nil</AvatarFallback>
        </Avatar>

        <Link
          href="/cart"
          className="flex  justify-center items-start gap-2 text-lg"
        >
          <ShoppingCart />
          Cart({cartItems.length})
        </Link>
      </div>
    </motion.nav>
  );
};
export default Navbar;
