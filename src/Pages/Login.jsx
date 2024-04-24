/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import InputTag from "../components/InputTag";

const Login = ({ onLogin }) => {
  return (
    <>
      <div className="md:w-[50%] mx-auto bg-white flex flex-col gap-10 shadow-lg p-10">
        <div className="text-center text-primary-mainBlue">
          <Link to="/dashboard">
            <p className="text-2xl font-bold">Login</p>
          </Link>
        </div>

        <form action="">
          <div className=" flex flex-col gap-5">
            <InputTag
              inputFor={"email"}
              inputPlaceholder={"Enter your email"}
              inputType={"email"}
              inputLabel={"email"}
            />

            <InputTag
              inputFor={"password"}
              inputPlaceholder={"Enter your password"}
              inputType={"password"}
              inputLabel={"Password"}
            />

            <button
              onClick={onLogin}
              className="bg-primary-mainBlue text-white font-bold px-5 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
