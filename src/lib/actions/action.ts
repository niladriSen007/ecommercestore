import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getCollections = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
    const data = res.data.collections;
  
    return data;
    }

export const getCollection = async (collectionId: string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`);
    const data = res.data.collection;
  
    return data;
    }

export const getProducts = async () => {
    const res = await axios.get(`http://localhost:3000/api/products`);
    const data = res.data.products;
   /*  console.log(res?.data) */
    return data;
    }

export const getProduct = async (productId: string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
    const data = res.data.product;
  
    return data;
    }

export const getRelatedProducts = async (productId: string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/relatedproducts`);
    const data = res.data.products;
  
    return data;
    }

