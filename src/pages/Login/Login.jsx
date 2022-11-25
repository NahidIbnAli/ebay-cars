import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
  const { signIn, signInWithGoogle, forgotPassword } = useContext(AuthContext);
  const [forgotPass, setForgotPass] = useState(null);
  const emailForm = useRef(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data, event) => {
    signIn(data.email, data.password)
      .then((result) => {
        event.target.reset();
        navigate("/");
      })
      .catch((error) => {
        if (error.message) {
          toast.error("your email or password is wrong");
        }
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {})
      .catch((error) => console.error(error));
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    const form = emailForm.current;
    forgotPassword(form.email.value)
      .then(() => {
        toast.success("Password reset email sent!");
        setForgotPass(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="lg:min-h-screen flex justify-center items-center  p-7 lg:py-0">
      <div className="w-full max-w-md p-8 rounded-xl border">
        <h3 className="text-2xl text-center font-medium mb-8">Login</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
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
          <div className="form-control w-full mb-3">
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
              })}
              type="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
            <label
              htmlFor="my-modal-3"
              onClick={() => setForgotPass(true)}
              className="label pt-1"
            >
              <span className="label-text-alt cursor-pointer hover:text-primary">
                Forgot Password?
              </span>
            </label>
          </div>
          <button className="btn btn-primary text-white w-full" type="submit">
            Login
          </button>
        </form>
        <p className="my-3 text-sm text-center">
          New to eBay Cars?{" "}
          <Link to="/signup" className="text-primary font-medium">
            Sign Up
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
      {/* forgot password modal */}
      {forgotPass && (
        <>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle btn-primary text-white absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold mb-3">Enter your email</h3>
              <form ref={emailForm}>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full mb-4"
                />
                <button
                  onClick={handleForgotPassword}
                  type="submit"
                  className="btn btn-primary text-white"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
