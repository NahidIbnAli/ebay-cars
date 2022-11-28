import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../../../components/Loading";
import { AuthContext } from "../../../contexts/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: carCategories = [], isLoading } = useQuery({
    queryKey: ["carCategories"],
    queryFn: async () => {
      const res = await fetch(
        `https://ebay-cars-server.vercel.app/carCategories`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  //   product coditions
  const conditions = ["Excellent", "Good", "Fair"];

  //   imagebbHostKey
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const handleAddCar = (data) => {
    setBtnLoading(true);
    const date = format(new Date(), "PP");
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const car = {
            name: data.name,
            image: imageData.data.url,
            resalePrice: data.price,
            originalPrice: data.originalPrice,
            category: data.category,
            condition: data.condition,
            yearOfPurchase: data.yearOfPurchase,
            yearsOfUse: data.yearsOfUse,
            phoneNumber: data.phoneNumber,
            location: data.location,
            description: data.description,
            sellerName: user?.displayName,
            email: user?.email,
            date,
          };
          fetch("https://ebay-cars-server.vercel.app/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(car),
          })
            .then((res) => res.json())
            .then((data) => {
              setBtnLoading(false);
              swal({
                title: "Successfully Added",
                text: "Your Product has been added successfully",
                icon: "success",
                button: "Ok",
              });
              navigate("/dashboard/myproducts");
            });
        }
      });
  };

  return (
    <div className="xl:w-9/12 mx-auto">
      <h2 className="text-3xl font-bold mb-6">Add Product</h2>
      <form
        onSubmit={handleSubmit(handleAddCar)}
        className="w-full p-7 lg:px-11 lg:pt-6 lg:pb-10 rounded-xl bg-white"
      >
        <div className="grid lg:grid-cols-2 gap-x-10 gap-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base font-medium">Product</span>
            </label>
            <input
              {...register("name", { required: "Name is Required" })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter Name"
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base font-medium">Price</span>
            </label>
            <input
              {...register("price", { required: "Price is Required" })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter Price"
            />
            {errors.price && (
              <span className="text-red-600">{errors.price.message}</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base font-medium">
                Original Price
              </span>
            </label>
            <input
              {...register("originalPrice", {
                required: "Orginal Price is Required",
              })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter Original Price"
            />
            {errors.originalPrice && (
              <span className="text-red-600">
                {errors.originalPrice.message}
              </span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base font-medium">Category</span>
            </label>
            <select
              {...register("category", { required: "Category is Required" })}
              className="select select-bordered w-full"
            >
              {carCategories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-600">{errors.category.message}</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base font-medium">
                Condition
              </span>
            </label>
            <select
              {...register("condition", { required: "Condition is Required" })}
              className="select select-bordered w-full"
            >
              {conditions.map((condition, index) => (
                <option key={index} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
            {errors.condition && (
              <span className="text-red-600">{errors.condition.message}</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base font-medium">
                Add Image
              </span>
            </label>
            <input
              {...register("image", { required: "File is required" })}
              type="file"
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <span className="text-red-600">{errors.image.message}</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base font-medium">
                Year of Purchase
              </span>
            </label>
            <input
              {...register("yearOfPurchase", {
                required: "Year of purchase is Required",
              })}
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter Year of Purchase"
            />
            {errors.yearOfPurchase && (
              <span className="text-red-600">
                {errors.yearOfPurchase.message}
              </span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base font-medium">
                Years of Use
              </span>
            </label>
            <input
              {...register("yearsOfUse", {
                required: "Years of Use is Required",
              })}
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter Years of Use"
            />
            {errors.yearsOfUse && (
              <span className="text-red-600">{errors.yearsOfUse.message}</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base font-medium">
                Phone Number
              </span>
            </label>
            <input
              {...register("phoneNumber", {
                required: "Phone Number is Required",
              })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter Number"
            />
            {errors.phoneNumber && (
              <span className="text-red-600">{errors.phoneNumber.message}</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base font-medium">Location</span>
            </label>
            <input
              {...register("location", { required: "Location is Required" })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter Location"
            />
            {errors.location && (
              <span className="text-red-600">{errors.location.message}</span>
            )}
          </div>
        </div>
        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text text-base font-medium">
              Description
            </span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is Required",
            })}
            rows={3}
            className="textarea textarea-bordered w-full text-base"
            placeholder="Product Description"
          ></textarea>
          {errors.description && (
            <span className="text-red-600">{errors.description.message}</span>
          )}
        </div>
        <div className="text-center">
          <button
            className={`btn btn-primary text-white px-10 mt-8 ${
              btnLoading && "loading"
            }`}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
