import React from "react";
import { Link } from "react-router";
import { Card, CardContent } from "./ui/card";
import formatNumber from "format-number";
import { Button } from "./ui/button";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <Card className="rounded-md shadow w-full">
        <CardContent className="grid gap-2">
          <img
            src={product?.picture?.secure_url}
            alt={product.title}
            className="px-8 py-4 rounded-t-lg h-40 object-contain mx-auto"
          />
          <div className="p-3">
            <h5 className="tracking-tight text-gray-700 mb-4 text-xl">
              {product.title}
            </h5>
            <div className="flex justify-between items-center">
              <span>{formatNumber({ prefix: "Rs. " })(product.price)}/-</span>
              <Button className="bg-blue-700 hover:bg-blue-600 cursor-pointer">
                View Product
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
