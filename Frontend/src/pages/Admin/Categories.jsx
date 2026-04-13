import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AddCategory,
  DeleteCategory,
  getAllCategories,
} from "@/store/features/categories/categoriesSlice";
import { Badge, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Categories = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories?.categories);
  const status = useSelector((state) => state.categories?.status);
  const error = useSelector((state) => state.categories?.error);
  // console.log(categories);
  //   const { status } = useSelector((state) => state.auth);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(AddCategory(formData))
      .unwrap()
      .then((response) => {
        // console.log(response);
        if (response?.success === true) {
          toast.success(response?.message, { autoClose: 2000 });
          dispatch(getAllCategories());

          setFormData({});
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
        setFormData({});
      });
  };

  //deleteHandler
  const deleteHandler = (slug) => {
    dispatch(DeleteCategory(slug))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
          toast.success(response?.message, { autoClose: 2000 });
          dispatch(getAllCategories());
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
        <p>Loading Categories....</p>
      </div>
    );
  }
  if (error === "error") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error while fetching Categories....</p>
      </div>
    );
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
          {/* <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler} className="flex">
            <Field className="me-2">
              {/* <FieldLabel htmlFor="category">Category</FieldLabel> */}
              <Input
                id="name"
                name="name"
                value={formData.name || ""}
                type="text"
                onChange={changeHandler}
                placeholder="Category Name"
                required
                autoComplete="true"
              />
              {/* <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription> */}
            </Field>
            <Button>Add Category</Button>
          </form>
        </CardContent>
      </Card>
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              categories?.categories?.map((category, index) => {
                return (
                  <TableRow key={category._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="capitalize">
                      {category.name}
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      {moment(category.createdAt).format("DD-MM-YYYY")}
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
                            <button className="w-full"
                              onClick={() => {
                               navigate(`/admin/categories/update/${category.slug}`);
                              }}
                            >
                          <DropdownMenuItem>
                              Edit
                          </DropdownMenuItem>
                            </button>
                            <button className="w-full"
                              onClick={() => {
                                deleteHandler(category.slug);
                              }}
                            >
                          <DropdownMenuItem>
                              Delete
                          </DropdownMenuItem>
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

export default Categories;
