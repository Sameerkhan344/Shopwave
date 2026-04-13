import React, { useEffect, useState } from "react";
import { getSingleProduct } from "@/store/features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import formatNumber from "format-number";
import { addToCart } from "@/store/features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const products = useSelector((state) => state.products?.products);
  const status = useSelector((state) => state.products?.status);
  const error = useSelector((state) => state.products?.error);
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetais] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    picture: null,
  });
//   console.log(products);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleAddToCart = () => {
    dispatch(addToCart({ productId, title, pictureUrl, price, quantity }));
    toast.success("Item added to cart successfully", {autoClose: 1500})
  };

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [dispatch, productId]);
  useEffect(() => {
    if (products && products.product) {
      setProductDetais(products?.product);
    }
  }, [products]);

  const { title, price, picture, category, description } = productDetails;
  const pictureUrl = picture?.secure_url || null;
  const categoryName = category?.name || "";

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading Products Details....</p>
      </div>
    );
  }
  if (error === "error") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error while fetching Products Details....</p>
      </div>
    );
  }

  return (
    <div className="container px-2 md:px-0 py-5 mx-auto">
      <div className="text-2xl font-semibold text-center py-4">
        Product Details
      </div>
      <div className="grid md:grid-cols-2 w-full m-auto">
        <div className="">
          <img src={pictureUrl} alt={title} />
        </div>
        <div className="grid gap-4">
          <h5 className="text-xl font-semibold">{title}</h5>
          <p className="text-sm capitalize">
            Price :
            <span className="font-medium"> Rs. {formatNumber()(price)}/-</span>
          </p>
          <p className="text-sm capitalize">
            Category : <span className="font-medium">{categoryName}</span>
          </p>
          <p className="text-sm font-medium capitalize">{description}</p>
          <div className="mb-3">
            <button
              className="px-3 py-1 rounded bg-gray-400 cursor-pointer font-bold"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              type="number"
              className="w-12 border p-1 text-center"
              readOnly
              value={quantity}
              min={1}
            />
            <button
              className="px-3 py-1 rounded bg-gray-400 cursor-pointer font-bold"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="py-1 text-white font-bold rounded bg-blue-600 cursor-pointer hover:bg-blue-500"
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
