import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getCollections = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
    const data = res.data.collections;
  
    return data;
    }

export const getProducts = async () => {
    const res = await axios.get(`http://localhost:3000/api/products`);
    const data = res.data.products;
    console.log(res?.data)
    return data;
    }

