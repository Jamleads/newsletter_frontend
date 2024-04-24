/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import InputTag from "../components/InputTag";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userlogin } from "../Feature/AuthSlice";

const Login = () => {
  const { status, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formStae, setFormState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((pre) => ({ ...pre, [id]: value }));
  };

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(userlogin(formStae));
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
              inputValue={formStae.email}
              inputChange={(e) => handleChange(e)}
              inputFor={"email"}
              inputPlaceholder={"Enter your email"}
              inputType={"email"}
              inputLabel={"email"}
            />
            <InputTag
              inputValue={formStae.password}
              inputChange={(e) => handleChange(e)}
              inputFor={"password"}
              inputPlaceholder={"Enter your password"}
              inputType={"password"}
              inputLabel={"Password"}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button className="bg-primary-mainBlue text-white font-bold px-5 py-2 rounded-md">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
