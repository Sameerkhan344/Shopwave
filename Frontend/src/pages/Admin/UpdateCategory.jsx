import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getSingleCategories, updateCategories } from "@/store/features/categories/categoriesSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const UpdateCategory = () => {
  const [catName, setCatName] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {slug} =  useParams();
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(catName);
    dispatch(updateCategories({name: catName, slug}))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
          toast.success(response?.message, { autoClose: 2000 });
          navigate("/admin/categories");
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };
  useEffect(()=>{
      dispatch(getSingleCategories(slug))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
        //   toast.success(response?.message, { autoClose: 2000 });
        //   dispatch(getAllCategories());
        

          setCatName(response.category?.name);
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  },[dispatch,slug])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Category</CardTitle>
        {/* <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler} className="flex">
          <Field className="me-2">
            {/* <FieldLabel htmlFor="category">Category</FieldLabel> */}
            <Input
              value={catName}
              type="text"
              onChange={(e) => setCatName(e.target.value)}
              required
              autoComplete="true"
            />
            {/* <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription> */}
          </Field>
          <Button>Update Category</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateCategory;
