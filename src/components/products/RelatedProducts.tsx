"use client";
import { MoveLeft, MoveRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useState } from "react";

const RelatedProducts = ({
  relatedProducts,
}: {
  relatedProducts: ProductType[];
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [totalPage, setTotalPage] = useState(
    Math.round(Math.ceil(relatedProducts?.length / endIndex))
  );
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <div className="relative grid grid-cols-4 gap-16 mx-32 mt-16">
        {relatedProducts
          ?.slice(startIndex, endIndex)
          ?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <div className="flex items-center justify-center my-16 gap-4">
        <MoveLeft size={40} className=" text-blue-400 cursor-pointer" 
            onClick={() => {
            if (startIndex - 4 >= 0) {
              setStartIndex(startIndex - 4);
              setEndIndex(endIndex - 4);
              setCurrentPage(currentPage - 1);
            } else {
              setStartIndex(0);
              setEndIndex(4);
              setCurrentPage(1);
            }   
            }}
            />
        <p className="bg-zinc-300 px-3 py-1 rounded-full">{currentPage}</p>
        <MoveRight
          size={40}
          className=" text-blue-400 cursor-pointer"
          onClick={() => {
            if (endIndex + 4 < relatedProducts.length) {
              setStartIndex(endIndex);
              setEndIndex(endIndex + 4);
              setCurrentPage(currentPage + 1);
            } else {
              setStartIndex(relatedProducts.length - 4);
              setEndIndex(relatedProducts.length);
              setCurrentPage(totalPage);
            }
          }}
        />
      </div>
    </>
  );
};
export default RelatedProducts;
