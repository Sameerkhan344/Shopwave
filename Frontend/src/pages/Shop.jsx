import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/store/features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.products);
  const status = useSelector((state) => state.products?.status);
  const error = useSelector((state) => state.products?.error);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading Products....</p>
      </div>
    );
  }
  if (error === "error") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error while fetching Products....</p>
      </div>
    );
  }
  return (
    <div className="container py-5">
      <div className="text-2xl font-semibold text-center py-4">
        Latest Mobile
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.products?.map((product) => {
          return <div key={product._id}>
            <ProductCard product={product} />
          </div>
        })}
      </div>
    </div>
  );
};

export default Shop;
