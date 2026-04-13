import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { getAllCategories } from "@/store/features/categories/categoriesSlice";
import {
  getSingleProduct,
  updateSingleProduct,
} from "@/store/features/products/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    picture: "",
  });
  const [prevPic, setPrevPic] = useState(null);
  const categories = useSelector((state) => state.categories.categories);
  const catStatus = useSelector((state) => state.categories.status);
  const catError = useSelector((state) => state.categories.error);
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();
  // console.log(categories);
  const changeHandler = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleCategoryChange = (value) => {
    setFormData((values) => ({ ...values, category: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("form submited", formData);
    dispatch(updateSingleProduct({ formData, productId }))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
          //   setFormData({});
          toast.success(response?.message, { autoClose: 2000 });

          navigate("/admin/products");
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  useEffect(() => {
    dispatch(getSingleProduct(productId));
    dispatch(getAllCategories());
  }, [productId, dispatch]);

  useEffect(() => {
    const dataUpdate = () => {
      if (products && products.product) {
        const { title, price, category, picture, description } =
          products.product;

        setFormData({
          title: title,
          price: price,
          category: category._id,
          picture: picture.secure_url,
          description: description,
        });
        setPrevPic(picture.secure_url);
      }
    };
    dataUpdate();
  }, [products]);

  if (catStatus == "loading" || productStatus == "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading....</p>
      </div>
    );
  }
  if (catError == "failed" || productError == "failed") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error....</p>
      </div>
    );
  }
  return (
    <>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>Update Product</CardTitle>
          {/* <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription> */}
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
                    value={formData.title}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Product Title"
                    required
                    autoComplete="true"
                  />
                </Field>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <Field>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={changeHandler}
                    placeholder="Product price"
                    required
                    autoComplete="true"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  {categories?.categories?.length > 0 && (
                    <Select
                      key={formData.category} //key → forces component remount when category changes ,shadcn Select needs forced re-render + exact value match
                      value={formData.category?.toString() || ""} //.toString() → ensures exact match , || "" → prevents controlled/uncontrolled error
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {categories.categories.map((category) => (
                            <SelectItem
                              key={category._id}
                              value={category._id.toString()}
                              className="capitalize"
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <Field>
                  <FieldLabel htmlFor="picture">Picture</FieldLabel>
                  <Input
                    id="picture"
                    type="file"
                    onChange={(e) => {
                      changeHandler({
                        target: {
                          name: "picture",
                          value: e.target.files[0],
                        },
                      });
                    }}
                    // required
                    //   autoComplete="true"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="picture">Previous picture</FieldLabel>
                  <img
                    height={100}
                    width={100}
                    className="!w-20 object-cover"
                    src={prevPic}
                    alt={formData.title}
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>

                <Textarea
                  className="min-h-20"
                  id="description"
                  name="description"
                  value={formData.description}
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
                      Updating Product....
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      //   variant="outline"
                      className="cursor-pointer hover:bg-gray-800 hover:text-white text-white bg-black duration-500 ease-in-out"
                    >
                      Update Product
                    </Button>
                  )}
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default UpdateProduct;
