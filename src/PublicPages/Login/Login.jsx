import { Player } from "@lottiefiles/react-lottie-player";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import useUserInfoFromMongodb from "../../hooks/useUserInfoFromMongodb";

const Login = () => {
  const { user, googleSignIn, signIn } = useContext(AuthContext);
  const [websiteUser, refetch] = useUserInfoFromMongodb();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard/Home";
  useEffect(() => {
    if (user && websiteUser) {
      if (websiteUser.role) {
        navigate(`/dashboard/${websiteUser.role}Home`);
      } else {
        navigate("/dashboard/Home");
      }
    }
  }, [user, websiteUser, navigate]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const ourUser = signIn(data.email, data.password);
      console.log(ourUser);
      if (ourUser) {
        await refetch();
        //Swal.fire("Welcome Back...")
        if (!websiteUser?.role) {
          //console.log(websiteUser.role);
          navigate(`/dashboard/Home`);
        }
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Some thing went wrong. Please try again...");
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await googleSignIn();
      await refetch();
      if (websiteUser?.role) {
        navigate(`/dashboard/${websiteUser.role}Home`);
      } else {
        navigate(`/dashboard/Home`);
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Something went wrong");
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <Player
              src={
                "https://d1jj76g3lut4fe.cloudfront.net/saved_colors/98631/19mf6QRCx6Nv0mGF.json"
              }
              autoplay
              loop
            />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-4xl font-bold text-center">Login Now</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-error">
                    Email is required
                  </p>
                )}
                {errors.email?.type === "pattern" && (
                  <p role="alert" className="text-error">
                    Please Provide a valid email
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p role="alert" className="text-error">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p role="alert" className="text-error">
                    Your password contain at least one capital and small
                    character, one number and one special character and length
                    must be greater than 6 character
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={user}
                >
                  Login
                </button>
              </div>
              <p className="text-lg text-center">
                Do not have an account?{" "}
                <Link to={"/register"} className="btn-link">
                  Register
                </Link>
              </p>
            </form>
            {
              <button
                onClick={() => handleSignInWithGoogle()}
                className="btn"
                disabled={user}
              >
                Sign In With Google
              </button>
            }
            {websiteUser?.role ? (
              <button
                className="btn btn-error"
                onClick={() => navigate(`/dashboard/${websiteUser?.role}Home`)}
              >
                Go To DashBoard
              </button>
            ) : (
              user && (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/dashboard/Home`)}
                >
                  Go To DashBoard
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
