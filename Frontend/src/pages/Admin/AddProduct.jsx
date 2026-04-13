import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/store/features/categories/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { addProduct } from "@/store/features/products/productSlice";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";

const AddProduct = ({ ...props }) => {
  const [formData, setFormData] = useState({});
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories?.categories);
  const productStatus = useSelector((state) => state.products?.status);
  const status = useSelector((state) => state.categories?.status);
  const error = useSelector((state) => state.categories?.error);
  //   console.log(categories);
  //   const onStatus = useSelector((state) => state.auth);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("form submited", formData);
    dispatch(addProduct(formData))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
            setFormData({})
          toast.success(response?.message, { autoClose: 2000 });
          setTimeout(() => {
              navigate("/admin/products")
          }, 2000);
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };
  //getAllCategories
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading categories....</p>
      </div>
    );
  }
  if (error === "error") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error while fetching categories....</p>
      </div>
    );
  }
  return (
    <Card {...props} className="shadow-xl/30">
      <CardHeader>
        <CardTitle className="">Add Product</CardTitle>
        <CardDescription>
          Enter your information below to add your product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <FieldGroup>
            <div className="flex flex-col md:flex-row gap-2">
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Product Title"
                  required
                  autoComplete="true"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="price">Price</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={changeHandler}
                  placeholder="Product price"
                  required
                  autoComplete="true"
                />
              </Field>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        categories?.categories?.map((category) => {
                          return (
                            <SelectItem
                              className="capitalize"
                              key={category._id}
                              value={category._id}
                            >
                              {category.name}
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="picture">Picture</FieldLabel>
                <Input
                  id="picture"
                  name="picture"
                  type="file"
                  onChange={(e) => {
                    changeHandler({
                      target: {
                        name: "picture",
                        value: e.target.files[0],
                      },
                    });
                  }}
                  required
                  //   autoComplete="true"
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>

              <Textarea
                className="min-h-32"
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={changeHandler}
                type="text"
                placeholder="Enter Product description"
                required
                autoComplete="true"
              />
            </Field>
            <FieldGroup>
              <Field>
                {productStatus == "loading" ? (
                  <Button disabled>
                    <Spinner data-icon="inline-start" />
                    Adding Product....
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    //   variant="outline"
                    className="cursor-pointer hover:bg-gray-800 hover:text-white text-white bg-black duration-500 ease-in-out"
                  >
                    Add Product
                  </Button>
                )}
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    

  );
};

export default AddProduct;
