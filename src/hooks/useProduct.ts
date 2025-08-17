
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { fetchProducts } from "../app/api";


export default function useProducts() {
  const { state, dispatch } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await fetchProducts();
      dispatch({ type: "SET_PRODUCTS", payload: data.products });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products: state.products, loading, error };
}