import {
  removeFromCart,
  updateQuantity,
} from "@/store/features/cart/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import formatNumber from "format-number";
const Cart = () => {
  const disPatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const handleChangeQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    disPatch(updateQuantity({ productId, quantity }));
  };
  const handleRemoveCart = (productId) => {
    disPatch(removeFromCart(productId));
    toast.info("Item removed from cart successfully", { autoClose: 1500 });
  };
  const totalAmount = cartItems.reduce((total, item)=> total + item.price * item.quantity,0);

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-2xl text-center">
          Your cart is empty.
          <br />
          <Link className="text-orange-400 text-xl" to="/shop">
            Contiue Shopping
          </Link>
        </p>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-5">
      <div className="text-xl text-center font-semibold py-5">Your Cart</div>
      <div className="flex flex-col space-y-4">
        {/* single product box */}
        {cartItems.map((item) => {
          return (
            <div
              key={item.productId}
              className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
            >
              <img
                src={item.pictureUrl}
                alt={item.title}
                className="h-32 w-32 object-contain rounded"
              />
              <div className="flex-1 px-4">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">Price : {formatNumber()(item.price)}/- PKR/Item</p>
                <p className="text-sm text-gray-600">
                  Total : {formatNumber()(item.price * item.quantity)}/- PKR
                </p>
                <div className="flex items-center mt-2">
                  <button
                    className="px-2 py-1 bg-gray-300 rounded"
                    onClick={() =>
                      handleChangeQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <input
                    className="w-12 text-center mx-2"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChangeQuantity(
                        item.productId,
                        parseInt(e.target.value),
                      )
                    }
                  />
                  <button
                    className="px-2 py-1 bg-gray-300 rounded"
                    onClick={() =>
                      handleChangeQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-400 cursor-pointer"
                onClick={() => handleRemoveCart(item.productId)}
              >
                Remove
              </button>
            </div>
          );
        })}
        <div className="flex justify-between items-center mt-5">
          <h2 className="text-2xl font-semibold">Total : {formatNumber()(totalAmount)}/- PKR</h2>
          <Link
            className="bg-orange-400 text-black px-4 py-2 hover:bg-orange-500 rounded"
            to="/checkout"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
