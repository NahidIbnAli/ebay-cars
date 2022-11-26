import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const { signUp, signInWithGoogle, updateUser } = useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();
  const [signUpLoading, setSignUpLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setSignUpLoading(false);
      navigate("/");
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data, event) => {
    setSignUpLoading(true);
    signUp(data.email, data.password)
      .then((result) => {
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.accountType);
            event.target.reset();
            toast.success("User Created Successfully");
          })
          .catch((error) => {
            setSignUpLoading(false);
            console.error(error);
          });
      })
      .catch((error) => {
        if (error.message) {
          setSignUpLoading(false);
          toast.error("email already in use");
        }
      });
  };

  const saveUser = (name, email, accountType) => {
    const user = { name, email, accountType };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      })
      .catch((error) => {
        setSignUpLoading(false);
        console.error(error);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        saveUser(result.user.displayName, result.user.email);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="lg:min-h-screen flex justify-center items-center p-7 lg:py-0">
      <div className="w-full max-w-md p-8 rounded-xl border">
        <h3 className="text-2xl text-center font-medium mb-8">Sign Up</h3>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full mb-2">
            <label className="label pb-0">
              <span className="label-text text-base">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is Required" })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>
          <div className="form-control w-full mb-2">
            <label className="label pb-0">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              {...register("email", { required: "Email Address is Required" })}
              type="email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div className="form-control w-full mb-2">
            <label className="label pb-0">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special character",
                },
              })}
              type="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>
          <div className="form-control w-full mb-3">
            <label className="label pb-0">
              <span className="label-text text-base">Account Type</span>
            </label>
            <select
              {...register("accountType", {
                required: "Account type is Required",
              })}
              className="select select-bordered"
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
            {errors.accountType && (
              <span className="text-red-600">{errors.accountType.message}</span>
            )}
          </div>
          <button
            className={`btn btn-primary text-white w-full ${
              signUpLoading && "loading"
            }`}
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="my-3 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button
          onClick={handleSignInWithGoogle}
          className="btn btn-outline w-full mt-2"
        >
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
