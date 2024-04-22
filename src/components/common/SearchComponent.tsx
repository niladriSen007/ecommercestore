import { getProducts, getSearchResults } from "@/lib/actions/action";
import axios from "axios";
import { Star } from "lucide-react";
import { set } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchComponent = ({ serarchQuery,setSearchQuery ,setShowSearch}: { serarchQuery: string,setSearchQuery : any,setShowSearch : any }) => {
  const [results, setResults] = useState<ProductType[]>([]);
  const router = useRouter();
  const getSearchResults = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search/${serarchQuery}`
    );
    setResults(data.results);
  };

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <>
      <section className=" w-full">
        {results?.length == 0 ? (
          <>No products</>
        ) : (
          <>
            <p className="pt-2 px-2 pb-4 border-b-2 border-gray-300 ">Results</p>
            {results?.map((result: ProductType) => (
              <div
                key={result._id}
                className="flex flex-col items-start gap-4 "
              >
                <div
                  onClick={()=>{
                    setShowSearch(false)
                    setSearchQuery("")
                    router.push(`/products/${result?._id}`)
                  }}
                  className="cursor-pointer flex items-center justify-between border-gray-400 py-5 border-b-2  bg-gray-200 w-full mb-3  hover:bg-gray-300 px-2"
                >
                  <div className="flex gap-2 items-center ">
                  <Image alt="" src={result?.media?.at(0) as string} width={5000} height={5000} className="w-10 h-10 object-cover rounded-full" />
                  {result?.title}
                  </div>
                  <Star size={20} fill="#afc4d1" color="#afc4d1" />
                </div>
              </div>
            ))}
          </>
        )}
      </section>
    </>
  );
};
export default SearchComponent;


export const dynamic = "force-dynamic";
