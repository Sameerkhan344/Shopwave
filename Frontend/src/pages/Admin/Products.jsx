import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllProducts,
  ProductDelete,
} from "@/store/features/products/productSlice";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import formatNumber from "format-number"

const Products = () => {
  const products = useSelector((state) => state.products?.products);
  const status = useSelector((state) => state.products?.status);
  const error = useSelector((state) => state.products?.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(products);
  //getAllProducts

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  //deleteHandler
  const deleteHandler = (productId) => {
    dispatch(ProductDelete(productId))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
          toast.success(response?.message, { autoClose: 2000 });
          dispatch(getAllProducts());
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

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
    <>
      <div className="flex flex-col gap-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg  font-semibold md:text-2xl">Products</h1>
          <Link to={"/admin/products/add"}>
            <Button className="">Add Products</Button>
          </Link>
        </div>
      </div>

      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr.No</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.products?.map((product, index) => {
              return (
                <TableRow key={product._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      className="aspect-square rounded-md object-cover w-30 h-22"
                      src={product?.picture?.secure_url}
                      alt=""
                    />
                  </TableCell>
                  <TableCell className="capitalize whitespace-break-spaces">{product.title}</TableCell>
                  <TableCell className="text-md whitespace-break-spaces">
                    {product.description}
                  </TableCell>
                  <TableCell className="capitalize font-semibold">
                    {formatNumber({prefix: "Rs. "})(product.price)}/-
                  </TableCell>
                  <TableCell className="capitalize">
                    {product.category.name}
                  </TableCell>

                  <TableCell>
                    {moment(product.createdAt).format("DD-MM-YYYY")}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          arial-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <button
                          className="w-full"
                          onClick={() =>
                            navigate(`/admin/products/update/${product._id}`)
                          }
                        >
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </button>
                        <button
                          className="w-full"
                          onClick={() => {
                            deleteHandler(product._id);
                          }}
                        >
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </button>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Products;
