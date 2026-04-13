import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";

const About = () => {
  // const userModel = new mongoose.schema({
  //   name:{
  //     type:String,
  //   },
  //   name:{
  //     type:String,
  //   },
  // })
  // export default mongoose.model("User", userModel);

  // const orderModel = new mongoose.schema({
  //   amount: String,
  //   paymentMethod: String,
  //   paymentStatus: String,
  //   user:{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref:"User" // 🔥 required for populate
  //   }
  // })

  // const orderController = async (req,res)=>{
  //   try {
  //     const orders = await orderModel.find({
  //       paymentStatus:"success",
  //       paymentMethod : "card"
  //     }).populate("user", "name email")
  //     .select("amount paymentMethod paymentStatus user");

  //     return res.status(200).send({
  //       success:true,
  //       message:"order details fetched successfully",
  //       orders
  //     })

  //   } catch (error) {
  //     console.log("Error in orderController", error);
  //     return res.status(500).send({success: false, message:"Error in orderController", error})
  //   }
  // }

  // const About = lazy(()=> import("././Admin"))
  const [products, setProducts] = useState([]);

  console.log(products);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=500",
          {
            headers: {
              "Content-Type": "application/json",
              // Authorization: "Bearer Your_token_here",
            },
          },
        );
        setProducts(response.data);
        return response.data;
      } catch (error) {
        console.log("Something went wrong please try again", error);
      }
    };
    fetchData();
  }, []);
  return !products.length ===0 ? <h1>No product Found</h1> :(
    <>
    <h1>Pagination</h1>
    <div>
      {products?.products?.map((item) => (
        <div key={item.id}>
          <h1>{item.price}</h1>
        </div>
      ))}
    </div>
    </>
  );
  // <Suspense fallback={<h1>Loading....</h1>}>About</Suspense>;
};

export default About;
