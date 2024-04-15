import Gallery from "@/components/products/Gallery";
import ProductCard from "@/components/products/ProductCard";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";
import { getProduct, getRelatedProducts } from "@/lib/actions/action";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = params;

  const productDetails = await getProduct(productId);

  const relatedProducts = await getRelatedProducts(productId);

  /* console.log(productDetails) */

  return (
    <>
      <div className="flex justify-center items-start gap-16 py-48 px-5 max-md:flex-col max-md:items-center">
        <Gallery
          productMedia={productDetails?.media}
          productId={productDetails?._id}
        />
        <ProductInfo productInfo={productDetails} />
      </div>

      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="font-bold text-4xl">Related Products</p>

        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    </>
  );
};
export default ProductDetails;
