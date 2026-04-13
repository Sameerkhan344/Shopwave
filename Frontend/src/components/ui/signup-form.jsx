import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { register } from "@/store/features/auth/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Spinner } from "./spinner";

const SignupForm = ({ ...props }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("form submited", formData);

     dispatch(register(formData))
          .unwrap()
          .then((response) => {
            // console.log(response);
            if (response?.success === true) {
              toast.success(response?.message, { autoClose: 2000 });
              setFormData({}),
              setTimeout(() => {
                navigate("/");
              }, 2000);
            } else {
              toast.error(response?.message, { autoClose: 2000 });
            }
          })
          .catch((error) => {
            toast.error(error, { autoClose: 2000 });
            setFormData({})
          });
  };
  return (
    <Card {...props} className="shadow-xl/30">
      <CardHeader>
        <CardTitle className="text-center">
          Create an account (Sign Up)
        </CardTitle>
        <span></span>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={changeHandler}
                type="text"
                placeholder="John Doe"
                required
                autoComplete="true"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                value={formData.email || ""}
                type="email"
                onChange={changeHandler}
                placeholder="m@example.com"
                required
                autoComplete="true"
              />
              {/* <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                value={formData.password || ""}
                type="password"
                onChange={changeHandler}
                placeholder="********"
                required
                autoComplete="true"
              />
              {/* <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription> */}
            </Field>

            <FieldGroup>
              <Field>
                 {status == "loading" ? (
                  <Button disabled>
                    <Spinner data-icon="inline-start" />
                    Creating Account....
                  </Button>
                ) : (
                  <Button
                  type="submit"
                  //   variant="outline"
                  className="cursor-pointer hover:bg-gray-800 hover:text-white text-white bg-black duration-500 ease-in-out"
                >
                  Create Account
                </Button>
                )}
               
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to={"/login"}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
