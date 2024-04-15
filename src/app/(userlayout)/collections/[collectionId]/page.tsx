import ProductCard from "@/components/products/ProductCard";
import { getCollection } from "@/lib/actions/action";
import Image from "next/image";

const Collection = async ({ params }: { params: { collectionId: string } }) => {
  const { collectionId } = params;

  const collectionDetails = await getCollection(collectionId);

  return (
    <div className="px-10 py-40 flex flex-col items-center gap-8">
      <Image
        src={collectionDetails?.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-11/12 h-[500px] object-cover rounded-xl shadow-lg"
      />
      <p className="text-5xl font-black  text-gray-600">
        {collectionDetails?.title}
      </p>
      <p className="text-lg font-medium text-gray-400 text-center max-w-[900px]">
        {collectionDetails?.description}
      </p>
      {collectionDetails?.products?.length < 1 ? (
        <div className="text-center">
          No Products to show in this collection.
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-16 ">
          {collectionDetails?.products?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Collection;
