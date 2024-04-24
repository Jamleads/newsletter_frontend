/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputTag from "../components/InputTag";
import { setAuthState, setToken } from "../features/authSlice";
import { useLoginMutation } from "../services/authApi";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((pre) => ({ ...pre, [id]: value }));
  };
  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formState).unwrap();
      console.log(res);

      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      localStorage.setItem("user", JSON.stringify(res.data.user));

      dispatch(setAuthState(res.data.user));
      dispatch(setToken(res.data.accessToken));

      navigate("/", { replace: true });

      toast.success("Login successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error.data);
      toast.error(error.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };
  return (
    <>
      <div className="md:w-[50%] mx-auto bg-white flex flex-col gap-10 shadow-lg p-10">
        <div className="text-center text-primary-mainBlue">
          <Link to="/dashboard">
            <p className="text-2xl font-bold">Login</p>
          </Link>
        </div>

        <form action="" onSubmit={submitLogin}>
          <div className=" flex flex-col gap-5">
            <InputTag
              inputValue={formState.email}
              inputChange={(e) => handleChange(e)}
              inputFor={"email"}
              inputPlaceholder={"Enter your email"}
              inputType={"email"}
              inputLabel={"email"}
            />
            <InputTag
              inputValue={formState.password}
              inputChange={(e) => handleChange(e)}
              inputFor={"password"}
              inputPlaceholder={"Enter your password"}
              inputType={"password"}
              inputLabel={"Password"}
            />
            <button className="bg-primary-mainBlue text-white font-bold px-5 py-2 rounded-md">
              {!isLoading ? "Login" : "Loading..."}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
